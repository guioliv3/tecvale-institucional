import { Link } from 'react-router'
import { nav, office, socialLinks } from '@/content/site'

function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4 shrink-0"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>
  }
  if (name === 'Facebook') {
    return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.2v3h2.8v8h3.5Z" /></svg>
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="size-4 shrink-0"><rect x="3" y="5.5" width="18" height="13" rx="4" /><path d="m10 9 5 3.1-5 3.1z" fill="currentColor" stroke="none" /></svg>
}

function ContactIcon({ type }: { type: 'email' | 'phone' | 'whatsapp' }) {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="M7 3.5h3l1.4 4-2 1.4a14 14 0 0 0 5.7 5.7l1.4-2 4 1.4v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 5 5.5a2 2 0 0 1 2-2Z" />,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.2-.5.4-.5.7-.5h.5l.8 1.9-.8.9a6 6 0 0 0 2.8 2.7l.8-.9 1.9.9v.5c0 .4-.3.7-.7.9-1 .4-2.6-.2-4.2-1.4-1.4-1.1-2.2-2.5-2.2-3.5 0-.6.2-1.1.4-1.5Z" /></>,
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-wine">{paths[type]}</svg>
}

export function Footer() {
  return (
    <footer className="bg-page text-ink">
      <div className="frame-x mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1600px] flex-col">
        <div className="grid flex-1 justify-items-center gap-8 py-8 text-center md:justify-items-start md:text-left md:py-10 xl:grid-cols-12 xl:gap-8">
          <div className="flex flex-col items-center md:items-start xl:col-span-3">
            <Link to="/" aria-label="Tecvale, página inicial" className="inline-block">
              <img src="/images/logo-tecvale-vermelho.svg" alt="Tecvale" className="w-36 md:w-40" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/80">
              Construtora e incorporadora em São José dos Campos.
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">Razão social: Tecvale Construtora e Incorporadora Ltda.</p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">CNPJ: 15.479.721/0001-01</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{office.address}<br />{office.city}</p>
          </div>

          <nav aria-label="Navegação do rodapé" className="flex flex-col items-center md:items-start xl:col-span-2 xl:col-start-5">
            <h3 className="text-[10px] uppercase tracking-[0.16em] text-muted">Navegação</h3>
            <ul className="mt-4 flex flex-col items-center space-y-2.5 text-sm md:items-start">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link className="inline-flex min-h-11 items-center text-ink/80 transition-colors hover:text-wine" to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Redes sociais" className="flex flex-col items-center md:items-start xl:col-span-2 xl:col-start-7">
            <h3 className="text-[10px] uppercase tracking-[0.16em] text-muted">Redes sociais</h3>
            <ul className="mt-4 flex flex-col items-center space-y-2.5 text-sm md:items-start">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a className="inline-flex min-h-11 items-center gap-2.5 text-ink/80 transition-colors hover:text-wine" href={social.href} target="_blank" rel="noreferrer">
                    <SocialIcon name={social.label} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="flex flex-col items-center not-italic md:items-start xl:col-span-3 xl:col-start-10">
            <h3 className="text-[10px] uppercase tracking-[0.16em] text-muted">Contato</h3>
            <ul className="mt-4 flex flex-col items-center space-y-2.5 text-sm md:items-start">
              <li><a className="inline-flex min-h-11 min-w-0 items-center gap-2.5 text-ink/80 transition-colors hover:text-wine" href={`mailto:${office.email}`}><ContactIcon type="email" />{office.email}</a></li>
              <li><a className="inline-flex min-h-11 items-center gap-2.5 text-ink/80 transition-colors hover:text-wine" href={`tel:${office.phoneHref}`}><ContactIcon type="phone" />{office.phone}</a></li>
              <li><a className="inline-flex min-h-11 items-center gap-2.5 text-ink/80 transition-colors hover:text-wine" href={office.whatsappHref} target="_blank" rel="noreferrer"><ContactIcon type="whatsapp" />WhatsApp {office.whatsapp}</a></li>
            </ul>
          </address>
        </div>

        <div className="flex justify-center pb-4 md:justify-end">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 px-2 text-xs text-muted transition-colors hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
          >
            Voltar para o topo
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4">
              <path d="M8 13V3M4 7l4-4 4 4" />
            </svg>
          </button>
        </div>

        <div className="grid justify-items-center gap-4 border-t border-ink/15 py-4 text-center text-xs text-muted md:grid-cols-[1fr_auto_1fr] md:items-center md:justify-items-stretch md:text-left">
          <div>
            <p>© Tecvale Construtora e Incorporadora.</p>
            <p className="mt-1">São José dos Campos · SP</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-sm text-ink/80">“Tudo posso naquele que me fortalece.”</p>
            <p className="mt-1">Filipenses 4:13</p>
          </div>
          <a className="inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-wine md:justify-self-end" href="https://wa.me/5512988534827" target="_blank" rel="noreferrer">
            <ContactIcon type="whatsapp" /> Desenvolvido por G.O.
          </a>
        </div>
      </div>
    </footer>
  )
}
