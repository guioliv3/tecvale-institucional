import { useRef, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { portfolioEmpreendimentos, projectHref, type Empreendimento } from '@/content/empreendimentos'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ImageHoverLink } from '@/components/ui/ImageHoverLink'
import { Photo } from '@/components/ui/Photo'
import { TextLink } from '@/components/ui/TextLink'

const recentProjectSlugs = [
  'ares-aquarius',
  'neori-residence',
  'noah',
  'believe-residence',
  'green-life-villa-branca',
  'antonio-de-vimioso',
]

const recentProjects = recentProjectSlugs
  .map((slug) => portfolioEmpreendimentos.find((project) => project.slug === slug))
  .filter((project): project is Empreendimento => project !== undefined)

type ProjectsShowcaseProps = {
  /** Lista recebida pela interface; por padrão, mostra os seis projetos recentes. */
  projects?: Empreendimento[]
}

export function ProjectsShowcase({ projects = recentProjects }: ProjectsShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; x: number; scrollLeft: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    }
    event.currentTarget.style.scrollSnapType = 'none'
  }

  function dragCarousel(event: ReactPointerEvent<HTMLDivElement>) {
    const activeDrag = drag.current
    if (activeDrag?.pointerId !== event.pointerId) return

    const distance = event.clientX - activeDrag.x
    if (!activeDrag.moved && Math.abs(distance) > 5) {
      activeDrag.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (activeDrag.moved) {
      event.currentTarget.scrollLeft = activeDrag.scrollLeft - distance
    }
  }

  function endDrag() {
    suppressClick.current = drag.current?.moved ?? false
    drag.current = null
    requestAnimationFrame(() => {
      if (trackRef.current && !drag.current) trackRef.current.style.scrollSnapType = ''
    })
  }

  function preventClickAfterDrag(event: ReactMouseEvent<HTMLDivElement>) {
    if (!suppressClick.current) return
    event.preventDefault()
    event.stopPropagation()
    suppressClick.current = false
  }

  if (!projects.length) return null

  return (
    <section role="region" aria-label="Empreendimentos" aria-roledescription="carrossel" className="pb-20 md:pb-32">
      <div className="frame-x grid gap-5 pb-8 md:grid-cols-12 md:items-end md:gap-12 md:pb-10">
        <div className="md:col-span-8">
          <Eyebrow>Portfólio</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">Empreendimentos Tecvale</h2>
        </div>
        <div className="flex flex-col items-start gap-5 md:col-span-4">
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
            <TextLink to="/empreendimentos">Ver empreendimentos</TextLink>
            <p className="inline-flex items-center gap-2 text-xs text-muted">
              <span className="md:hidden">Deslize para a direita para ver mais</span>
              <span className="hidden md:inline">Clique e arraste para ver mais</span>
              <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-wine" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </p>
          </div>
        </div>
      </div>

      <div className="frame-x">
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Empreendimentos; arraste para ver os próximos projetos"
          onPointerDown={startDrag}
          onPointerMove={dragCarousel}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={preventClickAfterDrag}
          className="flex touch-pan-y snap-x snap-mandatory cursor-grab select-none gap-6 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine active:cursor-grabbing md:gap-8 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((project) => (
            <article key={project.slug} className="w-[86vw] max-w-[560px] shrink-0 snap-start md:w-[min(42vw,500px)]">
              <ImageHoverLink to={projectHref(project)} label="Ver mais">
                <Photo photo={project.cover} tag={false} className="h-[320px] md:h-[380px] lg:h-[450px]" imageClassName={project.slug === 'ares-aquarius' ? 'object-[31%_center]' : ''} />
              </ImageHoverLink>
              <div className="pt-6 md:pt-7">
                <Eyebrow className="line-clamp-1 min-h-[1.5em] text-muted">{project.name}</Eyebrow>
                <h3 className="mt-2 line-clamp-2 min-h-[2.5em] max-w-[34ch] text-lg leading-tight md:text-xl">{project.tagline}</h3>
                <p className="mt-2 line-clamp-2 min-h-[3.25em] max-w-[58ch] text-sm leading-relaxed text-muted">{project.summary}</p>

                <div className="mt-3 flex min-h-6 flex-nowrap items-center gap-3">
                  <span className="inline-flex min-h-6 items-center bg-wine px-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                    {project.status}
                  </span>
                  <p className="min-w-0 flex-1 truncate text-xs leading-relaxed text-muted">
                    {[project.neighborhood, project.city].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <dl className="mt-3 flex min-h-10 flex-wrap content-start gap-x-6 gap-y-2 border-t border-ink/15 pt-3 text-xs">
                  {project.bedrooms && (
                    <div className="flex gap-1.5">
                      <dt className="text-muted">Tipologia</dt>
                      <dd>{project.bedrooms}</dd>
                    </div>
                  )}
                  {project.area && (
                    <div className="flex gap-1.5">
                      <dt className="text-muted">{project.areaLabel ?? 'Área'}</dt>
                      <dd>{project.area}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-4">
                  <TextLink to={projectHref(project)}>Ver empreendimento</TextLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
