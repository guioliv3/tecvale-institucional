import { Link } from 'react-router'
import { nav, office } from '@/content/site'
import { empreendimentos } from '@/content/empreendimentos'
import { Brand } from './Header'

export function Footer() {
  return (
    <footer className="bg-wine text-white/80">
      <div className="frame-x mx-auto grid max-w-[1600px] gap-12 py-16 md:grid-cols-4">
        <div>
          <Brand className="text-white" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
            Construtora dedicada a projetos residenciais com qualidade, design e respeito ao tempo de cada família.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white">Empreendimentos</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {empreendimentos.map((e) => (
              <li key={e.slug}><Link className="hover:text-white" to={`/empreendimentos/${e.slug}`}>{e.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}><Link className="hover:text-white" to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white">Fale conosco</h2>
          <address className="mt-4 space-y-1 text-sm not-italic">
            <p>{office.address}</p>
            <p>{office.city}</p>
            <p>{office.email}</p>
            <p>{office.phone}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="frame-x mx-auto max-w-[1600px] py-6 text-xs text-white/80">
          © Tecvale. Site de demonstração: imagens, textos, números e contatos são provisórios.
        </p>
      </div>
    </footer>
  )
}
