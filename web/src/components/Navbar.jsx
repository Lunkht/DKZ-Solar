import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useTheme from '../hooks/useTheme'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/#catalogue', label: 'Catalogue' },
  { to: '/#solutions', label: 'Solutions' },
  { to: '/#devis', label: 'Devis' },
  { to: '/#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <nav className={`nav ${scrolled || open ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo" aria-label="DKZ Solar — Accueil">
          <svg className="logo-badge" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="12" fill="#0a0a09" stroke="rgba(255,255,255,0.12)" />
            <path d="M12 46h40M20 46l6-18M42 46l-4-18M26 28h12M30 28l4 18" stroke="#EEF800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 10v6M32 10v6M44 10v6" stroke="#EEF800" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span>DKZ&nbsp;SOLAR</span>
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={(e) => {
                if (l.to.startsWith('/#')) {
                  e.preventDefault()
                  const id = l.to.split('#')[1]
                  const el = document.getElementById(id)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                  else window.location.hash = `#/${id}`
                }
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-links">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
            title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <a
            href="/#devis"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('devis')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn btn-primary nav-cta"
          >
            Demander un devis
          </a>
        </div>

        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.to}
            onClick={(e) => {
              setOpen(false)
              if (l.to.startsWith('/#')) {
                e.preventDefault()
                const id = l.to.split('#')[1]
                const el = document.getElementById(id)
                if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
              }
            }}
          >
            {l.label}
          </a>
        ))}
        <button className="theme-toggle theme-toggle-row" onClick={toggle}>
          {theme === 'dark' ? '☀️ Thème clair' : '🌙 Thème sombre'}
        </button>
        <a
          href="/#devis"
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            const el = document.getElementById('devis')
            if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
          }}
          className="btn btn-primary"
        >
          Demander un devis
        </a>
      </div>
    </nav>
  )
}