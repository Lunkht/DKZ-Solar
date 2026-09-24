export default function Logo({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" role="img" aria-label="Solar Green">
      <rect className="lb-bg lb-border" width="64" height="64" rx="12" />
      <circle className="lb-disc" cx="32" cy="32" r="20.15" />
      <path className="lb-fg" d="M19 41.5h26M21.3 41.5l4.7-13M42.7 41.5l-4.7-13M27.3 28.4h9.5M30.8 28.4l3.6 13" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path className="lb-fg" d="M23.7 16.6v4.2M32 16.6v4.2M40.3 16.6v4.2" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}