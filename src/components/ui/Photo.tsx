import type { Photo as PhotoData } from '@/content/empreendimentos'
import { ProvisionalTag } from './ProvisionalTag'

const imageWidths = [240, 320, 480, 640, 800, 1200, 1600, 2000]

export function sanityImageUrl(src: string, width: number) {
  if (!src.startsWith('https://cdn.sanity.io/images/')) return src
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('fit', 'max')
  url.searchParams.set('auto', 'format')
  return url.toString()
}

export function sanityImageSrcSet(src: string) {
  if (!src.startsWith('https://cdn.sanity.io/images/')) return undefined
  return imageWidths.map((width) => `${sanityImageUrl(src, width)} ${width}w`).join(', ')
}

/** Imagem com recorte fixo e etiqueta de provisório. */
export function Photo({ photo, className = '', imageClassName = '', tag = true, eager = false, sizes = '100vw' }: { photo: PhotoData; className?: string; imageClassName?: string; tag?: boolean; eager?: boolean; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <img src={sanityImageUrl(photo.src, 1200)} srcSet={sanityImageSrcSet(photo.src)} sizes={sizes} alt={photo.alt} draggable={false} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" className={`h-full w-full object-cover ${imageClassName}`} />
      {tag && <ProvisionalTag className="absolute left-3 top-3" />}
    </div>
  )
}
