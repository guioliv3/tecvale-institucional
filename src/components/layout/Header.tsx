import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { nav } from '@/content/site'

export function Brand({ className = '' }: { className?: string }) {
  // Marca tipográfica provisória até o logotipo oficial.
  return <span className={`font-serif text-2xl font-normal tracking-[0.28em] ${className}`}>TECVALE</span>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-page">
      <div className="frame-x grid h-20 grid-cols-3 items-center">
        <button
          ref={btn}
          type="button"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-start justify-center gap-2"
        >
          <span className={`h-px bg-ink transition-all ${open ? 'w-6 translate-y-[4px] rotate-45' : 'w-7'}`} />
          <span className={`h-px bg-ink transition-all ${open ? 'w-6 -translate-y-[4px] -rotate-45' : 'w-7'}`} />
        </button>
        <Link to="/" aria-label="Tecvale, página inicial" className="justify-self-center">
          <img src="/images/logo-tecvale-preto.svg" alt="Tecvale" className="w-32 md:w-40" />
        </Link>
        <button
          type="button"
          aria-label="Idioma: português e inglês"
          className="justify-self-end text-xs uppercase tracking-[0.12em]"
        >
          <span className="text-ink">PT</span>
          <span aria-hidden="true" className="mx-2 text-muted">|</span>
          <span className="text-muted">ENG</span>
        </button>
      </div>

      {open && (
        <nav id="menu-principal" aria-label="Principal" className="fixed inset-0 z-40 overflow-y-auto bg-page pt-24">
          <ul className="frame-x mx-auto flex max-w-5xl flex-col gap-2 py-8">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block py-2 font-serif text-4xl font-normal transition-colors hover:text-wine md:text-6xl ${isActive ? 'text-wine' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
