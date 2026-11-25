import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const contentDir = path.join(root, 'content/journal')
const output = path.join(root, 'src/generated/journal.js')
const includeDrafts = process.env.JOURNAL_INCLUDE_DRAFTS === '1'

function value(raw) {
  const text = raw.trim()
  if (text === 'true') return true
  if (text === 'false') return false
  if (text.startsWith('[') && text.endsWith(']')) return text.slice(1, -1).split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
  return text.replace(/^['"]|['"]$/g, '')
}

function parse(file, source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!match) throw new Error(`${file}: YAMLフロントマターが必要です`)
  const frontmatter = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon > -1) frontmatter[line.slice(0, colon).trim()] = value(line.slice(colon + 1))
  }
  if (!frontmatter.title || !frontmatter.slug || !frontmatter.category || (!frontmatter.draft && !frontmatter.date)) throw new Error(`${file}: title, slug, category と、公開記事の date は必須です`)
  return { ...frontmatter, tags: frontmatter.tags || [], relatedWorks: frontmatter.relatedWorks || [], relatedProjects: frontmatter.relatedProjects || [], body: match[2].trim() }
}

async function findMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return findMarkdown(target)
    return entry.name.endsWith('.md') ? [target] : []
  }))
  return nested.flat()
}

await mkdir(path.dirname(output), { recursive: true })
let articles = []
try {
  const files = (await findMarkdown(contentDir)).filter((file) => !['README.md', 'article-template.md'].includes(path.basename(file)))
  articles = await Promise.all(files.map(async (file) => parse(file, await readFile(file, 'utf8'))))
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
articles = articles.filter((article) => includeDrafts || !article.draft).sort((a, b) => String(b.date).localeCompare(String(a.date)))
await writeFile(output, `// このファイルは scripts/build-journal.mjs により生成されます。\nexport const journalEntries = ${JSON.stringify(articles, null, 2)}\nexport const journalIncludesDrafts = ${includeDrafts}\n`, 'utf8')
