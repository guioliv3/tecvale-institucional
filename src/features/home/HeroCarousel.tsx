import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { empreendimentos, projectHref } from '@/content/empreendimentos'
import { ProvisionalTag } from '@/components/ui/ProvisionalTag'

// Ordem do carrossel: Ares Aquarius primeiro, depois Neori Residence e Noah.
const order = ['ares-aquarius', 'neori-residence', 'noah']
const slides = order.flatMap((s) => empreendimentos.filter((e) => e.slug === s))
const INTERVAL = 7000

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

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const reduced = usePrefersReducedMotion()
  const autoplay = !reduced && !paused && !hovering

  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(t)
  }, [autoplay, active])

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Empreendimentos em destaque"
      className="frame-x bg-page pb-0"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div className="on-dark relative h-[calc(100svh-5rem-1rem)] min-h-[560px] overflow-hidden bg-ink text-white md:h-[calc(100svh-5rem-2rem)]">
        {slides.map((s, i) => (
          <div
            key={s.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}: ${s.name}`}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${i === active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <img src={s.cover.src} alt={s.cover.alt} className="h-full w-full object-cover brightness-[.72]" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <ProvisionalTag className="absolute left-4 top-4 md:left-6 md:top-6" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-5 md:flex-row md:items-end md:justify-between md:p-10">
          {/* Controles: acima do texto no celular, à direita no desktop */}
          <div className="order-first flex items-center gap-4 md:order-last md:flex-col md:items-end md:gap-5">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 md:flex-col md:items-end md:gap-2">
              {slides.map((s, i) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    aria-current={i === active}
                    onClick={() => setActive(i)}
                    className={`border-b pb-1 text-xs uppercase tracking-[0.16em] transition-opacity md:text-sm ${i === active ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Retomar avanço automático' : 'Pausar avanço automático'}
                className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center border border-white/60 hover:bg-white/15 md:ml-0"
              >
                {paused ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" /></svg>
                )}
              </button>
            )}
          </div>

          <div className="max-w-md" aria-live={autoplay ? 'off' : 'polite'}>
            <h1 className="text-4xl md:text-6xl">{slides[active].name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">{slides[active].summary}</p>
            <Link
              to={projectHref(slides[active])}
              className="mt-6 inline-flex h-[34px] items-center border border-white bg-black/15 px-3 text-[11px] text-white hover:bg-white/15"
            >
              Conhecer o projeto
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
