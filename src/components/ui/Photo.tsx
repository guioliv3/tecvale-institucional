import type { Photo as PhotoData } from '@/content/empreendimentos'
import { ProvisionalTag } from './ProvisionalTag'

/** Imagem com recorte fixo e etiqueta de provisório. */
export function Photo({ photo, className = '', imageClassName = '', tag = true, eager = false }: { photo: PhotoData; className?: string; imageClassName?: string; tag?: boolean; eager?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <img src={photo.src} alt={photo.alt} draggable={false} loading={eager ? 'eager' : 'lazy'} className={`h-full w-full object-cover ${imageClassName}`} />
      {tag && <ProvisionalTag className="absolute left-3 top-3" />}
    </div>
  )
}
