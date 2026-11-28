export const seasons = {
  spring: { label: 'SPRING EDITION', ja: '春の特別号', message: '', accent: '#d89aaa', soft: '#f4e2e6', motif: '✿' },
  summer: { label: 'SUMMER EDITION', ja: '夏の特別号', message: '', accent: '#679f9d', soft: '#dceced', motif: '❋' },
  autumn: { label: 'AUTUMN EDITION', ja: '秋の特別号', message: '', accent: '#b27a3f', soft: '#f1e4cf', motif: '❦' },
  winter: { label: 'WINTER EDITION', ja: '冬の特別号', message: '', accent: '#7696ad', soft: '#e2ebf0', motif: '❄' },
}

export const events = {
  newyear: { label: 'NEW YEAR', message: 'あけましておめでとうございます。今年もたくさん作るぞ〜！', motif: '❀' },
  aprilfools: { label: 'EDITORIAL NOTICE', message: '本日の編集部は、少々様子がおかしいようです。', motif: '!' },
  halloween: { label: 'HALLOWEEN NOTE', message: '', motif: '♧' },
  christmas: { label: 'WINTER LETTER', message: '', motif: '✦' },
}

const eventSeasons = { newyear: 'winter', aprilfools: 'spring', halloween: 'autumn', christmas: 'winter' }

export const magazine = {
  volume: 'VOL. 01',
  year: '2026',
  coverCaption: 'ATELIER ICON / hikacha.',
  // 特集はJOURNAL側の featured: true を優先。表紙画像はここで差し替えられます。
  coverImage: 'media/atelier-icon.png',
}

function japanParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric' }).formatToParts(date)
  return Object.fromEntries(parts.filter(({ type }) => type !== 'literal').map(({ type, value }) => [type, Number(value)]))
}

export function getSeason(date) {
  const { month } = japanParts(date)
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

export function getEvent(date) {
  const { month, day } = japanParts(date)
  if (month === 1 && day <= 7) return 'newyear'
  if (month === 4 && day === 1) return 'aprilfools'
  if (month === 10 && day >= 25 && day <= 31) return 'halloween'
  if (month === 12 && day >= 20 && day <= 25) return 'christmas'
  return null
}

export function seasonalState(mode = 'auto', date = new Date()) {
  if (mode === 'none') return { season: null, event: null }
  if (seasons[mode]) return { season: mode, event: null }
  if (events[mode]) return { season: eventSeasons[mode], event: mode }
  return { season: getSeason(date), event: getEvent(date) }
}
