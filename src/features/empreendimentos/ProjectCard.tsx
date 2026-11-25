import { Link } from 'react-router'
import { Photo } from '@/components/ui/Photo'
import { TextLink } from '@/components/ui/TextLink'
import { projectHref, type Empreendimento } from '@/content/empreendimentos'

export function ProjectCard({ projeto: p }: { projeto: Empreendimento }) {
  const href = projectHref(p)
  const location = [p.neighborhood, p.city].filter(Boolean).join(' · ')

  return (
    <article className="min-w-0">
      <Link to={href} aria-label={`Conheça ${p.name}`} className="block focus-visible:outline-offset-4">
        <Photo
          photo={p.cover}
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          tag={false}
          className="aspect-[16/10] transition-opacity duration-300 hover:opacity-90 motion-reduce:transition-none"
        />
      </Link>

      <div className="pt-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-ink/15 pb-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-wine">{p.status}</p>
          {p.deliveryDate && <p className="text-xs text-muted">{p.deliveryDate}</p>}
        </div>
        <h3 className="mt-4 min-h-[2.5em] font-serif text-2xl leading-tight md:text-[28px]">
          <Link to={href} className="transition-colors hover:text-wine focus-visible:outline-offset-4">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">
          {location || 'Localização não informada na página oficial'}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>

        {(p.bedrooms || p.area) && (
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ink/15 pt-4">
            {p.bedrooms && (
              <div>
                <dt className="text-xs text-muted">Tipologia</dt>
                <dd className="mt-1 text-sm">{p.bedrooms}</dd>
              </div>
            )}
            {p.area && (
              <div>
                <dt className="text-xs text-muted">{p.areaLabel ?? 'Área privativa'}</dt>
                <dd className="mt-1 text-sm">{p.area}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-5">
          <TextLink to={href}>Ver empreendimento</TextLink>
        </div>
      </div>
    </article>
  )
}
