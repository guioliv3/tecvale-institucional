import { getEmpreendimento, projectHref } from '@/content/empreendimentos'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Photo } from '@/components/ui/Photo'

const featured = getEmpreendimento('neori-residence')!

export function FeaturedProject() {
  return (
    <section className="frame-x mx-auto max-w-[1600px] py-24 md:py-40">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-wine">Empreendimento</p>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="text-4xl md:text-7xl">{featured.name}</h2>
        <p className="max-w-sm text-muted">Um lugar onde design, paisagem e conforto se unem para oferecer bem-estar.</p>
      </div>
      <Photo photo={featured.cover} className="mt-10 aspect-[4/5] md:aspect-[21/9]" />
      <div className="mt-8"><ButtonLink to={projectHref(featured)}>Conhecer o projeto</ButtonLink></div>
    </section>
  )
}
