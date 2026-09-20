import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <svg className="logo-badge" viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" rx="12" fill="#0a0a09" stroke="rgba(255,255,255,0.12)" />
                <path d="M12 46h40M20 46l6-18M42 46l-4-18M26 28h12M30 28l4 18" stroke="#EEF800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 10v6M32 10v6M44 10v6" stroke="#EEF800" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span>DKZ&nbsp;SOLAR</span>
            </Link>
            <p>
              Exportation et vente de solutions solaires en République de Guinée. Énergie
              propre pour tous, du particulier à l’industriel.
            </p>
          </div>

          <div>
            <h4>Navigation</h4>
            <div className="footer-col">
              <Link to="/">Accueil</Link>
              <a href="/#catalogue">Catalogue</a>
              <a href="/#solutions">Solutions</a>
              <a href="/#faq">FAQ</a>
            </div>
          </div>

          <div>
            <h4>Contact</h4>
            <div className="footer-col">
              <a href="tel:+224621000000">+224 621 00 00 00</a>
              <a href="mailto:contact@dkzsolar.com">contact@dkzsolar.com</a>
              <span>B52 Route du Niger, Kaloum<br />Conakry — Guinée</span>
            </div>
          </div>

          <div>
            <h4>Suivez-nous</h4>
            <div className="footer-col">
              <a href="#" rel="noreferrer" onClick={(e) => e.preventDefault()}>Facebook</a>
              <a href="#" rel="noreferrer" onClick={(e) => e.preventDefault()}>Instagram</a>
              <a href="#" rel="noreferrer" onClick={(e) => e.preventDefault()}>LinkedIn</a>
              <a href="#" rel="noreferrer" onClick={(e) => e.preventDefault()}>TikTok</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DKZ Solar S.A. — Tous droits réservés.</span>
          <span>Fait avec ⚡ en Guinée 🇬🇳</span>
        </div>
      </div>
    </footer>
  )
}