import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { events, seasons, seasonalState } from './SeasonConfig'
import './Seasonal.css'
import './SeasonAdditions.css'
import './SeasonIllustrations.css'
import './SeasonAnchors.css'
import './SeasonEdgePlacement.css'

const SeasonContext = createContext({ season: null, event: null, paused: false })
// Context hook must share this module with the provider used by every page.
// oxlint-disable-next-line react/only-export-components
export const useSeason = () => useContext(SeasonContext)

const placements = [{ x: '1%', y: '7%', size: 28, delay: -2, speed: 13 }, { x: '3%', y: '31%', size: 19, delay: -8, speed: 17 }, { x: '96%', y: '8%', size: 27, delay: -5, speed: 15 }, { x: '95%', y: '27%', size: 17, delay: -10, speed: 12 }, { x: '1%', y: '56%', size: 23, delay: -4, speed: 18 }, { x: '95%', y: '59%', size: 24, delay: -11, speed: 16 }, { x: '1%', y: '78%', size: 18, delay: -7, speed: 14 }, { x: '96%', y: '83%', size: 26, delay: -1, speed: 19 }, { x: '2%', y: '13%', size: 15, delay: -13, speed: 16 }, { x: '95%', y: '42%', size: 17, delay: -3, speed: 20 }, { x: '1%', y: '91%', size: 25, delay: -9, speed: 17 }, { x: '96%', y: '94%', size: 15, delay: -6, speed: 14 }]

function Motif({ type, variant = 0 }) {
  if (type === 'spring') return <svg viewBox="0 0 64 64"><g className="petals"><ellipse cx="32" cy="16" rx="10" ry="16" /><ellipse cx="48" cy="32" rx="16" ry="10" /><ellipse cx="32" cy="48" rx="10" ry="16" /><ellipse cx="16" cy="32" rx="16" ry="10" /><circle cx="32" cy="32" r="7" /></g></svg>
  if (type === 'summer') return <svg viewBox="0 0 64 64"><path className="leaf-main" d="M53 8C22 9 10 27 10 53c25 0 43-12 43-45Z" /><path className="leaf-vein" d="M14 49 48 14M25 38l4 11m8-23 11 4" /></svg>
  if (type === 'autumn' && variant % 3 === 1) return <svg viewBox="0 0 64 64"><path className="ginkgo" d="M32 10C8 10 8 45 31 47 55 45 56 10 32 10Z" /><path className="leaf-vein" d="M32 13v43m-13-24 13 8 13-8" /><path className="stem" d="M32 47v11" /></svg>
  if (type === 'autumn' && variant % 3 === 2) return <svg viewBox="0 0 64 64"><ellipse className="acorn" cx="34" cy="38" rx="14" ry="18" /><path className="acorn-cap" d="M20 34c7-14 24-14 29 0-8 5-22 5-29 0Z" /><path className="stem" d="M35 20c3-8 9-8 12-6" /></svg>
  if (type === 'autumn') return <svg viewBox="0 0 64 64"><path className="maple" d="m32 5 6 15 13-8-4 16 13 4-15 7 5 14-18-9-18 9 5-14-15-7 13-4-4-16 13 8z" /><path className="stem" d="M32 43v15" /></svg>
  return <svg viewBox="0 0 64 64"><g className="snowflake"><path d="M32 6v52M6 32h52M14 14l36 36M50 14 14 50" /><path d="m32 6-5 7m5-7 5 7M58 32l-7-5m7 5-7 5M32 58l-5-7m5 7 5-7M6 32l7-5m-7 5 7 5" /></g></svg>
}

function EventMotif({ event, startled, onStartle }) {
  if (event === 'halloween') return <button type="button" className={`event-motif halloween-motif ${startled ? 'is-startled' : ''}`} onClick={onStartle} aria-label="おばけをびっくりさせる"><svg viewBox="0 0 110 90"><path className="pumpkin" d="M16 77c-8-33 10-49 29-42 5-13 21-13 26 0 19-7 37 9 29 42-13 10-70 10-84 0Z" /><path className="pumpkin-lines" d="M36 34c-6 14-6 30 0 47m19-51c-3 17-3 35 0 53m19-49c7 15 7 31 1 47" /><path className="stem" d="M56 34c-2-9 2-14 11-15" /><path className="ghost" d="M75 12c12 0 18 10 17 30l-6-5-6 7-7-7-7 5c-1-19-2-30 9-30Z" /><circle className="ghost-eye" cx="76" cy="26" r="2" /><circle className="ghost-eye" cx="85" cy="26" r="2" /></svg></button>
  if (event === 'christmas') return <span className="event-motif christmas-motif" aria-hidden="true"><svg viewBox="0 0 150 98"><path className="holly-stem" d="M12 78C45 70 68 44 91 16" /><path className="holly-leaf" d="m24 72 9-18 11 8 8-15 8 14 13-4-3 15 17 5-19 6-4 16-11-13-11 10-3-15z" /><path className="holly-leaf" d="m77 29 8-17 10 10 11-12 4 16 17-2-9 14 14 10-19-1-5 15-9-14-14 5 5-15z" /><circle className="berry" cx="64" cy="61" r="5" /><circle className="berry" cx="76" cy="56" r="5" /><circle className="berry" cx="72" cy="69" r="5" /><path className="fine-ribbon" d="M12 20c25-13 32 13 55 5s34-28 66-11" /><path className="star" d="m126 55 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" /></svg></span>
  if (event === 'newyear') return <span className="event-motif newyear-motif" aria-hidden="true"><svg viewBox="0 0 150 98"><path className="plum-branch" d="M9 85C43 66 57 42 98 10M49 62l-14-16m31-20-11-16m26 15 16-4" /><g className="ume ume-red"><circle cx="36" cy="46" r="7" /><circle cx="44" cy="46" r="7" /><circle cx="40" cy="39" r="7" /><circle cx="40" cy="53" r="7" /><circle className="flower-center" cx="40" cy="46" r="3" /></g><g className="ume ume-white"><circle cx="67" cy="25" r="7" /><circle cx="75" cy="25" r="7" /><circle cx="71" cy="18" r="7" /><circle cx="71" cy="32" r="7" /><circle className="flower-center" cx="71" cy="25" r="3" /></g><path className="mizuhiki fine-mizuhiki" d="M94 72c11-20 28-18 29-3s15 18 22 1M94 82c14-11 27-2 25 7s16 9 26-2" /><path className="gold-dot" d="m111 15 3 6 6 3-6 3-3 6-3-6-6-3 6-3z" /></svg></span>
  if (event === 'aprilfools') return <span className="event-motif april-motif" aria-hidden="true"><span>うぇーーい</span><i>★</i></span>
  return null
}

function Ornament({ season, event }) {
  const [startled, setStartled] = useState(false)
  if (!season && !event) return null
  return <><aside className={`season-ornaments ornament-${season}`} aria-hidden="true">{placements.map((placement, index) => <i className="season-piece" style={{ '--x': placement.x, '--y': placement.y, '--size': `${placement.size}px`, '--delay': `${placement.delay}s`, '--speed': `${placement.speed}s` }} key={index}><Motif type={season} variant={index} /></i>)}</aside>{event && <aside className={`event-ornaments event-${event}`}><EventMotif event={event} startled={startled} onStartle={() => { setStartled(true); window.setTimeout(() => setStartled(false), 700) }} /></aside>}</>
}

export function SeasonEdition({ compact = false, className = '' }) {
  const { season, event } = useSeason()
  const info = event ? events[event] : season ? seasons[season] : null
  if (!info) return null
  return <p className={`season-edition ${compact ? 'is-compact' : ''} ${className}`}><span>{info.motif}</span><b>{info.label}</b>{!compact && <em>{info.message}</em>}</p>
}

export default function SeasonShell({ children }) {
  const [mode, setMode] = useState('auto')
  const [paused, setPaused] = useState(false)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 60000); return () => window.clearInterval(timer) }, [])
  const value = useMemo(() => ({ ...seasonalState(mode, now), paused }), [mode, now, paused])
  const info = value.event ? events[value.event] : value.season ? seasons[value.season] : null
  return <SeasonContext.Provider value={value}><div className={`season-shell ${value.season ? `season-${value.season}` : 'season-none'} ${value.event ? `event-${value.event}` : ''} ${paused ? 'season-paused' : ''}`} style={info ? { '--season-accent': info.accent || seasons[value.season]?.accent, '--season-soft': info.soft || seasons[value.season]?.soft } : undefined}><Ornament season={value.season} event={value.event} />{children}<button className="season-motion-toggle" type="button" onClick={() => setPaused((current) => !current)} aria-pressed={paused}>{paused ? '季節の動きを再開' : '季節の動きを止める'}</button>{import.meta.env.DEV && <aside className="season-preview" aria-label="季節プレビュー"><label>SEASON PREVIEW<select value={mode} onChange={(event) => setMode(event.target.value)}><option value="auto">自動判定</option><option value="spring">春</option><option value="summer">夏</option><option value="autumn">秋</option><option value="winter">冬</option><option value="newyear">お正月</option><option value="aprilfools">エイプリルフール</option><option value="halloween">ハロウィン</option><option value="christmas">クリスマス</option><option value="none">装飾なし</option></select></label></aside>}</div></SeasonContext.Provider>
}
