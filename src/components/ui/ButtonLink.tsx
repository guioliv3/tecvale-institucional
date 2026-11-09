import { Link } from 'react-router'
import type { ReactNode } from 'react'

type Props = { to: string; children: ReactNode; variant?: 'solid' | 'light' | 'ghost'; className?: string }

const styles = {
  solid: 'bg-wine text-white hover:bg-wine-dark',
  light: 'bg-white text-ink hover:bg-surface',
  ghost: 'border border-wine text-wine hover:bg-wine hover:text-white',
}

export function ButtonLink({ to, children, variant = 'solid', className = '' }: Props) {
  const cls = `inline-flex h-[42px] items-center justify-center gap-4 px-4 text-[13px] transition-colors ${styles[variant]} ${className}`
  return /^https?:/.test(to) ? (
    <a href={to} className={cls} target="_blank" rel="noreferrer">{children}</a>
  ) : (
    <Link to={to} className={cls}>{children}</Link>
  )
}
