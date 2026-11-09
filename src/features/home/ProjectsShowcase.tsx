import { useRef } from 'react'
import { empreendimentos, projectHref, type Empreendimento } from '@/content/empreendimentos'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Photo } from '@/components/ui/Photo'
import { TextLink } from '@/components/ui/TextLink'

type ProjectsShowcaseProps = {
  /** Lista recebida pela interface; por padrão, usa os mocks locais. */
  projects?: Empreendimento[]
}

function ArrowIcon({ direction }: { direction: 'previous' | 'next' }) {
  return direction === 'previous' ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M19 12H5m0 0 7-7m-7 7 7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M5 12h14m0 0-7-7m7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function ProjectsShowcase({ projects = empreendimentos }: ProjectsShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'previous' | 'next') => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector('article')
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    const distance = (card?.getBoundingClientRect().width ?? track.clientWidth * 0.72) + gap
    track.scrollBy({ left: direction === 'next' ? distance : -distance, behavior: 'smooth' })
  }

  if (!projects.length) return null

  return (
    <section role="region" aria-label="Empreendimentos" aria-roledescription="carrossel" className="mx-auto max-w-[1600px]">
      <div
        ref={trackRef}
        tabIndex={0}
        aria-label="Lista de empreendimentos; deslize horizontalmente para ver mais opções"
        className="frame-x flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine md:gap-8 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((project) => (
          <article key={project.slug} className="w-[86vw] max-w-[560px] shrink-0 snap-start md:w-[42vw] lg:w-[38vw]">
            <Photo photo={project.cover} tag={false} className="aspect-[3/2]" />
            <div className="pt-6 md:pt-7">
              <Eyebrow className="text-muted">{project.name}</Eyebrow>
              <h2 className="mt-3 max-w-[34ch] text-lg md:text-xl">{project.tagline}</h2>
              <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted">{project.summary}</p>

              <p className="mt-4 text-xs leading-relaxed text-muted">
                {project.neighborhood} · {project.city} <span aria-hidden="true">/</span> {project.status}
              </p>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/15 pt-4 text-xs">
                <div className="flex gap-1.5">
                  <dt className="text-muted">Unidades</dt>
                  <dd>{project.bedrooms}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-muted">Área</dt>
                  <dd>{project.area}</dd>
                </div>
              </dl>
              <div className="mt-5">
                <TextLink to={projectHref(project)}>Ver empreendimento</TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      {projects.length > 1 && (
        <div className="frame-x mt-3 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scroll('previous')}
            aria-label="Rolar para empreendimentos anteriores"
            className="grid h-11 w-11 place-items-center border border-ink/25 transition-colors hover:border-wine hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
          >
            <ArrowIcon direction="previous" />
          </button>
          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label="Rolar para próximos empreendimentos"
            className="grid h-11 w-11 place-items-center border border-ink/25 transition-colors hover:border-wine hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      )}
    </section>
  )
}
