// 問い合わせ窓口の設定はぜんぶここ。
// メールアドレスを変えるときは CONTACT_EMAIL だけ書き換えれば、CONTACT・WORKS・ABOUT・フッターすべてに反映されます。
import { works } from './data'

export const CONTACT_EMAIL = 'hikatya.apps@gmail.com'

// アプリサポート用の本文テンプレート。改行はメールアプリで正しく表示されるよう \r\n にしています。
export const APP_SUPPORT_BODY = [
  '・お問い合わせ内容：',
  '',
  '・使用端末（任意）：',
  '・OSバージョン（任意）：',
  '・アプリのバージョン（任意）：',
  '',
].join('\r\n')

// 件名・本文は encodeURIComponent でURLエンコードします（日本語・記号・改行も安全に渡せます）。
export function buildMailto({ subject, body } = {}) {
  const params = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${CONTACT_EMAIL}${params.length ? `?${params.join('&')}` : ''}`
}

export const appSupportSubject = (title) => `【${title}】お問い合わせ`
export const appSupportMailto = (title) => buildMailto({ subject: appSupportSubject(title), body: APP_SUPPORT_BODY })

// 公開中のアプリ・ゲーム（WORKSで status: '公開済み' のもの）に自動で問い合わせボタンが付きます。
export const supportedApps = works.filter((item) => item.status === '公開済み' && (item.category === 'APP' || item.category === 'GAME'))
export const isSupportedApp = (item) => supportedApps.some((app) => app.slug === item.slug)

export const inquiries = {
  creative: { subject: '【制作活動について】お問い合わせ' },
  other: { subject: '【その他】お問い合わせ' },
}
export const creativeMailto = buildMailto({ subject: inquiries.creative.subject })
export const otherMailto = buildMailto({ subject: inquiries.other.subject })

// クリップボードへのコピー。古いブラウザや http 環境でも動くよう、選択→コピーの方式にフォールバックします。
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // フォールバックへ
  }
  try {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.top = '0'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    field.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    field.remove()
    return ok
  } catch {
    return false
  }
}
