import { useEffect, useRef, useState } from 'react'
import { contacts } from './data'
import { events, seasons } from './SeasonConfig'
import { SeasonEdition, useSeason } from './SeasonShell'
import { APP_SUPPORT_BODY, CONTACT_EMAIL, appSupportSubject, buildGmailUrl, buildMailto, copyText, inquiries, supportedApps } from './contactConfig'
import PhotoPlate from './PhotoPlate'
import { StrollingBuddy } from './Buddy'
import { photos } from './photos'
import './Contact.css'

const currentYear = new Date().getFullYear()

function Header() {
  return <header className="site-header contact-header"><a href="#top" className="wordmark">hikacha<span>.</span></a><p className="header-edition">THE CREATIVE ATELIER<br />CONTACT</p><nav aria-label="メインナビゲーション"><a href="#top">HOME</a><a href="#/works">WORKS</a><a href="#/journal">JOURNAL</a><a href="#/lab">LAB</a><a href="#/about">ABOUT</a><a className="is-current" href="#/contact" aria-current="page">CONTACT</a></nav></header>
}

function Footer() { return <footer className="site-footer"><StrollingBuddy /><p className="footer-logo">hikacha<span>.</span></p><p>ここが最新のようです(´ω`)</p><div><a href="#/contact">お問い合わせ・アプリサポート</a>{contacts.map((contact) => <a href={contact.url} target="_blank" rel="noreferrer" key={contact.label}>{contact.label} ↗</a>)}</div><small>© {currentYear} hikacha. / The Creative Atelier</small></footer> }

// 封筒・便箋・切手・消印の装飾。切手の色と図柄は季節に合わせて変わります。
function LetterIllustration() {
  const { season, event } = useSeason()
  const motif = (event && events[event]?.motif) || (season && seasons[season]?.motif) || '✉'
  return <svg className="letter-illustration" viewBox="0 0 320 240" aria-hidden="true">
    <g className="li-letter">
      <rect x="62" y="18" width="176" height="150" rx="2" />
      <path className="li-rule" d="M82 52h108M82 70h136M82 88h124M82 106h136M82 124h96" />
      <path className="li-script" d="M84 38c6-7 10 4 16-2s9-5 13 0 8-4 12-1" />
    </g>
    <g className="li-envelope">
      <path className="li-env-back" d="M30 96h260v122H30z" />
      <path className="li-env-front" d="M30 96l130 78 130-78v122H30z" />
      <path className="li-env-line" d="M30 218l102-70M290 218l-102-70" />
      <path className="li-airmail" d="M30 212h260" />
    </g>
    <g className="li-stamp" transform="rotate(5 252 70)">
      <rect className="li-stamp-edge" x="222" y="36" width="60" height="72" />
      <rect className="li-stamp-face" x="228" y="42" width="48" height="60" />
      <text className="li-stamp-motif" x="252" y="80" textAnchor="middle">{motif}</text>
      <text className="li-stamp-value" x="252" y="97" textAnchor="middle">hikacha.</text>
    </g>
    <g className="li-postmark">
      <circle cx="210" cy="132" r="25" />
      <circle cx="210" cy="132" r="19" />
      <text x="210" y="129" textAnchor="middle">ATELIER</text>
      <text x="210" y="140" textAnchor="middle">{currentYear}</text>
      <path d="M240 122c8-5 14 5 22 0s14 5 22 0M240 132c8-5 14 5 22 0s14 5 22 0M240 142c8-5 14 5 22 0s14 5 22 0" />
    </g>
    <g className="li-seal"><circle cx="160" cy="170" r="12" /><path d="M154 170h12M160 164v12" /></g>
  </svg>
}

function SmallStamp({ label }) {
  return <svg className="small-stamp" viewBox="0 0 44 52" aria-hidden="true"><rect className="li-stamp-edge" x="2" y="2" width="40" height="48" /><rect className="li-stamp-face" x="6" y="6" width="32" height="40" /><text x="22" y="31" textAnchor="middle">{label}</text></svg>
}

export function CopyEmailButton({ className = '' }) {
  const [state, setState] = useState('idle')
  const timer = useRef(null)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = async () => {
    const ok = await copyText(CONTACT_EMAIL)
    setState(ok ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2600)
  }
  return <span className={`copy-email ${className}`}>
    <button type="button" className="letter-button is-ghost" onClick={copy}><span aria-hidden="true">⧉</span>アドレスをコピー</button>
    <span className={`copy-status ${state !== 'idle' ? 'is-shown' : ''} ${state === 'failed' ? 'is-failed' : ''}`} role="status" aria-live="polite">{state === 'copied' ? 'コピーしました' : state === 'failed' ? 'コピーできませんでした。アドレスを選択してコピーしてください。' : ''}</span>
  </span>
}

// mailtoリンク。押して約1.2秒たってもメールアプリへ切り替わらなかったら、
// Gmailで書く・アドレス/件名/本文のコピーといった代わりの方法を表示します。
export function MailLink({ subject, body, className = '', wrapperClassName = '', children }) {
  const [fallback, setFallback] = useState(false)
  const [message, setMessage] = useState('')
  const timers = useRef([])
  const cleanup = useRef(() => {})
  useEffect(() => () => { timers.current.forEach((id) => window.clearTimeout(id)); cleanup.current() }, [])
  const onClick = () => {
    cleanup.current()
    let left = false
    const mark = () => { left = true }
    window.addEventListener('blur', mark)
    document.addEventListener('visibilitychange', mark)
    cleanup.current = () => { window.removeEventListener('blur', mark); document.removeEventListener('visibilitychange', mark) }
    timers.current.push(window.setTimeout(() => { cleanup.current(); if (!left) setFallback(true) }, 1200))
  }
  const copy = async (text, label) => {
    const ok = await copyText(text)
    setMessage(ok ? `${label}をコピーしました` : 'コピーできませんでした。手動で選択してコピーしてください。')
    timers.current.push(window.setTimeout(() => setMessage(''), 2600))
  }
  return <span className={`mail-link ${wrapperClassName}`}>
    <a className={className} href={buildMailto({ subject, body })} onClick={onClick}>{children}</a>
    {fallback && <span className="mail-fallback" role="group" aria-label="メールアプリが開かない場合">
      <span className="mail-fallback-head"><b>メールアプリが開きませんでしたか？</b><button type="button" className="mail-fallback-close" onClick={() => setFallback(false)} aria-label="閉じる">×</button></span>
      <span className="mail-fallback-text">お使いのメールから、下の内容で送っていただけます。</span>
      <span className="mail-fallback-actions">
        <a href={buildGmailUrl({ subject, body })} target="_blank" rel="noreferrer">Gmailで書く ↗</a>
        <button type="button" onClick={() => copy(CONTACT_EMAIL, 'アドレス')}>アドレスをコピー</button>
        {subject && <button type="button" onClick={() => copy(subject, '件名')}>件名をコピー</button>}
        {body && <button type="button" onClick={() => copy(body.replace(/\r\n/g, '\n'), '本文')}>本文をコピー</button>}
      </span>
      <span className="mail-fallback-status" role="status" aria-live="polite">{message}</span>
    </span>}
  </span>
}

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return <><a className="skip-link" href="#contact-main">本文へ移動</a><Header /><main id="contact-main" className="contact-page">
    <section className="contact-hero" aria-labelledby="contact-title">
      <div className="contact-hero-copy">
        <h1 id="contact-title">Contact<span>.</span></h1>
        <p className="contact-jp">制作室へのお手紙。</p>
        <p>アプリのこと、作品のこと、ただの感想でも。気軽にどうぞ！</p>
        <SeasonEdition compact />
      </div>
      <LetterIllustration />
    </section>

    <PhotoPlate photo={photos.contact} variant="gallery" className="contact-photo" />

    <section className="contact-address" aria-labelledby="address-title">
      <div className="address-stripe" aria-hidden="true" />
      <div className="address-body">
        <p className="address-to"><span>TO</span>hikacha. Atelier</p>
        <h2 id="address-title" className="visually-hidden">問い合わせ先メールアドレス</h2>
        <a className="address-mail" href={buildMailto()}>{CONTACT_EMAIL}</a>
        <p className="address-note">お問い合わせは、すべてこのメールアドレスで受け付けています。</p>
        <div className="address-actions">
          <MailLink className="letter-button"><span aria-hidden="true">✉</span>メールを書く</MailLink>
          <CopyEmailButton />
        </div>
        <p className="address-fallback">メールアプリが開かない場合は、アドレスをコピーして、お使いのメールサービスから送ってください。</p>
      </div>
      <img className="address-cat" src="media/art/doodle-cat.webp" alt="猫耳の葛城が、猫の手で手招きしている落書き" width="699" height="1060" loading="lazy" />
      <SmallStamp label="✉" />
    </section>

    <section className="letter-grid" aria-label="お問い合わせの種類">
      <article className="letter-card letter-support" id="app-support">
        <p className="letter-number">No. 01</p>
        <p className="eyebrow">App Support.</p>
        <h2>アプリサポート</h2>
        <p>アプリの不具合報告、使い方のご質問、ご要望などを受け付けています。ボタンを押すと、件名と記入用のテンプレートが入った状態でメールアプリが開きます。</p>
        <ul className="app-letters">{supportedApps.map((app) => <li key={app.slug}>
          <MailLink className="app-letter" wrapperClassName="is-block" subject={appSupportSubject(app.title)} body={APP_SUPPORT_BODY}>
            <span className="app-letter-icon">{(app.icon || app.image) && <img src={app.icon || app.image} alt="" loading="lazy" />}</span>
            <span className="app-letter-text"><small>{app.category}</small><b>{app.title}</b><i>このアプリについて問い合わせる ✉</i></span>
          </MailLink>
        </li>)}</ul>
        <p className="template-preview"><small>自動で入る本文</small>・お問い合わせ内容：<br />・使用端末（任意）：<br />・OSバージョン（任意）：<br />・アプリのバージョン（任意）：</p>
      </article>
      <article className="letter-card" id="creative">
        <p className="letter-number">No. 02</p>
        <p className="eyebrow">Creative Inquiry.</p>
        <h2>制作活動について</h2>
        <p>作品や制作活動に関するお問い合わせはこちらから。</p>
        <MailLink className="letter-button" wrapperClassName="is-card-action" subject={inquiries.creative.subject}><span aria-hidden="true">✉</span>制作活動について問い合わせる</MailLink>
      </article>
      <article className="letter-card" id="other">
        <p className="letter-number">No. 03</p>
        <p className="eyebrow">Other Messages.</p>
        <h2>その他</h2>
        <p>その他のご質問・ご感想など。ひとことでも嬉しいです！</p>
        <MailLink className="letter-button" wrapperClassName="is-card-action" subject={inquiries.other.subject}><span aria-hidden="true">✉</span>その他のお便りを送る</MailLink>
      </article>
    </section>

    <aside className="contact-notice" aria-labelledby="notice-title">
      <p className="eyebrow">EDITORIAL NOTICE</p>
      <h2 id="notice-title">編集部からのお知らせ</h2>
      <p>個人で制作・運営しているため、お返事までお時間をいただく場合があります。ご了承ください。</p>
      <p>不具合についてのお問い合わせは、使用端末や発生時の状況を添えていただけると助かります。</p>
      <p className="notice-caution"><span aria-hidden="true">※</span>パスワードやアカウント情報などの機密情報は、メールに書かずにお送りください。</p>
      <p className="notice-sign">— hikacha.</p>
    </aside>
  </main><Footer /></>
}
