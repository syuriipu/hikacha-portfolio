import { useEffect, useState } from 'react'
import { journalEntries, journalIncludesDrafts } from './generated/journal'
import { works } from './data'
import { SeasonEdition } from './SeasonShell'
import './Journal.css'

const categories = ['ALL', '企画', '開発', 'アップデート', '技術・学び', '制作日記']
const currentYear = new Date().getFullYear()

function Header() { return <header className="site-header journal-header"><a href="#top" className="wordmark">hikacha<span>.</span></a><p className="header-edition">THE CREATIVE ATELIER<br />JOURNAL / NOTES</p><nav aria-label="メインナビゲーション"><a href="#top">HOME</a><a href="#/works">WORKS</a><a className="is-current" href="#/journal" aria-current="page">JOURNAL</a><a href="#/lab">LAB</a><a href="#/about">ABOUT</a></nav></header> }
const formatDate = (date) => date ? new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T00:00:00`)) : ''

const fallbackStyles = {
  '企画': { key: 'planning', icon: '⌁', label: 'PLANNING NOTES' },
  '開発': { key: 'development', icon: '⌘', label: 'GAME DEVELOPMENT' },
  'アップデート': { key: 'update', icon: 'Aa.', label: 'DESIGN NOTES' },
  '技術・学び': { key: 'learning', icon: '◫', label: 'LEARNING NOTES' },
  '制作日記': { key: 'diary', icon: '✦', label: 'STUDIO NOTES' },
}

function Fallback({ category }) {
  const style = fallbackStyles[category] || { key: 'default', icon: '✦', label: 'JOURNAL NOTES' }
  return <div className={`journal-fallback fallback-${style.key}`}><i aria-hidden="true">{style.icon}</i><b>{style.label}</b><span>{category || 'JOURNAL'}</span></div>
}
function ArticleImage({ article }) { return article.cover ? <img src={article.cover} alt="" loading="lazy" /> : <Fallback category={article.category} /> }
function ArticleCard({ article }) { return <a href={`#/journal/${article.slug}`} className="journal-card-item"><div className="journal-card-image"><ArticleImage article={article} /></div><div className="journal-card-copy"><p><span>{article.category}</span><time dateTime={article.date || undefined}>{article.date ? formatDate(article.date) : '公開日未定'}</time>{article.draft && <b className="draft-chip">LOCAL DRAFT</b>}</p><h2>{article.title}</h2><p className="journal-description">{article.description}</p>{article.tags?.length > 0 && <ul>{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}<span className="article-read">READ NOTE ↗</span></div></a> }

function Feature({ article }) { if (!article) return <section className="journal-feature feature-empty"><div><p className="feature-stamp">NEXT ISSUE</p><p className="eyebrow">THE FEATURE STORY</p><h2>ただいま<br />編集中です。</h2><p>公開できる記事ができたら、この場所から制作室の記録をお届けします。</p></div><Fallback category="JOURNAL" /></section>; return <section className="journal-feature"><div className="feature-visual"><ArticleImage article={article} /></div><div className="feature-copy"><p className="feature-stamp">FEATURE</p><p className="eyebrow">THE FEATURE STORY</p><p className="article-meta"><span>{article.category}</span><time dateTime={article.date}>{formatDate(article.date)}</time></p><h2>{article.title}</h2><p>{article.description}</p><a href={`#/journal/${article.slug}`}>特集記事を読む ↗</a></div></section> }

function Index() {
  const [category, setCategory] = useState('ALL')
  const published = journalEntries.filter((article) => !article.draft)
  const visible = journalEntries.filter((article) => category === 'ALL' || article.category === category)
  const feature = published.find((article) => article.featured) || published[0]
  return <><Header /><main className="journal-page"><section className="journal-hero"><p className="eyebrow">THE CREATIVE ATELIER / JOURNAL</p><h1>Journal<span>.</span></h1><p className="journal-jp">つくる途中の、あれこれ。</p><p>ひらめき、試行錯誤、小さな発見。制作室からお届けする記録。</p><SeasonEdition compact />{journalIncludesDrafts && <p className="draft-notice">LOCAL PREVIEW — 下書きを表示しています</p>}</section><Feature article={feature} /><section className="latest-notes"><header><p className="eyebrow">LATEST NOTES</p><h2>Latest Notes<span>.</span></h2><div className="journal-filters">{categories.map((name) => <button type="button" className={category === name ? 'active' : ''} onClick={() => setCategory(name)} key={name}>{name}<small>{name === 'ALL' ? journalEntries.length : journalEntries.filter((article) => article.category === name).length}</small></button>)}</div></header>{visible.length ? <div className="journal-grid">{visible.map((article) => <ArticleCard article={article} key={article.slug} />)}</div> : <div className="journal-empty"><p>公開中の記事は、ただいま準備中です。</p><span>制作の途中にある記録を、少しずつ綴っていきます。</span></div>}</section><aside className="editors-note"><p className="eyebrow">EDITOR'S NOTE.</p><p>制作室の窓辺で、次のページを考えています。</p><small>— hikacha.</small></aside></main><Footer /></> }

function Blocks({ body }) {
  const blocks = body.split('\n\n').filter(Boolean)
  const headings = blocks.filter((block) => /^##\s+/.test(block)).map((block) => block.replace(/^##\s+/, ''))
  return <div className="article-body">{headings.length > 1 && <nav className="article-toc"><p>CONTENTS</p>{headings.map((heading, index) => <a href={`#section-${index}`} key={heading}>{heading}</a>)}</nav>}{blocks.map((block, index) => {
    if (/^##\s+/.test(block)) return <h2 key={index} id={`section-${headings.indexOf(block.replace(/^##\s+/, ''))}`}>{block.replace(/^##\s+/, '')}</h2>
    if (/^>\s?/.test(block)) return <blockquote key={index}>{block.replace(/^>\s?/gm, '')}</blockquote>
    if (/^```/.test(block)) return <pre key={index}><code>{block.replace(/^```\w*\n?|```$/g, '')}</code></pre>
    if (/^[-*]\s+/.test(block)) return <ul key={index}>{block.split('\n').map((line) => <li key={line}>{line.replace(/^[-*]\s+/, '')}</li>)}</ul>
    if (/^---$/.test(block)) return <hr key={index} />
    const image = block.match(/^!\[(.*?)\]\((.*?)\)$/)
    if (image) return <figure key={index} className="article-image"><img src={image[2]} alt={image[1]} loading="lazy" /><figcaption>{image[1]}</figcaption></figure>
    return <p key={index}>{block}</p>
  })}</div>
}

function Detail({ article }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => { const update = () => setProgress(Math.min(100, Math.round(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight) * 100))); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update) }, [])
  const all = journalEntries.filter((entry) => !entry.draft || journalIncludesDrafts)
  const index = all.findIndex((entry) => entry.slug === article.slug)
  const relatedWorks = works.filter((work) => article.relatedWorks?.includes(work.slug))
  return <><div className="reading-progress" style={{ width: `${progress}%` }} /><Header /><main className="article-page"><a className="article-back" href="#/journal">← JOURNAL一覧へ戻る</a><header className="article-head"><p><span>{article.category}</span><time dateTime={article.date || undefined}>{article.date ? formatDate(article.date) : '公開日未定'}</time>{article.draft && <b>LOCAL DRAFT</b>}</p><h1>{article.title}</h1><p>{article.description}</p></header>{article.cover && <figure className="article-cover"><img src={article.cover} alt="" /><figcaption>{article.title}</figcaption></figure>}<Blocks body={article.body} />{relatedWorks.length > 0 && <section className="article-related"><p className="eyebrow">RELATED WORKS</p>{relatedWorks.map((work) => <a href={`#/works/${work.slug}`} key={work.slug}>{work.title} ↗</a>)}</section>}<nav className="article-pagination">{all[index - 1] && <a href={`#/journal/${all[index - 1].slug}`}>← {all[index - 1].title}</a>}<a href="#/journal">ALL NOTES</a>{all[index + 1] && <a href={`#/journal/${all[index + 1].slug}`}>{all[index + 1].title} →</a>}</nav></main><Footer /></> }
function Footer() { return <footer className="site-footer"><p className="footer-logo">hikacha<span>.</span></p><p>Curiosity makes the next page.</p><small>© {currentYear} hikacha. / The Creative Atelier</small></footer> }
export default function Journal({ slug }) { const article = journalEntries.find((entry) => entry.slug === slug && (!entry.draft || journalIncludesDrafts)); return article ? <Detail article={article} /> : <Index /> }
