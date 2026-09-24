export default function SolarScene({ variant = '550w', swatch = '#eef800', className = '' }) {
  const frame = { stroke: swatch, strokeWidth: 4, fill: 'rgba(255,255,255,0.03)', rx: 4 }

  const drawPanels = (n, w = 210) => {
    const rows = []
    for (let i = 0; i < n; i++) {
      const x = 120 - w / 2
      const y = 40 + i * 78
      const cx = 120 - w / 2
      const cy = 40 + i * 78
      rows.push(
        <g key={i} transform={`translate(${x},${y})`}>
          <rect width={w} height={66} {...frame} />
          <line x1={0} y1={33} x2={w} y2={33} stroke={swatch} strokeWidth="2" opacity="0.5" />
          <line x1={w / 3} y1={0} x2={w / 3} y2={66} stroke={swatch} strokeWidth="2" opacity="0.5" />
          <line x1={(2 * w) / 3} y1={0} x2={(2 * w) / 3} y2={66} stroke={swatch} strokeWidth="2" opacity="0.5" />
          <circle cx={cx} cy={cy} r="2.5" fill={swatch} />
        </g>,
      )
    }
    return rows
  }

  const sun = (
    <g>
      <circle cx="150" cy="50" r="16" fill={swatch} opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line
          key={a}
          x1={150 + 22 * Math.cos((a * Math.PI) / 180)}
          y1={50 + 22 * Math.sin((a * Math.PI) / 180)}
          x2={150 + 34 * Math.cos((a * Math.PI) / 180)}
          y2={50 + 34 * Math.sin((a * Math.PI) / 180)}
          stroke={swatch}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
    </g>
  )

  if (variant === '550w' || variant === '450w') {
    return (
      <svg className={`solar-scene ${className}`} viewBox="0 0 240 300" fill="none">
        {sun}
        {drawPanels(variant === '550w' ? 3 : 2, variant === '550w' ? 210 : 196)}
        <rect x="98" y="286" width="44" height="12" rx="3" fill={swatch} opacity="0.85" />
      </svg>
    )
  }

  if (variant === 'inverter') {
    return (
      <svg className={`solar-scene ${className}`} viewBox="0 0 240 300" fill="none">
        <rect x="60" y="40" width="120" height="200" rx="12" fill="rgba(255,255,255,0.03)" stroke={swatch} strokeWidth="4" />
        <text x="120" y="82" textAnchor="middle" fill={swatch} fontSize="15" fontWeight="bold">Solar Green S5</text>
        <rect x="86" y="104" width="68" height="30" rx="5" fill="#101010" stroke={swatch} strokeWidth="2" />
        <line x1="96" y1="119" x2="120" y2="119" stroke={swatch} strokeWidth="2" />
        <circle cx="133" cy="119" r="5" stroke={swatch} strokeWidth="2" />
        <line x1="80" y1="160" x2="160" y2="160" stroke={swatch} strokeWidth="2" opacity="0.5" />
        <line x1="80" y1="176" x2="160" y2="176" stroke={swatch} strokeWidth="2" opacity="0.5" />
        <line x1="80" y1="192" x2="160" y2="192" stroke={swatch} strokeWidth="2" opacity="0.5" />
        <circle cx="92" cy="160" r="4" fill={swatch} />
        <circle cx="92" cy="176" r="4" fill={swatch} opacity="0.7" />
        <circle cx="92" cy="192" r="4" fill={swatch} opacity="0.45" />
        <rect x="60" y="240" width="240" height="0" />
        <line x1="120" y1="244" x2="120" y2="286" stroke={swatch} strokeWidth="3" />
        <rect x="90" y="286" width="60" height="12" rx="3" fill={swatch} opacity="0.85" />
      </svg>
    )
  }

  if (variant === 'battery') {
    return (
      <svg className={`solar-scene ${className}`} viewBox="0 0 240 300" fill="none">
        <rect x="70" y="36" width="100" height="154" rx="12" fill="rgba(255,255,255,0.03)" stroke={swatch} strokeWidth="4" />
        <rect x="92" y="60" width="56" height="12" rx="4" fill={swatch} opacity="0.9" />
        <rect x="92" y="86" width="56" height="12" rx="4" fill={swatch} opacity="0.7" />
        <rect x="92" y="112" width="56" height="12" rx="4" fill={swatch} opacity="0.5" />
        <rect x="92" y="138" width="56" height="12" rx="4" fill={swatch} opacity="0.33" />
        <line x1="92" y1="190" x2="148" y2="190" stroke={swatch} strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
        <rect x="70" y="206" width="100" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke={swatch} strokeWidth="3" />
        <text x="120" y="232" textAnchor="middle" fill={swatch} fontSize="13" fontWeight="bold">51.2V · 200Ah</text>
        <line x1="120" y1="246" x2="120" y2="286" stroke={swatch} strokeWidth="3" />
        <rect x="90" y="286" width="60" height="12" rx="3" fill={swatch} opacity="0.85" />
      </svg>
    )
  }

  if (variant === 'pump') {
    return (
      <svg className={`solar-scene ${className}`} viewBox="0 0 240 300" fill="none">
        {sun}
        {drawPanels(2, 84)}
        <line x1="120" y1="196" x2="120" y2="236" stroke={swatch} strokeWidth="3" />
        <rect x="84" y="232" width="72" height="46" rx="8" fill="rgba(255,255,255,0.03)" stroke={swatch} strokeWidth="3" />
        <text x="120" y="243" textAnchor="middle" fill={swatch} fontSize="9" fontWeight="bold">MOTEUR</text>
        <path d="M84 278 h-6 M162 278 h6 M78 288 h-6 M168 288 h6" stroke={swatch} strokeWidth="2" opacity="0.6" />
        <path d="M78 278 q0 20 42 20 q42 0 42 -20" stroke={swatch} strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="3 4" />
        <circle cx="120" cy="198" r="4" fill={swatch} />
      </svg>
    )
  }

  // kit
  return (
    <svg className={`solar-scene ${className}`} viewBox="0 0 240 300" fill="none">
      {sun}
      {drawPanels(2, 150)}
      <line x1="75" y1="138" x2="75" y2="200" stroke={swatch} strokeWidth="2" opacity="0.7" />
      <line x1="165" y1="138" x2="165" y2="200" stroke={swatch} strokeWidth="2" opacity="0.7" />
      <rect x="52" y="196" width="46" height="34" rx="5" fill="rgba(255,255,255,0.03)" stroke={swatch} strokeWidth="3" />
      <rect x="142" y="196" width="46" height="70" rx="5" fill="rgba(255,255,255,0.03)" stroke={swatch} strokeWidth="3" />
      <rect x="152" y="208" width="26" height="7" rx="2" fill={swatch} opacity="0.9" />
      <rect x="152" y="222" width="26" height="7" rx="2" fill={swatch} opacity="0.7" />
      <line x1="98" y1="240" x2="142" y2="240" stroke={swatch} strokeWidth="2" opacity="0.7" />
      <path d="M106 238 L102 232 L102 248 L106 242 M134 242 L138 248 L138 232 L134 238" stroke={swatch} strokeWidth="2" fill="none" />
      <rect x="106" y="266" width="28" height="20" rx="4" fill="rgba(255,255,255,0.03)" stroke={swatch} strokeWidth="2" />
      <line x1="120" y1="286" x2="120" y2="286" />
      <rect x="90" y="286" width="60" height="12" rx="3" fill={swatch} opacity="0.85" />
    </svg>
  )
}