/** Esquema provisório de planta; substituir pela planta oficial. */
export function PlanDiagram() {
  return (
    <svg viewBox="0 0 200 140" role="img" aria-label="Esquema provisório de planta" className="h-full w-full text-ink/60">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="10" width="180" height="120" />
        <path d="M10 70h70M80 10v60M80 70v60M130 70h60M130 10v60M130 70v60" />
        <path d="M80 40h6M80 100h6M130 100h-6" strokeWidth="4" className="text-page" stroke="#e9e9e9" />
      </g>
    </svg>
  )
}
