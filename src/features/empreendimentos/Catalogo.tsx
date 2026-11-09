import { empreendimentos } from '@/content/empreendimentos'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProjectCard } from './ProjectCard'

export function Catalogo() {
  return (
    <section className="frame-x mx-auto max-w-[1600px] pb-8 pt-12 md:pt-20">
      <Eyebrow>Empreendimentos</Eyebrow>
      <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl">Projetos pensados para cada forma de viver</h1>
      <p className="mt-4 text-sm text-muted">Dados e imagens de demonstração.</p>
      <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {empreendimentos.map((p) => <ProjectCard key={p.slug} projeto={p} />)}
      </div>
    </section>
  )
}
