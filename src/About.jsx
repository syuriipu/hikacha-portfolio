import { useState } from 'react'
import { aboutData, contacts } from './data'
import { SeasonEdition } from './SeasonShell'
import { inquiries } from './contactConfig'
import { MailLink } from './Contact'
import './About.css'

const currentYear = new Date().getFullYear()

function Header({ onSecretTap }) {
  return <header className="site-header about-header"><a href="#top" className="wordmark">hikacha</a><button type="button" className="about-dot" onClick={onSecretTap} aria-label="ロゴのドット">.</button><p className="header-edition">THE CREATIVE ATELIER<br />ABOUT / PROFILE</p><nav aria-label="メインナビゲーション"><a href="#top">HOME</a><a href="#/works">WORKS</a><a href="#/journal">JOURNAL</a><a href="#/lab">LAB</a><a className="is-current" href="#/about" aria-current="page">ABOUT</a><a href="#/contact">CONTACT</a></nav></header>
}

function Door({ open, onClose }) {
  if (!open) return null
  return <div className="secret-door" role="dialog" aria-modal="true" aria-labelledby="secret-door-title"><div><p className="eyebrow">EDITORIAL ARCHIVES / RESTRICTED</p><h2 id="secret-door-title">秘密の扉を発見しました。</h2><p>この先には編集部の管理が及ばない資料が保管されています。</p><div><a href="#/secret">それでも入る</a><button type="button" onClick={onClose}>あとで戻る</button></div></div></div>
}

function Journey() { return <section className="journey"><header className="about-section-head"><p className="eyebrow">CREATIVE JOURNEY.</p><h2>制作活動の年表</h2><p>作品といっしょに、少しずつ増えてきた制作の記録。</p></header><ol>{aboutData.journey.map((entry) => <li key={`${entry.era}-${entry.title}`}><p>{entry.era}</p><span className="journey-line" aria-hidden="true" /><div className="journey-card">{entry.image && <img src={entry.image} alt="" loading="lazy" />}{entry.href ? <a href={entry.href}><h3>{entry.title}</h3><span>{entry.note} ↗</span></a> : <div><h3>{entry.title}</h3><span>{entry.note}</span></div>}</div></li>)}</ol></section> }

function Footer() { return <footer className="site-footer"><p className="footer-logo">hikacha<span>.</span></p><p>Curiosity makes the next page.</p><div><a href="#/contact">お問い合わせ・アプリサポート</a>{contacts.map((contact) => <a href={contact.url} target="_blank" rel="noreferrer" key={contact.label}>{contact.label} ↗</a>)}</div><small>© {currentYear} hikacha. / The Creative Atelier</small></footer> }

function AboutContent() {
  const [taps, setTaps] = useState(0)
  const [doorOpen, setDoorOpen] = useState(false)
  const tapDot = () => { const next = taps + 1; setTaps(next); if (next >= 5) { setDoorOpen(true); setTaps(0) } }
  return <><Header onSecretTap={tapDot} /><main className="about-page"><section className="about-hero"><p className="eyebrow">THE CREATIVE ATELIER / CREATOR FEATURE</p><h1>About<span>.</span></h1><p className="about-jp">この制作室の住人について。</p><p>好奇心に振り回されながら、今日も何かを作っています。</p></section><section className="profile-feature"><header className="about-section-head"><p className="eyebrow">PROFILE.</p><h2>ひかちゃ</h2><p>CREATOR / MAKER / CURIOUS PERSON</p></header><div className="profile-layout"><div className="profile-mark" aria-hidden="true"><img className="profile-avatar" src="media/atelier-icon.png" alt="" /><span>THE<br />CREATIVE<br />ATELIER</span><i>✦</i></div><div className="profile-copy"><p>{aboutData.profile.intro}</p><aside><small>EDITOR'S NOTE</small><b>{aboutData.profile.editorialNote}</b></aside></div></div></section><Journey /><section className="toolbox"><header className="about-section-head"><p className="eyebrow">TOOLBOX.</p><h2>ものづくりの道具箱</h2><p>アイデアを形にするとき、制作室で頼りにしているもの。</p></header><div className="toolbox-grid">{aboutData.toolbox.map((box, index) => <article key={box.group} className={`toolbox-item tool-${index + 1}`}><span aria-hidden="true">{['▣', '◇', '◌', '✦', '⌘'][index]}</span><h3>{box.group}</h3><p>{box.tools.map((tool) => <i key={tool}>{tool}</i>)}</p></article>)}</div></section><section className="philosophy"><p className="eyebrow">CREATIVE PHILOSOPHY.</p><blockquote>これからもAIを使って、<br />自分のアイデアを爆発させていきたい。</blockquote><p>作りたいものを自由に形にすること。制作そのものを楽しむこと。記録を見返して、新しい気づきを拾うこと。その全部を、これからも大切に。</p></section><section className="about-future"><p className="eyebrow">FUTURE.</p><h2>このポートフォリオを見返すのが大変になるくらい、たくさんの作品を作るぞ〜！</h2><div><a href="#/works">WORKSをのぞく ↗</a><a href="#/journal">JOURNALを読む ↗</a><a href="#/lab">LABへ行く ↗</a><a href={contacts[0].url} target="_blank" rel="noreferrer">GitHub ↗</a><MailLink subject={inquiries.creative.subject}>制作活動に関するお問い合わせ ✉</MailLink><a href="#/contact">CONTACT ↗</a></div><button type="button" className="secret-hint" onClick={tapDot}>最後の点には、少しだけ秘密があります。</button></section></main><Door open={doorOpen} onClose={() => setDoorOpen(false)} /><Footer /></>
}

export default function About() { return <div className="about-seasonal"><div className="about-season-label"><SeasonEdition compact /></div><AboutContent /></div> }
