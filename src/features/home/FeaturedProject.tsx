import { getEmpreendimento, projectHref } from '@/content/empreendimentos'
import { Photo } from '@/components/ui/Photo'
import { TextLink } from '@/components/ui/TextLink'

const featured = getEmpreendimento('ares-aquarius')!

export function FeaturedProject() {
  return (
    <section className="frame-x mx-auto max-w-[1600px] py-24 md:py-40">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-wine">Empreendimento Destaque</p>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="text-4xl md:text-7xl">{featured.name}</h2>
        <p className="max-w-sm text-muted">{featured.summary}</p>
      </div>
      <Photo photo={featured.cover} className="mt-10 aspect-[4/5] md:aspect-[21/9]" imageClassName="object-[31%_center]" />
      <div className="mt-8"><TextLink to={projectHref(featured)}>Conhecer o projeto</TextLink></div>
    </section>
  )
}
