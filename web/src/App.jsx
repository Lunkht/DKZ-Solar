import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useCallback, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Stats from './components/Stats'
import Catalog from './components/Catalog'
import Rows from './components/Rows'
import QuoteForm from './components/QuoteForm'
import Faq from './components/Faq'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const [toastMsg, setToastMsg] = useState('')
  const timer = useRef(null)
  const toast = useCallback((msg) => {
    setToastMsg(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToastMsg(''), 5000)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Ticker />
              <Stats />
              <Catalog />
              <Rows />
              <QuoteForm toast={toast} />
              <Faq />
              <CtaBand />
            </main>
          }
        />
        <Route path="/produit/:id" element={<ProductDetail toast={toast} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />

      <div className={`toast ${toastMsg ? 'show' : ''}`} role="status">
        {toastMsg}
      </div>
    </>
  )
}