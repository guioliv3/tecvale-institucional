import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { img } from '@/content/empreendimentos'

// `ratio` e `offset` criam o desalinhamento vertical do carrossel.
const items = [
  { file: 'ares-fachada.webp', alt: 'Perspectiva da fachada do Ares Aquarius ao entardecer', project: 'Ares Aquarius', status: 'Lançamento', ratio: '1/1', offset: 'md:mt-10' },
  { file: 'ares-hall.webp', alt: 'Hall de entrada do Ares Aquarius', project: 'Ares Aquarius', status: 'Lançamento', ratio: '3/4', offset: 'md:mt-0' },
  { file: 'ares-coworking.webp', alt: 'Espaço de coworking do Ares Aquarius', project: 'Ares Aquarius', status: 'Lançamento', ratio: '4/5', offset: 'md:mt-10' },
  { file: 'noah-fachada.webp', alt: 'Perspectiva da fachada e entrada do Noah Residence', project: 'Noah Residence', status: 'Em obras', groupStart: true, ratio: '1/1', offset: 'md:mt-4' },
  { file: 'noah-living.webp', alt: 'Perspectiva da sala de estar do Noah Residence', project: 'Noah Residence', status: 'Em obras', ratio: '3/4', offset: 'md:mt-0' },
  { file: 'noah-varanda.webp', alt: 'Perspectiva da varanda do apartamento no Noah Residence', project: 'Noah Residence', status: 'Em obras', ratio: '4/5', offset: 'md:mt-12' },
  { file: 'neori-fachada.webp', alt: 'Perspectiva da fachada do Neori Jardim Aquarius', project: 'Neori Jardim Aquarius', status: 'Em obras', groupStart: true, ratio: '1/1', offset: 'md:mt-2' },
  { file: 'neori-varanda.webp', alt: 'Perspectiva da varanda gourmet do Neori Jardim Aquarius', project: 'Neori Jardim Aquarius', status: 'Em obras', ratio: '3/4', offset: 'md:mt-0' },
  { file: 'neori-cozinha.webp', alt: 'Perspectiva da cozinha do Neori Jardim Aquarius', project: 'Neori Jardim Aquarius', status: 'Em obras', ratio: '4/5', offset: 'md:mt-10' },
]

export function GalleryCarousel() {
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null)
  const [thumb, setThumb] = useState({ width: 50, left: 0 })

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const width = Math.min(100, (el.clientWidth / el.scrollWidth) * 100)
      setThumb({ width, left: max > 0 ? (el.scrollLeft / max) * (100 - width) : 0 })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function dragCarousel(event: ReactPointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return
    event.currentTarget.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.x)
  }

  function endDrag() {
    drag.current = null
  }

  return (
    <section aria-label="Galeria de imagens" className="pb-20 md:pb-32">
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Galeria horizontal de imagens"
        onPointerDown={startDrag}
        onPointerMove={dragCarousel}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="frame-x flex touch-pan-y snap-x snap-mandatory cursor-grab select-none items-start gap-4 overflow-x-auto pb-2 [scrollbar-width:none] active:cursor-grabbing md:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <figure
            key={it.file}
            className={`relative w-[62vw] shrink-0 snap-start overflow-hidden bg-surface md:w-[calc((100vw-4rem-8rem)/5)] ${it.groupStart ? 'ml-5 md:ml-10' : ''} ${it.offset}`}
            style={{ aspectRatio: it.ratio }}
          >
            <img src={img(it.file)} alt={it.alt} draggable={false} loading="lazy" className="h-full w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent px-3 pb-3 pt-10 text-white md:px-4 md:pb-4">
              <span className="block text-xs leading-tight md:text-sm">{it.project}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mx-auto mt-12 h-px w-[min(70%,540px)] bg-ink/15" aria-hidden="true">
        <div className="relative h-px">
          <div className="absolute top-0 h-px bg-ink/70 transition-[left] duration-100" style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }} />
        </div>
      </div>
    </section>
  )
}
