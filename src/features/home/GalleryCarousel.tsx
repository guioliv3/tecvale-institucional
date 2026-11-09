import { useEffect, useRef, useState } from 'react'
import { img } from '@/content/empreendimentos'
import { ProvisionalTag } from '@/components/ui/ProvisionalTag'

// Imagens ilustrativas provisórias. `ratio` e `offset` criam o desalinhamento vertical do carrossel.
const items = [
  { file: 'sala-4.jpg', alt: 'Quarto claro com janela (imagem ilustrativa)', ratio: '1/1', offset: 'md:mt-10' },
  { file: 'sala-1.jpg', alt: 'Sala com grande janela para a paisagem (imagem ilustrativa)', ratio: '3/4', offset: 'md:mt-0' },
  { file: 'concreto.jpg', alt: 'Detalhe de arquitetura em concreto (imagem ilustrativa)', ratio: '4/5', offset: 'md:mt-10' },
  { file: 'sala-2.jpg', alt: 'Sala de estar em tons neutros (imagem ilustrativa)', ratio: '1/1', offset: 'md:mt-4' },
  { file: 'fachada-1.jpg', alt: 'Casa cercada de vegetação (imagem ilustrativa)', ratio: '3/4', offset: 'md:mt-0' },
  { file: 'casa-2.jpg', alt: 'Casa com revestimento em pedra (imagem ilustrativa)', ratio: '4/5', offset: 'md:mt-12' },
  { file: 'sala-3.jpg', alt: 'Living integrado (imagem ilustrativa)', ratio: '1/1', offset: 'md:mt-2' },
  { file: 'casa-1.jpg', alt: 'Residência com varandas (imagem ilustrativa)', ratio: '3/4', offset: 'md:mt-0' },
]

export function GalleryCarousel() {
  const scroller = useRef<HTMLDivElement>(null)
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

  return (
    <section aria-label="Galeria de imagens" className="pb-20 md:pb-32">
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Galeria rolável; use as setas do teclado para navegar"
        className="frame-x flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <figure
            key={it.file}
            className={`relative w-[62vw] shrink-0 snap-start overflow-hidden bg-surface md:w-[calc((100vw-4rem-8rem)/5)] ${it.offset}`}
            style={{ aspectRatio: it.ratio }}
          >
            <img src={img(it.file)} alt={it.alt} loading="lazy" className="h-full w-full object-cover" />
            <ProvisionalTag className="absolute left-2 top-2 !text-[9px]">Provisória</ProvisionalTag>
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
