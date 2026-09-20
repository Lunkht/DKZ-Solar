import Reveal from './Reveal'

export default function CtaBand() {
  return (
    <section className="cta-band">
      <Reveal>
        <h2>Passez au solaire dès aujourd’hui.</h2>
      </Reveal>
      <Reveal delay={1}>
        <p>
          Réduisez vos factures, sécurisez votre électricité et participez à l’électrification
          de la Guinée. Notre équipe répond à vos questions en moins de 24 heures.
        </p>
      </Reveal>
      <Reveal delay={2}>
        <div className="hero-actions">
          <a href="#devis" className="btn btn-primary">Demander un devis</a>
          <a href="tel:+224621000000" className="btn btn-outline">Appeler maintenant</a>
        </div>
      </Reveal>
    </section>
  )
}