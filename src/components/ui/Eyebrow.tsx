export function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return <p className={`text-[11px] uppercase tracking-[0.16em] text-wine ${className}`}>{children}</p>
}
