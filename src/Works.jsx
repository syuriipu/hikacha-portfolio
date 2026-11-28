import { useEffect, useMemo, useState } from 'react'
import { contacts, works } from './data'
import { SeasonEdition } from './SeasonShell'
import { APP_SUPPORT_BODY, appSupportSubject, isSupportedApp } from './contactConfig'
import { MailLink } from './Contact'
import { StrollingBuddy } from './Buddy'
import './Works.css'

const categories = ['ALL', 'APP', 'GAME', 'LIVE2D', 'ART']
const sortOptions = [['featured', 'おすすめ順'], ['newest', '新しい順'], ['oldest', '古い順']]
const currentYear = new Date().getFullYear()

function SiteHeader() {
  return <header className="site-header works-header"><a href="#top" className="wordmark">hikacha<span>.</span></a><p className="header-edition">THE CREATIVE ATELIER<br />WORKS / ARCHIVE</p><nav aria-label="メインナビゲーション"><a href="#top">HOME</a><a className="is-current" href="#/works" aria-current="page">WORKS</a><a href="#/journal">JOURNAL</a><a href="#/lab">LAB</a><a href="#/about">ABOUT</a><a href="#/contact">CONTACT</a></nav></header>
}

function PhoneGallery({ item, compact = false }) {
  const shots = item.gallery?.slice(0, compact ? 2 : 3) || []
  return <div className={`work-phone-gallery ${compact ? 'compact' : ''}`}>{shots.map((shot) => <figure key={shot.src} className="work-phone"><img src={shot.src} alt={shot.alt} loading="lazy" /><figcaption>{shot.label}</figcaption></figure>)}</div>
}

function WorkVisual({ item, compact = false, onOpen }) {
  if (item.category === 'APP') return <PhoneGallery item={item} compact={compact} />
  if (item.category === 'LIVE2D') return <div className="work-portrait"><img src={item.image} alt={item.title} loading="lazy" /><span className="play-mark" aria-label="動画あり">▶</span></div>
  return <div className={`work-art ${item.category === 'GAME' ? 'game' : ''}`}><img src={item.image} alt={item.title} loading="lazy" onClick={onOpen} /></div>
}

function WorkCard({ item }) {
  return <a className={`archive-card archive-${item.category.toLowerCase()}`} href={`#/works/${item.slug}`}>
    <div className="archive-visual" style={{ '--work-accent': item.accent, '--work-wash': item.wash }}><WorkVisual item={item} compact /></div>
    <div className="archive-copy"><p className="archive-meta"><span>{item.category}</span>{item.year && <span>{item.year}</span>}</p><h2>{item.title}</h2><p>{item.lead}</p><div className="archive-bottom">{item.status && <span className="archive-status">{item.status}</span>}<span>VIEW WORK ↗</span></div></div>
  </a>
}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined
    const close = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [item, onClose])
  if (!item) return null
  return <button className="works-lightbox" onClick={onClose} aria-label="拡大表示を閉じる"><img src={item.src} alt={item.alt} /><span>{item.label}</span></button>
}

function RandomCorner({ current, onNext }) {
  const image = current.gallery?.[0]?.src || current.image
  return <aside className="random-corner" style={{ '--work-accent': current.accent, '--work-wash': current.wash }}><header className="random-heading"><p className="eyebrow">A CHANCE ENCOUNTER</p><p className="random-title">今日の一作品</p><p className="random-intro">小さな偶然から、新しい作品との出会いを。</p></header><div className="random-feature" key={current.slug}><div className={`random-media ${current.category === 'APP' ? 'is-app' : ''}`}>{current.category === 'APP' ? <div className="random-phone-row">{current.gallery.slice(0, 2).map((shot) => <figure key={shot.src}><img src={shot.src} alt={shot.alt} loading="lazy" /></figure>)}</div> : <img src={image} alt={current.title} loading="lazy" />}</div><div className="random-copy"><span>{current.category}</span><h2>{current.title}</h2><p>{current.lead}</p><div className="random-actions"><a href={`#/works/${current.slug}`}>作品を見る ↗</a><button type="button" onClick={onNext}><i aria-hidden="true">⤨</i>別の作品に出会う</button></div></div></div></aside>
}

function WorksIndex() {
  const [category, setCategory] = useState('ALL')
  const [sort, setSort] = useState('featured')
  const [random, setRandom] = useState(() => works[0])
  const filtered = useMemo(() => {
    const entries = category === 'ALL' ? [...works] : works.filter((item) => item.category === category)
    if (sort === 'featured') return entries.sort((a, b) => a.order - b.order)
    return entries.sort((a, b) => {
      if (a.yearNumber == null && b.yearNumber == null) return a.order - b.order
      if (a.yearNumber == null) return 1
      if (b.yearNumber == null) return -1
      return sort === 'newest' ? b.yearNumber - a.yearNumber : a.yearNumber - b.yearNumber
    })
  }, [category, sort])
  const chooseRandom = () => {
    if (works.length < 2) return
    const candidates = works.filter((item) => item.slug !== random.slug)
    setRandom(candidates[Math.floor(Math.random() * candidates.length)])
  }
  return <><SiteHeader /><main className="works-page"><section className="works-hero"><p className="eyebrow">THE CREATIVE ATELIER / ARCHIVE</p><h1>Works<span>.</span></h1><p className="works-jp">これまでに、かたちにしたもの。</p><p>アプリ、ゲーム、Live2D、イラスト。手を動かして残してきた作品の展示室です。</p><SeasonEdition compact /></section><section className="works-controls" aria-label="作品の絞り込みと並べ替え"><div className="category-tabs">{categories.map((name) => <button type="button" className={category === name ? 'active' : ''} onClick={() => setCategory(name)} key={name}>{name}<small>{name === 'ALL' ? works.length : works.filter((item) => item.category === name).length}</small></button>)}</div><label className="sort-control">並べ替え<select value={sort} onChange={(event) => setSort(event.target.value)}>{sortOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label></section><section className="works-exhibition" aria-live="polite"><p className="exhibition-count">{category} / {filtered.length} WORKS</p><div className="archive-grid">{filtered.map((item) => <WorkCard item={item} key={item.slug} />)}</div></section><RandomCorner current={random} onNext={chooseRandom} /></main><Footer /></>
}

function Detail({ item }) {
  const [lightbox, setLightbox] = useState(null)
  const index = works.findIndex((entry) => entry.slug === item.slug)
  const previous = works[(index - 1 + works.length) % works.length]
  const next = works[(index + 1) % works.length]
  const visual = item.category === 'LIVE2D'
    ? <video className="detail-video" controls playsInline preload="metadata" poster={item.image}><source src={`${item.video}.mp4`} type="video/mp4" /></video>
    : <WorkVisual item={item} onOpen={() => setLightbox(item.gallery?.[0])} />
  return <><SiteHeader /><main className="detail-page"><a href="#/works" className="back-link">← 作品展示室に戻る</a><article className={`detail-article detail-${item.category.toLowerCase()}`}><header className="detail-head"><p className="eyebrow">{item.category} {item.status && ` / ${item.status}`}</p><h1>{item.title}</h1>{item.year && <p className="detail-year">{item.year}</p>}<p className="detail-lead">{item.lead}</p></header><div className="detail-visual">{visual}</div><div className="detail-story"><section><h2>作品について</h2><p>{item.body || item.note || item.lead}</p></section>{item.tags?.length > 0 && <section><h2>使用技術</h2><ul className="detail-tags">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></section>}{item.stat && <p className="detail-stat">{item.stat}</p>}</div>{item.category === 'APP' && <section className="detail-gallery"><h2>SCREEN COLLECTION</h2><div className="detail-phones">{item.gallery.map((shot) => <button key={shot.src} type="button" onClick={() => setLightbox(shot)}><img src={shot.src} alt={shot.alt} loading="lazy" /><span>{shot.label}</span></button>)}</div></section>}{item.category === 'ART' && <section className="detail-gallery art-gallery"><h2>GALLERY</h2>{item.gallery.map((shot) => <button key={shot.src} type="button" onClick={() => setLightbox(shot)}><img src={shot.src} alt={shot.alt} loading="lazy" /><span>クリックして拡大</span></button>)}</section>}{item.links?.length > 0 && <section className="detail-links"><h2>LINKS</h2>{item.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.label}>{link.label} ↗</a>)}</section>}{isSupportedApp(item) && <section className="detail-contact" aria-label="このアプリについてのお問い合わせ"><h2>SUPPORT</h2><p>不具合のご報告、使い方のご質問、ご要望はメールで受け付けています。</p><MailLink className="letter-button" subject={appSupportSubject(item.title)} body={APP_SUPPORT_BODY}><span aria-hidden="true">✉</span>このアプリについて問い合わせる</MailLink><a className="text-link" href="#/contact">お問い合わせ窓口・アドレスのコピーはこちら →</a></section>}</article><nav className="work-pagination" aria-label="作品を移動"><a href={`#/works/${previous.slug}`}><small>PREVIOUS</small>{previous.title}</a><a href="#/works" className="pagination-index">ALL WORKS</a><a href={`#/works/${next.slug}`}><small>NEXT</small>{next.title}</a></nav></main><Lightbox item={lightbox} onClose={() => setLightbox(null)} /><Footer /></>
}

function Footer() { return <footer className="site-footer"><StrollingBuddy /><p className="footer-logo">hikacha<span>.</span></p><p>Curiosity makes the next page.</p><div><a href="#/contact">お問い合わせ・アプリサポート</a>{contacts.map((contact) => <a href={contact.url} target="_blank" rel="noreferrer" key={contact.label}>{contact.label} ↗</a>)}</div><small>© {currentYear} hikacha. / The Creative Atelier</small></footer> }

export default function Works({ slug }) { const item = works.find((entry) => entry.slug === slug); return item ? <Detail item={item} /> : <WorksIndex /> }
