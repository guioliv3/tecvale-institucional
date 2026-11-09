import { Link } from 'react-router'
import type { Empreendimento } from '@/content/empreendimentos'
import { Photo } from '@/components/ui/Photo'

// Mesma ordem de dados em todos os cartões, para facilitar a comparação.
export function ProjectCard({ projeto: p }: { projeto: Empreendimento }) {
  const rows = [
    ['Bairro', p.neighborhood],
    ['Status', p.status],
    ['Dormitórios', p.bedrooms],
    ['Área privativa', p.area],
  ]
  return (
    <article className="group relative">
      <Photo photo={p.cover} className="aspect-[4/3]" />
      <h2 className="mt-5 text-3xl">
        <Link to={`/empreendimentos/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-wine">
          {p.name}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-muted">{p.summary}</p>
      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/15 pt-5 text-sm">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
            <dd className="mt-0.5">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
