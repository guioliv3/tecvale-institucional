import { Link } from 'react-router'

export function TextLink({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="inline-block border-b border-ink/40 pb-1.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-wine hover:text-wine">
      {children}
    </Link>
  )
}
