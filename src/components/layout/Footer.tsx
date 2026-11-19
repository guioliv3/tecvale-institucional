import { Link } from 'react-router'
import { nav, office, socialLinks } from '@/content/site'

export function Footer() {
  return (
    <footer className="bg-wine text-white">
      <div className="frame-x mx-auto max-w-[1600px]">
        <div className="grid gap-10 py-10 md:grid-cols-12 md:gap-8 md:py-12">
          <div className="md:col-span-3">
            <Link to="/" aria-label="Tecvale, página inicial" className="inline-block">
              <img src="/images/logo-tecvale-preto.svg" alt="Tecvale" className="w-36 brightness-0 invert md:w-40" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
              Construtora e incorporadora em São José dos Campos.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{office.address}<br />{office.city}</p>
          </div>

          <nav aria-label="Navegação do rodapé" className="md:col-span-2 md:col-start-5">
            <h3 className="text-[10px] uppercase tracking-[0.16em] text-white/65">Navegação</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link className="text-white/85 transition-colors hover:text-white" to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Redes sociais" className="md:col-span-2 md:col-start-7">
            <h3 className="text-[10px] uppercase tracking-[0.16em] text-white/65">Redes sociais</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a className="text-white/85 transition-colors hover:text-white" href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic md:col-span-3 md:col-start-10">
            <h3 className="text-[10px] uppercase tracking-[0.16em] text-white/65">Contato</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="text-white/85 transition-colors hover:text-white" href={`mailto:${office.email}`}>{office.email}</a></li>
              <li><a className="text-white/85 transition-colors hover:text-white" href={`tel:${office.phoneHref}`}>{office.phone}</a></li>
              <li><a className="text-white/85 transition-colors hover:text-white" href={office.whatsappHref} target="_blank" rel="noreferrer">WhatsApp {office.whatsapp}</a></li>
            </ul>
          </address>
        </div>

        <div className="flex justify-end pb-5">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex cursor-pointer items-center gap-2 text-xs text-white/75 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Voltar para o topo
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4">
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/25 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© Tecvale Construtora e Incorporadora.</p>
          <p>São José dos Campos · SP</p>
        </div>
      </div>
    </footer>
  )
}
