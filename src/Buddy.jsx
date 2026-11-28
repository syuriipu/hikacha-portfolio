import { useEffect, useRef, useState } from 'react'
import { useSeason } from './SeasonShell'
import './Buddy.css'

// 葛城のちびキャラ（没ゲームの歩きアニメを流用）。スプライトは 8コマ×2段：
// 1段目＝左向き、2段目＝右向き / 0〜5コマ目＝歩き、6＝立ち、7＝まばたき
const SHEET = 'media/art/buddy-sprite.webp'
const RATIO = 165 / 260
const WALK_FRAMES = 6
const STAND = 6
const BLINK = 7

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function Sprite({ height, col, row, className = '', style, ...props }) {
  const width = Math.round(height * RATIO)
  return <span className={`buddy-sprite ${className}`} style={{ width, height, backgroundImage: `url(${SHEET})`, backgroundSize: `${width * 8}px ${height * 2}px`, backgroundPosition: `-${col * width}px -${row * height}px`, ...style }} {...props} />
}

// 立ったまま、ときどきまばたきする
export function StandingBuddy({ height = 150, facing = 'left' }) {
  const [blink, setBlink] = useState(false)
  const { paused } = useSeason()
  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined
    let timer
    const loop = () => { timer = window.setTimeout(() => { setBlink(true); timer = window.setTimeout(() => { setBlink(false); loop() }, 150) }, 2200 + Math.random() * 2600) }
    loop()
    return () => window.clearTimeout(timer)
  }, [paused])
  return <Sprite height={height} col={blink ? BLINK : STAND} row={facing === 'left' ? 0 : 1} className="buddy-standing" role="img" aria-label="葛城のちびキャラ" />
}

// フッターの上のふちを歩き回る。たまに立ち止まってまばたき。クリックすると少し立ち止まる。
export function StrollingBuddy() {
  const track = useRef(null)
  const state = useRef({ x: 40, dir: 1, frame: 0, restUntil: 0, nextBlink: 0, blinkUntil: 0 })
  const [view, setView] = useState({ x: 40, col: STAND, row: 1 })
  const [height, setHeight] = useState(72)
  const { paused } = useSeason()

  useEffect(() => {
    const update = () => setHeight(window.innerWidth < 640 ? 56 : 72)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const s = state.current
    const width = track.current?.offsetWidth || 600
    s.x = Math.random() * Math.max(0, width - 80)
    s.dir = Math.random() < 0.5 ? -1 : 1
  }, [])

  useEffect(() => {
    const s = state.current
    if (paused || prefersReducedMotion()) return undefined
    let last = performance.now()
    const tick = () => {
      const now = performance.now()
      const dt = Math.min(0.3, (now - last) / 1000)
      last = now
      const max = Math.max(0, (track.current?.offsetWidth || 600) - height * RATIO)
      if (now < s.restUntil) {
        if (now > s.nextBlink) { s.blinkUntil = now + 150; s.nextBlink = now + 1800 + Math.random() * 2000 }
        setView({ x: s.x, col: now < s.blinkUntil ? BLINK : STAND, row: s.dir < 0 ? 0 : 1 })
        return
      }
      s.frame = (s.frame + 1) % WALK_FRAMES
      s.x += s.dir * 34 * dt
      if (s.x <= 0) { s.x = 0; s.dir = 1 } else if (s.x >= max) { s.x = max; s.dir = -1 }
      if (Math.random() < 0.012) { s.restUntil = now + 1800 + Math.random() * 2600; s.nextBlink = now + 600 }
      setView({ x: s.x, col: s.frame, row: s.dir < 0 ? 0 : 1 })
    }
    const timer = window.setInterval(tick, 115)
    return () => window.clearInterval(timer)
  }, [paused, height])

  const rest = () => { const s = state.current; const now = performance.now(); s.restUntil = now + 2600; s.nextBlink = now + 80 }

  return <div className="buddy-track" ref={track} style={{ height }}>
    <button type="button" className="buddy-walker" onClick={rest} aria-label="歩いている葛城（押すと立ち止まります）" style={{ transform: `translateX(${Math.round(view.x)}px)` }}>
      <Sprite height={height} col={paused || prefersReducedMotion() ? STAND : view.col} row={view.row} />
    </button>
  </div>
}
