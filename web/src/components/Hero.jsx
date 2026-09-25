import Reveal from './Reveal'
import ElectricField from './ElectricField'

export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <ElectricField />
      <div className="hero-content">
        <Reveal>
          <span className="hero-eyebrow">Énergie solaire · Guinée</span>
        </Reveal>
        <Reveal delay={1}>
          <h1>
            L’énergie du soleil, <span>au service de la Guinée.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p>
            Solar Green exporte et installe des panneaux solaires haute performance, onduleurs
            et batteries pour les particuliers, entreprises et collectivités — de Conakry
            aux zones les plus reculées.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="hero-actions">
            <a href="#catalogue" className="btn btn-primary">
              Découvrir le catalogue
            </a>
            <a href="#devis" className="btn btn-dark">
              Devis gratuit
            </a>
          </div>
        </Reveal>
        <div className="hero-scroll" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}