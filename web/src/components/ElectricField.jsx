import { useEffect, useRef } from 'react'

const TRAIL_MS = 650
const MAX_TRAIL = 240
const MAX_FIBERS = 60

function rand(a, b) {
  return a + Math.random() * (b - a)
}

function paletteFor(root) {
  const cs = getComputedStyle(root)
  const accent = cs.getPropertyValue('--accent').trim()
  const text = cs.getPropertyValue('--text').trim()
  return { accent: accent || '#eef800', text: text || '#80b918' }
}

function makeFiber(x, y, angle) {
  const len = rand(12, 38)
  const segs = 3 + ((Math.random() * 3) | 0)
  const pts = []
  let px = x
  let py = y
  for (let i = 0; i < segs; i++) {
    const t = (i + 1) / segs
    const bx = x + Math.cos(angle) * len * t
    const by = y + Math.sin(angle) * len * t
    const spread = (1 - t) * len * 0.45
    px = bx + rand(-spread, spread)
    py = by + rand(-spread, spread)
    pts.push([px, py])
  }
  return pts
}

export default function ElectricField({ className = '' }) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const trail = useRef([])
  const fibers = useRef([])
  const last = useRef({ x: null, y: null, t: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = hostRef.current
    if (!canvas || !wrap) return
    const host = wrap.parentElement || document.body
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    let palette = paletteFor(host)

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      w = r.width
      h = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const l = last.current
      const now = performance.now()
      if (l.x !== null) {
        const dx = x - l.x
        const dy = y - l.y
        const dist = Math.hypot(dx, dy)
        if (dist >= 2) {
          const steps = Math.max(1, Math.min(14, Math.round(dist / 6)))
          for (let i = 1; i <= steps; i++) {
            trail.current.push({
              x: l.x + (dx * i) / steps,
              y: l.y + (dy * i) / steps,
              born: now,
            })
          }
          if (trail.current.length > MAX_TRAIL) {
            trail.current.splice(0, trail.current.length - MAX_TRAIL)
          }
        }
      }
      l.x = x
      l.y = y
      l.t = now
    }

    const onReset = () => {
      last.current.x = null
      last.current.y = null
    }

    const themeObserver = new MutationObserver(() => {
      palette = paletteFor(host)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    host.addEventListener('mousemove', onMove)
    host.addEventListener('mouseleave', onReset)

    const tick = () => {
      const now = performance.now()
      ctx.clearRect(0, 0, w, h)

      const list = trail.current
      while (list.length && now - list[0].born > TRAIL_MS) list.shift()
      if (list.length && now - list[list.length - 1].born > TRAIL_MS) list.length = 0

      if (list.length >= 2) {
        const head = list[list.length - 1]
        const flick = 0.75 + Math.sin(now / 70) * 0.25

        // glow pass (aura)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = palette.accent
        ctx.globalAlpha = 0.22 * flick
        ctx.lineWidth = 7
        ctx.shadowColor = palette.accent
        ctx.shadowBlur = 22
        ctx.beginPath()
        ctx.moveTo(list[0].x, list[0].y)
        for (let i = 1; i < list.length; i++) ctx.lineTo(list[i].x, list[i].y)
        ctx.stroke()

        // core pass (filament), fading towards the tail
        for (let i = 1; i < list.length; i++) {
          const age = now - list[i].born
          const f = 1 - age / TRAIL_MS
          if (f <= 0.02) continue
          const a = 0.85 * Math.pow(f, 1.4) * flick
          ctx.strokeStyle = '#ffffff'
          ctx.globalAlpha = a
          ctx.lineWidth = Math.max(0.5, 2.6 * f)
          ctx.shadowColor = palette.accent
          ctx.shadowBlur = 8 * f * flick
          ctx.beginPath()
          ctx.moveTo(list[i - 1].x, list[i - 1].y)
          ctx.lineTo(list[i].x, list[i].y)
          ctx.stroke()
        }

        // head intensity
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = Math.min(1, flick)
        ctx.shadowColor = palette.accent
        ctx.shadowBlur = 18
        ctx.beginPath()
        ctx.arc(head.x, head.y, 3.2 * flick, 0, Math.PI * 2)
        ctx.fill()

        // occasional branches flying off the thread
        if (Math.random() < 0.3) {
          const idx = Math.max(1, (Math.random() * (list.length - 1)) | 0)
          const p = list[idx]
          const f = fibers.current
          if (f.length >= MAX_FIBERS) f.shift()
          f.push({
            pts: makeFiber(p.x, p.y, rand(-Math.PI, Math.PI)),
            born: now,
            angleGrad: rand(0.02, 0.06),
          })
        }
      }

      // fibers
      const fl = fibers.current
      for (let i = fl.length - 1; i >= 0; i--) {
        const g = fl[i]
        const age = now - g.born
        const t = age / 500
        if (t >= 1) {
          fl.splice(i, 1)
          continue
        }
        ctx.globalAlpha = (1 - t) * 0.55
        ctx.strokeStyle = palette.text
        ctx.lineWidth = 1.4 * (1 - t)
        ctx.shadowColor = palette.text
        ctx.shadowBlur = 10 * (1 - t)
        ctx.beginPath()
        ctx.moveTo(g.pts[0][0], g.pts[0][1])
        for (const [px, py] of g.pts) ctx.lineTo(px, py)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      host.removeEventListener('mousemove', onMove)
      host.removeEventListener('mouseleave', onReset)
      themeObserver.disconnect()
      trail.current = []
      fibers.current = []
    }
  }, [])

  return (
    <div ref={hostRef} className={`electric-field ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}