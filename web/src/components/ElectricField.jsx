import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 400

function rand(a, b) {
  return a + Math.random() * (b - a)
}

function paletteFor(root) {
  const cs = getComputedStyle(root)
  const accent = cs.getPropertyValue('--accent').trim()
  const text = cs.getPropertyValue('--text').trim()
  return [accent, accent, text, '#ffffff'].filter(Boolean)
}

function makeBolt(x, y, angle) {
  const len = rand(18, 52)
  const segs = 5 + ((Math.random() * 5) | 0)
  const pts = []
  let px = x
  let py = y
  for (let i = 0; i < segs; i++) {
    const t = (i + 1) / segs
    const bx = x + Math.cos(angle) * len * t
    const by = y + Math.sin(angle) * len * t
    const spread = (1 - t) * len * 0.4
    px = bx + rand(-spread, spread)
    py = by + rand(-spread, spread)
    pts.push([px, py])
  }
  return pts
}

export default function ElectricField({ className = '' }) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const parts = useRef([])
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

    const spawn = (x, y, vx, vy) => {
      const list = parts.current
      const speed = Math.hypot(vx, vy)
      const count = Math.max(1, Math.min(5, Math.round(speed / 30)))
      for (let i = 0; i < count; i++) {
        if (list.length >= MAX_PARTICLES) list.shift()
        const angle = Math.atan2(vy, vx) + rand(-0.9, 0.9)
        const v = rand(1.4, 4.6)
        list.push({
          kind: 'spark',
          x,
          y,
          px: x - vx,
          py: y - vy,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 1,
          decay: rand(0.03, 0.07),
          size: rand(0.7, 2.6),
          color: palette[(Math.random() * palette.length) | 0],
          glow: rand(5, 12),
        })
      }
      if (speed > 26 && Math.random() < 0.25) {
        if (list.length >= MAX_PARTICLES) list.shift()
        list.push({
          kind: 'bolt',
          pts: makeBolt(x, y, Math.atan2(vy, vx)),
          x,
          y,
          life: 1,
          decay: 0.18,
          width: rand(1.2, 2.2),
          color: palette[(Math.random() * palette.length) | 0],
          glow: 10,
        })
      }
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const l = last.current
      const now = performance.now()
      const dt = Math.min(now - l.t, 50)
      if (l.x !== null && dt > 0) {
        const dx = x - l.x
        const dy = y - l.y
        const dist = Math.hypot(dx, dy)
        if (Math.abs(dx) + Math.abs(dy) >= 1) {
          const steps = Math.max(1, Math.min(12, Math.round(dist / 7)))
          for (let i = 0; i < steps; i++) {
            spawn(
              l.x + (dx * (i + 1)) / steps,
              l.y + (dy * (i + 1)) / steps,
              dx / steps,
              dy / steps,
            )
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
      ctx.clearRect(0, 0, w, h)
      const list = parts.current
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i]
        p.life -= p.decay
        if (p.life <= 0) {
          list.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.min(1, p.life * 2.2)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        if (p.kind === 'spark') {
          p.px = p.x
          p.py = p.y
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.96
          p.vy *= 0.96
          if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
            list.splice(i, 1)
            continue
          }
          ctx.strokeStyle = p.color
          ctx.lineWidth = p.size
          ctx.shadowColor = p.color
          ctx.shadowBlur = p.glow
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
          ctx.fillStyle = '#ffffff'
          ctx.shadowBlur = p.glow * 0.6
          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(0.3, p.size * 0.35), 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.strokeStyle = p.color
          ctx.lineWidth = p.width
          ctx.shadowColor = p.color
          ctx.shadowBlur = p.glow
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          for (const [px, py] of p.pts) ctx.lineTo(px, py)
          ctx.stroke()
        }
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
      parts.current = []
    }
  }, [])

  return (
    <div ref={hostRef} className={`electric-field ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}