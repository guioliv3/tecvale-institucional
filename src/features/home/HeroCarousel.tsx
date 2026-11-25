import { useEffect, useState } from 'react'
import { projectHref, type Photo } from '@/content/empreendimentos'
import { ProvisionalTag } from '@/components/ui/ProvisionalTag'
import { sanityImageSrcSet, sanityImageUrl } from '@/components/ui/Photo'
import { TextLink } from '@/components/ui/TextLink'
import { useEmpreendimentos } from '@/features/empreendimentos/useEmpreendimentos'
import { orderHomeProjects } from './homeProjects'

const INTERVAL = 4000

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export function HeroCarousel({
  compact = false,
  title,
  description,
  cover,
}: {
  compact?: boolean
  title?: string
  description?: string
  cover?: Photo
}) {
  const { projects, loading } = useEmpreendimentos()
  const activeProjects = projects.filter((project) => project.status !== 'Entregue')
  const slides = orderHomeProjects(activeProjects).slice(0, 3)
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const reduced = usePrefersReducedMotion()
  const autoplay = !compact && !reduced && !hovering && slides.length > 1
  const activeIndex = slides.length ? active % slides.length : 0
  const current = slides[activeIndex]
  const imageSlides = compact
    ? cover ? [{ slug: 'catalogo', name: title ?? 'Empreendimentos', cover }] : slides.slice(0, 1)
    : slides

  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(t)
  }, [autoplay, active, slides.length])

  return (
    <section
      data-home-hero={!compact ? '' : undefined}
      aria-roledescription={compact ? undefined : 'carrossel'}
      aria-label={compact ? title ?? 'Empreendimentos' : 'Empreendimentos em destaque'}
      className="frame-x bg-page pb-0"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div className={`on-dark relative overflow-hidden bg-ink text-white ${compact ? 'h-[clamp(20rem,calc((100svh-6rem)/2),35rem)]' : 'h-[calc(100svh-5rem-1rem)] min-h-[560px] md:h-[calc(100svh-5rem-2rem)]'}`}>
        {imageSlides.map((s, i) => (
          <div
            key={s.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${imageSlides.length}: ${s.name}`}
            aria-hidden={i !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${i === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            {(!loading || compact) && <img src={sanityImageUrl(s.cover.src, 1600)} srcSet={sanityImageSrcSet(s.cover.src)} sizes="100vw" alt={s.cover.alt} className="h-full w-full object-cover brightness-[.72]" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : undefined} decoding="async" />}
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        {compact && <ProvisionalTag className="absolute left-4 top-4 md:left-6 md:top-6" />}

        <div className={`absolute inset-x-0 bottom-0 flex flex-col md:flex-row md:items-end md:justify-between ${compact ? 'gap-3 p-5 md:gap-5 md:p-8' : 'gap-3 p-4 md:gap-6 md:p-10'}`}>
          {/* Controles: acima do texto no celular, à direita no desktop */}
          {!compact && <div className="order-first flex items-center gap-4 md:order-last md:flex-col md:items-end md:gap-5">
            <ul className="flex flex-wrap gap-x-3 gap-y-0 md:flex-col md:items-end md:gap-2">
              {slides.map((s, i) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    aria-current={i === activeIndex}
                    onClick={() => setActive(i)}
                    className={`min-h-9 cursor-pointer border-b py-1 text-[10px] uppercase tracking-[0.12em] transition-opacity md:min-h-11 md:py-2 md:text-sm md:tracking-[0.16em] ${i === activeIndex ? 'border-white opacity-100' : 'border-transparent opacity-30 hover:opacity-70 focus-visible:opacity-100'}`}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>}

          <div className="max-w-md" aria-live={autoplay ? 'off' : 'polite'}>
            <h1 className="text-3xl md:text-6xl">{title ?? current?.name ?? 'Empreendimentos Tecvale'}</h1>
            <p className="mt-2 line-clamp-2 text-xs leading-snug text-white/90 md:mt-3 md:line-clamp-none md:text-base md:leading-relaxed">
              {description ?? current?.summary ?? 'Conheça os empreendimentos da Tecvale.'}
            </p>
            {!compact && current && (
              <div className="mt-3 md:mt-6">
                <TextLink to={projectHref(current)} variant="light">Conhecer o projeto</TextLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
