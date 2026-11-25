import { useEffect, useRef, useState } from 'react'
import type { Photo as ProjectPhoto } from '@/content/empreendimentos'
import { Photo, sanityImageUrl } from '@/components/ui/Photo'

function ArrowIcon({ previous = false }: { previous?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-5 ${previous ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  )
}

function GalleryArrow({ previous = false, onClick, light = false }: {
  previous?: boolean
  onClick: () => void
  light?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={previous ? 'Foto anterior' : 'Próxima foto'}
      className={`absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:size-12 ${previous ? 'left-3 md:left-4' : 'right-3 md:right-4'} ${light ? 'border-white/50 bg-ink/75 text-white hover:bg-white hover:text-ink focus-visible:outline-white' : 'border-ink/10 bg-page/95 text-ink hover:bg-wine hover:text-white focus-visible:outline-wine'}`}
    >
      <ArrowIcon previous={previous} />
    </button>
  )
}

function ImageLightbox({ photos, initialIndex, label, onClose }: {
  photos: ProjectPhoto[]
  initialIndex: number
  label: string
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const move = (step: number) => setIndex((current) => (current + step + photos.length) % photos.length)
  const photo = photos[index]

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${label}: foto ${index + 1} de ${photos.length}`}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      }}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }}
      className="m-auto h-dvh max-h-none w-screen max-w-none bg-ink p-4 text-white backdrop:bg-black/85 md:p-8"
    >
      <div className="mx-auto flex h-full max-w-[1600px] flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.14em] text-white/70" aria-live="polite">{label} · {index + 1} / {photos.length}</p>
          <button type="button" autoFocus onClick={() => dialogRef.current?.close()} aria-label="Fechar imagem ampliada" className="flex size-11 items-center justify-center border border-white/40 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg>
          </button>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
          <img key={photo.src} src={sanityImageUrl(photo.src, 2000)} alt={photo.alt || `Foto ${index + 1} de ${label.toLowerCase()}`} decoding="async" className="min-h-0 min-w-0 max-h-full max-w-full object-contain" />
          {photos.length > 1 && <>
            <GalleryArrow previous onClick={() => move(-1)} light />
            <GalleryArrow onClick={() => move(1)} light />
          </>}
        </div>
      </div>
    </dialog>
  )
}

export function ProjectImageGallery({ photos, variant, illustrative = false }: {
  photos: ProjectPhoto[]
  variant: 'architectural' | 'features'
  illustrative?: boolean
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  if (!photos.length) return null

  const selected = selectedIndex % photos.length
  const label = variant === 'architectural' ? 'Galeria arquitetônica' : 'Fotos dos diferenciais'
  const previews = [1, 2].filter((offset) => offset < photos.length).map((offset) => (selected + offset) % photos.length)
  const move = (step: number) => setSelectedIndex((current) => (current + step + photos.length) % photos.length)

  return (
    <div className="min-w-0">
      {variant === 'architectural' ? (
        <div className="grid grid-cols-2 gap-2 md:h-[22rem] md:grid-cols-3 md:grid-rows-2 xl:h-[26rem]">
          <div className={`relative min-w-0 ${previews.length ? 'col-span-2' : 'col-span-2 md:col-span-3'} aspect-[16/10] md:row-span-2 md:aspect-auto`}>
            <button type="button" onClick={() => setLightboxIndex(selected)} aria-label={`Ampliar foto ${selected + 1} de ${photos.length}`} className="group block h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine">
              <Photo photo={photos[selected]} sizes="(min-width: 768px) 65vw, 100vw" tag={illustrative} className="h-full w-full transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none" />
            </button>
            {photos.length > 1 && <>
              <GalleryArrow previous onClick={() => move(-1)} />
              <GalleryArrow onClick={() => move(1)} />
            </>}
          </div>
          {previews.map((index) => (
            <button key={index} type="button" onClick={() => setSelectedIndex(index)} aria-label={`Mostrar foto ${index + 1} no quadro grande`} className={`block min-w-0 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${previews.length === 1 ? 'col-span-2 md:col-span-1 md:row-span-2' : 'aspect-[4/3] md:aspect-auto'}`}>
              <Photo photo={photos[index]} sizes="(min-width: 768px) 33vw, 50vw" tag={illustrative} className="h-full w-full transition-opacity hover:opacity-80" />
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="relative">
            <button type="button" onClick={() => setLightboxIndex(selected)} aria-label={`Ampliar foto ${selected + 1} de ${photos.length}`} className="group block w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine">
              <Photo photo={photos[selected]} sizes="(min-width: 768px) 50vw, 100vw" tag={illustrative} className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none" />
            </button>
            {photos.length > 1 && <>
              <GalleryArrow previous onClick={() => move(-1)} />
              <GalleryArrow onClick={() => move(1)} />
            </>}
          </div>
          {photos.length > 1 && (
            <div className="mt-2 flex gap-2 overflow-x-auto pb-2" aria-label="Selecionar foto dos diferenciais">
              {photos.map((photo, index) => (
                <button key={`${photo.src}-${index}`} type="button" aria-label={`Mostrar foto ${index + 1} dos diferenciais`} aria-pressed={index === selected} onClick={() => setSelectedIndex(index)} className={`h-20 w-24 shrink-0 overflow-hidden border-2 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${index === selected ? 'border-wine' : 'border-transparent opacity-65 hover:opacity-100'}`}>
                  <Photo photo={photo} sizes="96px" tag={false} className="h-full w-full" />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-3">
        <p className="text-xs text-muted" aria-live="polite">Foto {selected + 1} de {photos.length}</p>
      </div>

      {lightboxIndex !== null && <ImageLightbox photos={photos} initialIndex={lightboxIndex} label={label} onClose={() => setLightboxIndex(null)} />}
    </div>
  )
}
