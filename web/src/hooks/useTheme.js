import { useState, useEffect, useCallback } from 'react'

const KEY = 'solargreen-theme'

function getInitialTheme() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null
  if (stored === 'light' || stored === 'dark') return stored
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(KEY, theme)
    } catch (e) {
      /* stockage indisponible */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return { theme, toggle, setTheme }
}