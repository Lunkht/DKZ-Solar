import { useState } from 'react'
import { faq } from '../data/products'
import Reveal from './Reveal'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq" id="faq">
      <div className="container">
        <Reveal className="section-head center">
          <div className="kicker">FAQ</div>
          <h2>Questions fréquentes</h2>
          <p>Tout ce que vous devez savoir avant de passer au solaire avec DKZ Solar.</p>
        </Reveal>

        <div className="faq-list">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={i % 4} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="plus">+</span>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}