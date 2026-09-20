import { stats } from '../data/products'
import Reveal from './Reveal'

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i} className="stat">
              <div className="value">{s.value}</div>
              <div className="label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}