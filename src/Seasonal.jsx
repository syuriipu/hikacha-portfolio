import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { events, seasons, seasonalState } from './seasonal'
import './Seasonal.css'

const SeasonContext = createContext({ season: null, event: null, paused: false })
// Legacy seasonal shell kept for source compatibility; its hook shares the provider module.
// oxlint-disable-next-line react/only-export-components
export const useSeason = () => useContext(SeasonContext)

function Ornament({ season, event }) {
  if (!season && !event) return null
  const characters = season === 'spring' ? ['✿', '❀', '•', '✿'] : season === 'summer' ? ['❋', '⌇', '❧', '•'] : season === 'autumn' ? ['❦', '●', '❧', '•'] : ['❄', '·', '✧', '❄']
  const eventMarks = event === 'halloween' ? ['♧', '◒'] : event === 'christmas' ? ['✦', '♢'] : event === 'newyear' ? ['❀', '〰'] : event === 'aprilfools' ? ['?', '!'] : []
  return <aside className="season-ornaments" aria-hidden="true">{characters.map((mark, index) => <i className={`season-piece piece-${index + 1}`} key={`${mark}-${index}`}>{mark}</i>)}{eventMarks.map((mark, index) => <i className={`event-piece event-piece-${index + 1}`} key={`${mark}-${index}`}>{mark}</i>)}</aside>
}

export function SeasonEdition({ compact = false, className = '' }) {
  const { season, event } = useSeason()
  const info = event ? events[event] : season ? seasons[season] : null
  if (!info) return null
  return <p className={`season-edition ${compact ? 'is-compact' : ''} ${className}`}><span>{info.motif}</span><b>{event ? info.label : info.label}</b>{!compact && <em>{info.message}</em>}</p>
}

export default function SeasonShell({ children }) {
  const [mode, setMode] = useState('auto')
  const [paused, setPaused] = useState(false)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000)
    return () => window.clearInterval(timer)
  }, [])
  const value = useMemo(() => ({ ...seasonalState(mode, now), paused }), [mode, now, paused])
  const info = value.event ? events[value.event] : value.season ? seasons[value.season] : null
  return <SeasonContext.Provider value={value}><div className={`season-shell ${value.season ? `season-${value.season}` : 'season-none'} ${value.event ? `event-${value.event}` : ''} ${paused ? 'season-paused' : ''}`} style={info ? { '--season-accent': info.accent || seasons[value.season]?.accent, '--season-soft': info.soft || seasons[value.season]?.soft } : undefined}><Ornament season={value.season} event={value.event} />{children}<button className="season-motion-toggle" type="button" onClick={() => setPaused((current) => !current)} aria-pressed={paused}>{paused ? '季節の動きを再開' : '季節の動きを止める'}</button>{import.meta.env.DEV && <aside className="season-preview" aria-label="季節プレビュー"><label>SEASON PREVIEW<select value={mode} onChange={(event) => setMode(event.target.value)}><option value="auto">自動判定</option><option value="spring">春</option><option value="summer">夏</option><option value="autumn">秋</option><option value="winter">冬</option><option value="newyear">お正月</option><option value="aprilfools">エイプリルフール</option><option value="halloween">ハロウィン</option><option value="christmas">クリスマス</option><option value="none">装飾なし</option></select></label></aside>}</div></SeasonContext.Provider>
}
