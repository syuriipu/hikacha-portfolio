import { useEffect, useRef, useState } from 'react'
import { profile, apps, projects, live2d, illustrations, contacts, works } from './data'
import Works from './Works'
import Journal from './Journal'
import Lab from './Lab'
import About from './About'
import Contact from './Contact'
import { StrollingBuddy } from './Buddy'
import Secret, { SecretEaster } from './Secret'
import { journalEntries } from './generated/journal'
import SeasonShell, { SeasonEdition } from './SeasonShell'
import { magazine } from './SeasonConfig'
import './App.css'
import './CoverIcon.css'
import './Polish.css'

const menu = [['WORKS', '#/works'], ['JOURNAL', '#/journal'], ['LAB', '#/lab'], ['ABOUT', '#/about'], ['CONTACT', '#/contact']]
const currentYear = new Date().getFullYear()

function sectionTitle(route) {
  if (route.startsWith('#/works')) return 'Works — hikacha. The Creative Atelier'
  if (route.startsWith('#/journal')) return 'Journal — hikacha. The Creative Atelier'
  if (route.startsWith('#/lab')) return 'Lab — hikacha. The Creative Atelier'
  if (route.startsWith('#/about')) return 'About — hikacha. The Creative Atelier'
  if (route.startsWith('#/contact')) return 'Contact — hikacha. The Creative Atelier'
  if (route.startsWith('#/secret')) return 'ひかちゃについて_最終版_修正済_本当の最終版.pptx'
  return 'hikacha. — The Creative Atelier'
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(node) }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>
}

function RuleTitle({ number, eyebrow, title, note }) {
  return <header className="rule-title"><span className="section-number">{number}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{note && <p className="section-note">{note}</p>}</header>
}

function WorkCard({ app, featured = false }) {
  const image = app.gallery?.[0]?.src || app.image || app.icon
  const alt = app.gallery?.[0]?.alt || `${app.title}のビジュアル`
  return <article className={`work-card ${featured ? 'work-card-featured' : ''}`}>
    <div className={`work-image ${app.gallery ? 'work-gallery' : ''}`}>
      {app.gallery ? <div className="phone-gallery" aria-label={`${app.title}のアプリ画面`}>
        {app.gallery.slice(0, featured ? 3 : 2).map((shot) => <figure className="phone-shot" key={shot.src}><img src={shot.src} alt={shot.alt} loading="lazy" /><figcaption>{shot.label}</figcaption></figure>)}
      </div> : <img src={image} alt={alt} loading="lazy" />}
      <span className="work-year">{app.year}</span>
    </div>
    <div className="work-copy"><p className="card-kicker">APP / GAME</p><p className="project-status project-status-published"><i aria-hidden="true" />公開済み</p><h3>{app.title}</h3><p>{app.lead}</p><ul className="tag-list" aria-label={`${app.title}の技術`}>{app.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="card-links">{app.links.slice(0, 2).map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</div></div>
  </article>
}

export default function App() {
  const archiveCount = apps.length + live2d.length + illustrations.length
  const latestNotes = journalEntries.filter((entry) => !entry.draft).slice(0, 3)
  const homeColony = projects.find((project) => project.slug === 'colony-of-hearts')
  const homeHoliday = projects.find((project) => project.slug === 'holiday-planner')
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])
  useEffect(() => {
    const [, section, slug] = route.split('/')
    const detail = section === 'works' ? works.find((item) => item.slug === slug) : section === 'journal' ? journalEntries.find((item) => item.slug === slug && !item.draft) : section === 'lab' ? projects.find((item) => item.slug === slug && item.visibility === 'public') : null
    const title = detail ? `${detail.title} — hikacha. The Creative Atelier` : sectionTitle(route)
    const description = detail?.description || (route.startsWith('#/contact') ? 'ひかちゃの制作室への問い合わせ窓口。アプリサポート（ゆるすたでぃ・かわいいメモ帳など）や制作活動についてのお問い合わせはメールで受け付けています。' : null) || 'ゲームとアプリと、絵をつくる。ひかちゃの制作室。作品や制作日記、開発中のアイデアを紹介する個人ポートフォリオサイトです。'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.setAttribute('content', route.startsWith('#/secret') ? 'noindex,nofollow' : 'index,follow')
  }, [route])
  if (route.startsWith('#/works')) return <SeasonShell><Works slug={route.split('/')[2]} /></SeasonShell>
  if (route.startsWith('#/journal')) return <SeasonShell><Journal slug={route.split('/')[2]} /></SeasonShell>
  if (route.startsWith('#/lab')) return <SeasonShell><Lab slug={route.split('/')[2]} /></SeasonShell>
  if (route.startsWith('#/secret/why')) return <SecretEaster />
  if (route.startsWith('#/secret')) return <Secret />
  if (route.startsWith('#/about')) return <SeasonShell><About /></SeasonShell>
  if (route.startsWith('#/contact')) return <SeasonShell><Contact /></SeasonShell>
  return <SeasonShell>
    <a className="skip-link" href="#main">本文へ移動</a>
    <header className="site-header"><a href="#top" className="wordmark" aria-label="hikacha. ホーム">hikacha<span>.</span></a><p className="header-edition">THE CREATIVE ATELIER<br />{magazine.volume} / {magazine.year}</p><nav aria-label="メインナビゲーション">{menu.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav></header>
    <main id="main">
      <section id="top" className="cover" aria-labelledby="cover-title"><div className="cover-meta cover-meta-left"><span>PORTFOLIO</span><span>CREATIVE NOTES</span></div><div className="cover-title-wrap"><p className="cover-intro">A small collection of games, apps &amp; drawings</p><h1 id="cover-title"><span>hikacha.</span><em>The Creative<br />Atelier</em></h1><p className="cover-caption">ゲームとアプリと、絵をつくる<br />ひかちゃの制作室。</p><SeasonEdition className="cover-season" /></div><figure className="cover-visual cover-icon"><img src={magazine.coverImage} alt="ひかちゃのアトリエアイコン" /><figcaption>{magazine.coverCaption}</figcaption></figure><div className="cover-meta cover-meta-right"><span>BASED IN JAPAN</span><span>MAKE WITH CURIOSITY</span></div><a className="scroll-note" href="#works">SCROLL TO EXPLORE <i aria-hidden="true">↓</i></a></section>

      <section id="works" className="content-section works-section"><RuleTitle number="01" eyebrow="SELECTED WORKS" title="作品展示室" note="つくることから、見せることまで。" /><div className="works-layout">{apps.map((app, index) => <Reveal className={`work-position-${index + 1}`} key={app.title}><WorkCard app={app} featured={index === 0} /></Reveal>)}</div><p className="margin-note">※ 各作品のストアページへ移動できます</p></section>

      <section id="journal" className="content-section journal-section"><RuleTitle number="02" eyebrow="FROM THE JOURNAL" title="制作日記" note="制作の途中に残しておきたい、短い記録。" /><div className={`journal-grid is-count-${Math.max(latestNotes.length, 1)}`}>{latestNotes.length ? latestNotes.map((note, index) => <Reveal key={note.slug}><article className={`journal-card ${index === 0 ? 'journal-card-feature' : ''}`}><div className="journal-meta"><time dateTime={note.date}>{note.date}</time><span>{note.category}</span></div><h3>{note.title}</h3><p>{note.description}</p><a className="journal-link" href={`#/journal/${note.slug}`}>記事を読む ↗</a></article></Reveal>) : <Reveal><article className="journal-card journal-card-feature"><p className="feature-stamp">NEXT ISSUE</p><div className="journal-meta"><span>JOURNAL</span><span>PREPARING</span></div><h3>制作室からの<br />記録を準備中。</h3><p>公開できる記事ができたら、ここに最新の制作記録が並びます。</p><a className="journal-link" href="#/journal">JOURNALをのぞく ↗</a></article></Reveal>}</div><p id="journal-note" className="section-footnote">公開記事はJOURNALのMarkdownから自動で反映されます。</p></section>

      <section id="lab" className="content-section lab-section"><RuleTitle number="03" eyebrow="IN THE LAB" title="アイデアの種" note="まだ完成していないものほど、面白い。" /><div className="lab-status-key"><span><i className="status-dot planning" />発芽</span><span><i className="status-dot development" />成長</span><a href="#/lab">アイデアの庭を見る ↗</a></div><Reveal><article className="lab-feature"><div className="lab-text"><p className="status"><i className="status-dot development" />GROWING / 成長</p><h3>{homeColony.title}</h3><p className="lab-lead">{homeColony.description}</p><p>{homeColony.concept}</p><ul>{homeColony.features.map((feature) => <li key={feature.title}><strong>{feature.title}</strong><span>{feature.text}</span></li>)}</ul><div className="tag-list">{homeColony.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="journal-link" href={`#/lab/${homeColony.slug}`}>育成ノートをひらく ↗</a></div><div className="lab-images">{homeColony.images.map((image, index) => <figure className={`lab-image lab-image-${index + 1}`} key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption>DEVELOPMENT SNAPSHOT</figcaption></figure>)}</div></article></Reveal><Reveal><article className="project-seed"><div><p className="status"><i className="status-dot planning" />SPROUT / 発芽</p><h3>{homeHoliday.title}</h3><p>{homeHoliday.description} 詳細は、制作の進行に合わせてこの場所に追加していきます。</p><a className="journal-link" href={`#/lab/${homeHoliday.slug}`}>育成ノートをひらく ↗</a></div><p className="seed-note">NEXT SEED<br />IN THE ATELIER</p></article></Reveal></section>

      <section id="about" className="content-section about-section"><RuleTitle number="04" eyebrow="ABOUT THE MAKER" title="制作室について" note="企画・開発・絵を、行ったり来たり。" /><div className="about-layout"><div className="about-copy"><p className="about-name">{profile.name}<span> / creator</span></p><p>{profile.about}</p><div className="skill-lines">{profile.skills.map((skill) => <span key={skill.label}>{skill.label}<small>{skill.note}</small></span>)}</div></div><aside className="counter" aria-label="制作アーカイブの内訳"><p>ATELIER ARCHIVE</p><strong>{archiveCount}</strong><span>pieces in the studio</span><dl><div><dt>{apps.length}</dt><dd>APPS &amp; GAMES</dd></div><div><dt>{live2d.length}</dt><dd>LIVE2D WORKS</dd></div><div><dt>{illustrations.length}</dt><dd>ILLUSTRATIONS</dd></div></dl></aside></div><div className="shelf" aria-label="アトリエの棚">{live2d.map((model) => <figure key={model.video}><video muted loop playsInline preload="metadata" poster={`${model.video}.jpg`}><source src={`${model.video}.mp4`} type="video/mp4" /></video><figcaption>{model.title}</figcaption></figure>)}</div></section>
      <aside className="home-contact" aria-label="お問い合わせのご案内"><p><span>LETTERS TO THE ATELIER</span>アプリのサポートや制作活動についてのお便りは、お問い合わせ窓口へ。</p><a href="#/contact">お問い合わせ・アプリサポート →</a></aside>
    </main>
    <footer className="site-footer"><StrollingBuddy /><p className="footer-logo">hikacha<span>.</span></p><p>Curiosity makes the next page.</p><div><a href="#/contact">お問い合わせ・アプリサポート</a>{contacts.map((contact) => <a href={contact.url} target="_blank" rel="noreferrer" key={contact.label}>{contact.label} ↗</a>)}</div><small>© {currentYear} hikacha. / The Creative Atelier</small></footer>
  </SeasonShell>
}
