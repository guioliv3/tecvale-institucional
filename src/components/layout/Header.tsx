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
          className="group relative z-50 flex h-11 w-11 cursor-pointer flex-col items-start justify-center gap-2 transition-colors hover:text-wine active:scale-95"
        >
          <span className={`h-px bg-ink transition-[width,transform,background-color] duration-200 ease-out group-hover:bg-wine ${open ? 'w-6 translate-y-[4px] rotate-45' : 'w-7'}`} />
          <span className={`h-px bg-ink transition-[width,transform,background-color] duration-200 ease-out group-hover:bg-wine ${open ? 'w-6 -translate-y-[4px] -rotate-45' : 'w-7'}`} />
        </button>
        <Link to="/" aria-label="Tecvale, página inicial" className="justify-self-center">
          <img src="/images/logo-tecvale-vermelho.svg" alt="Tecvale" className="w-32 md:w-40" />
        </Link>
        <div translate="no" aria-label="Idioma" className="flex min-h-11 items-center justify-self-end text-xs uppercase tracking-[0.12em]">
          <a href={`${pathname}${window.location.search}${window.location.hash}`} lang="pt-BR" aria-current={window.location.pathname.startsWith('/en') ? undefined : 'page'} className={window.location.pathname.startsWith('/en') ? 'text-muted hover:text-wine' : 'text-ink'}>PT</a>
          <span aria-hidden="true" className="mx-2 text-muted">|</span>
          <a href={`/en${pathname}${window.location.search}${window.location.hash}`} lang="en" aria-current={window.location.pathname.startsWith('/en') ? 'page' : undefined} className={window.location.pathname.startsWith('/en') ? 'text-ink' : 'text-muted hover:text-wine'}>EN</a>
        </div>
      </div>

      {open && (
        <nav id="menu-principal" aria-label="Principal" className="menu-enter fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-page pt-4">
          <ul className="frame-x mx-auto flex max-w-5xl flex-col gap-2 py-8">
            {nav.filter((item) => item.to !== '/contato#faq' && item.to !== '/politica-de-privacidade').map((item) => (
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
