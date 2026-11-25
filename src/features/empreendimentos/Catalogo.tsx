import { useState } from 'react'
import { PageSectionNav } from '@/components/ui/PageSectionNav'
import { img, type Empreendimento } from '@/content/empreendimentos'
import { HeroCarousel } from '@/features/home/HeroCarousel'
import { ProjectCard } from './ProjectCard'
import { useEmpreendimentos } from './useEmpreendimentos'

const stageDefinitions: {
  id: string
  title: string
  description: string
  status: Empreendimento['status']
  grid: string
}[] = [
  {
    id: 'lancamentos',
    title: 'Lançamentos',
    description: 'Novos projetos para conhecer antes do início das obras.',
    status: 'Lançamento',
    grid: 'xl:grid-cols-2',
  },
  {
    id: 'em-obras',
    title: 'Em obras',
    description: 'Projetos em execução, com localização, tipologia e diferenciais para conhecer.',
    status: 'Em obras',
    grid: 'xl:grid-cols-2',
  },
  {
    id: 'entregues',
    title: 'Entregues',
    description: 'Empreendimentos concluídos pela Tecvale.',
    status: 'Entregue',
    grid: 'xl:grid-cols-3',
  },
]

const filters = [
  { id: 'status:Lançamento', label: 'Lançamentos', group: 'status', value: 'Lançamento' },
  { id: 'status:Em obras', label: 'Em obras', group: 'status', value: 'Em obras' },
  { id: 'status:Entregue', label: 'Entregues', group: 'status', value: 'Entregue' },
  { id: 'city:São José dos Campos, SP', label: 'São José dos Campos', group: 'city', value: 'São José dos Campos, SP' },
  { id: 'city:Jacareí, SP', label: 'Jacareí', group: 'city', value: 'Jacareí, SP' },
] as const

export function Catalogo() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const { projects } = useEmpreendimentos()
  const activeFilters = filters.filter((filter) => selectedFilters.includes(filter.id))
  const selectedStatuses: string[] = activeFilters.filter((filter) => filter.group === 'status').map((filter) => filter.value)
  const selectedCities: string[] = activeFilters.filter((filter) => filter.group === 'city').map((filter) => filter.value)
  const filteredStages = stageDefinitions
    .map((stage) => ({
      ...stage,
      projects: projects.filter((project) => project.status === stage.status).filter((project) =>
        (!selectedStatuses.length || selectedStatuses.includes(project.status)) &&
        (!selectedCities.length || selectedCities.includes(project.city)),
      ),
    }))
    .filter((stage) => stage.projects.length > 0)

  const toggleFilter = (id: string) => {
    setSelectedFilters((current) =>
      current.includes(id) ? current.filter((filterId) => filterId !== id) : [...current, id],
    )
  }

  return (
    <>
      <HeroCarousel
        compact
        title="Empreendimentos"
        cover={{ src: img('concreto.jpg'), alt: 'Detalhe de arquitetura em concreto (imagem ilustrativa).' }}
        description="Conheça os lançamentos, projetos em obras e empreendimentos entregues pela Tecvale. Compare localização, tipologia, área e etapa."
      />

      <div className="frame-x mx-auto max-w-[1600px] pb-24 pt-14 md:pb-36 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <aside className="min-w-0 md:sticky md:top-32 md:h-fit">
            <PageSectionNav
              title="Empreendimentos"
              sections={filteredStages.map(({ id, title }) => ({ id, label: title }))}
              visible
            />
          </aside>

          <div className="min-w-0">
            <section className="grid gap-8 pb-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:pb-24">
              <div>
                <h2 className="text-4xl leading-tight md:text-6xl">Da obra à entrega.</h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  Conheça os lançamentos, projetos em construção e obras entregues pela Tecvale. Compare localização, tipologias e áreas; depois, acesse a página de cada empreendimento para ver mais detalhes.
                </p>
              </div>

              <div aria-label="Filtros de empreendimentos" className="pt-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">Explore por etapa ou cidade</p>
                <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1" role="group" aria-label="Filtrar empreendimentos">
                  {filters.map((filter) => {
                    const selected = selectedFilters.includes(filter.id)
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleFilter(filter.id)}
                        className={`min-h-11 cursor-pointer px-3 py-2 text-sm transition-colors hover:text-wine hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${selected ? 'text-wine underline underline-offset-4' : 'text-ink'}`}
                      >
                        {filter.label}
                      </button>
                    )
                  })}
                </div>

                {activeFilters.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Filtros selecionados">
                    {activeFilters.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => toggleFilter(filter.id)}
                        aria-label={`Remover filtro ${filter.label}`}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-none bg-ink/5 px-3 py-2 text-xs text-muted transition-colors hover:bg-ink/10 hover:text-wine"
                      >
                        {filter.label}<span aria-hidden="true">×</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedFilters([])}
                      className="min-h-11 cursor-pointer px-2 py-2 text-xs text-wine underline underline-offset-4 transition-colors hover:text-ink"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>
            </section>

            <div className="space-y-24 md:space-y-36">
              {filteredStages.map((stage) => (
                <section key={stage.id} id={stage.id} aria-labelledby={`${stage.id}-title`} className="scroll-mt-32">
                  <div className="mb-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end md:mb-10">
                    <div>
                      <h2 id={`${stage.id}-title`} className="text-3xl md:text-5xl">{stage.title}</h2>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">{stage.description}</p>
                    </div>
                    <p className="text-xs text-muted tabular-nums">
                      {stage.projects.length} {stage.projects.length === 1 ? 'projeto' : 'projetos'}
                    </p>
                  </div>

                  <div className={`grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-8 md:gap-y-16 ${stage.grid}`}>
                    {stage.projects.map((project) => (
                      <ProjectCard key={project.slug} projeto={project} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
            {filteredStages.length === 0 && (
              <p className="border-t border-ink/15 py-10 text-sm text-muted" role="status">
                Nenhum empreendimento encontrado com esses filtros. Ajuste ou limpe sua seleção.
              </p>
            )}
          </div>
        </div>

        <p className="mt-16 border-t border-ink/15 pt-5 text-xs text-muted md:ml-[calc(180px+2rem)] lg:ml-[calc(220px+3rem)]">
          Dados e imagens compilados das páginas oficiais da Tecvale.
        </p>
      </div>
    </>
  )
}
