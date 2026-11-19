import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import type { Empreendimento, Plan } from '@/content/empreendimentos'
import { portfolioEmpreendimentos } from '@/content/empreendimentos'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PageSectionNav, type PageSection } from '@/components/ui/PageSectionNav'
import { Photo } from '@/components/ui/Photo'
import { ProjectCard } from './ProjectCard'
import { PlanDiagram } from './PlanDiagram'

function getRelatedProjects(project: Empreendimento) {
  const explicit = (project.relatedSlugs ?? [])
    .map((slug) => portfolioEmpreendimentos.find((item) => item.slug === slug))
    .filter((item): item is Empreendimento => Boolean(item))
  const otherProjects = portfolioEmpreendimentos.filter((item) => item.slug !== project.slug)
  const inSameNeighborhood = otherProjects.filter(
    (item) => project.neighborhood && item.neighborhood === project.neighborhood,
  )
  const inSameCity = otherProjects.filter(
    (item) => project.city && item.city === project.city && !inSameNeighborhood.includes(item),
  )

  return [...explicit, ...inSameNeighborhood, ...inSameCity, ...otherProjects]
    .filter((item, index, list) => item.slug !== project.slug && list.findIndex(({ slug }) => slug === item.slug) === index)
    .slice(0, 3)
}

function PlansSection({ plans }: { plans: Plan[] }) {
  const [selectedName, setSelectedName] = useState(plans[0]?.name)
  const selectedPlan = plans.find((plan) => plan.name === selectedName) ?? plans[0]

  if (!selectedPlan) return null

  return (
    <section id="plantas" aria-labelledby="plantas-title" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
      <h2 id="plantas-title" className="max-w-3xl text-3xl md:text-5xl">Plantas pensadas para cada rotina.</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        Consulte as tipologias e áreas divulgadas para este empreendimento.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/15" role="group" aria-label="Selecionar tipologia">
        {plans.map((plan) => (
          <button
            key={plan.name}
            type="button"
            aria-pressed={selectedPlan.name === plan.name}
            onClick={() => setSelectedName(plan.name)}
            className={`min-h-11 cursor-pointer border-b-2 px-1 py-2 text-sm transition-colors hover:text-wine ${selectedPlan.name === plan.name ? 'border-wine text-wine' : 'border-transparent text-muted'}`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div id="planta-selecionada" className="flex aspect-[10/7] items-center justify-center bg-surface p-6 md:p-10">
          {selectedPlan.image ? (
            <img src={selectedPlan.image.src} alt={selectedPlan.image.alt} className="h-full w-full object-contain" />
          ) : (
            <PlanDiagram />
          )}
        </div>
        <div>
          <h3 className="font-serif text-3xl">{selectedPlan.name}</h3>
          <dl className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-sm text-muted">Área</dt>
              <dd className="text-right text-sm">{selectedPlan.area}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-sm text-muted">Dormitórios</dt>
              <dd className="text-right text-sm">{selectedPlan.bedrooms}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-sm text-muted">Suítes</dt>
              <dd className="text-right text-sm">{selectedPlan.suites}</dd>
            </div>
          </dl>
          {!selectedPlan.image && (
            <p className="mt-4 text-xs leading-relaxed text-muted">Esquema provisório. A planta oficial será exibida quando estiver disponível.</p>
          )}
          {selectedPlan.details && selectedPlan.details.length > 0 && (
            <ul className="mt-6 divide-y divide-ink/10 border-t border-ink/15 text-sm leading-relaxed text-muted">
              {selectedPlan.details.map((detail) => <li key={detail} className="py-2">{detail}</li>)}
            </ul>
          )}
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted">Plantas ilustrativas.</p>
    </section>
  )
}

export function EmpreendimentoDetalhe({ projeto: p }: { projeto: Empreendimento }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [menuVisible, setMenuVisible] = useState(false)
  const contactHref = `/contato?empreendimento=${p.slug}`
  const location = [p.neighborhood, p.city].filter(Boolean).join(' · ')
  const mapQuery = [p.address, p.neighborhood, p.city].filter(Boolean).join(', ')
  const mapHref = p.mapUrl ?? (mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    : undefined)
  const relatedProjects = getRelatedProjects(p)
  const unitCount = p.specs.find((spec) => spec.label.toLowerCase() === 'unidades')?.value
  const quickFacts = [
    ...(p.bedrooms ? [{ label: 'Tipologia', value: p.bedrooms }] : []),
    ...(p.area ? [{ label: p.areaLabel ?? 'Área privativa', value: p.area }] : []),
    ...(p.parking ? [{ label: 'Vagas', value: p.parking }] : []),
    ...(unitCount ? [{ label: 'Unidades', value: unitCount }] : []),
  ]
  const sections: PageSection[] = [
    { id: 'apresentacao', label: 'Apresentação' },
    ...(p.gallery.length > 0 ? [{ id: 'galeria', label: 'Galeria' }] : []),
    ...(p.features.length > 0 || p.featuresImage ? [{ id: 'diferenciais', label: 'Diferenciais e lazer' }] : []),
    ...(p.plans.length > 0 ? [{ id: 'plantas', label: 'Plantas e tipologias' }] : []),
    { id: 'localizacao', label: 'Localização' },
    { id: 'etapa', label: 'Etapa e ficha técnica' },
    { id: 'contato-comercial', label: 'Contato comercial' },
    ...(relatedProjects.length > 0 ? [{ id: 'relacionados', label: 'Outros empreendimentos' }] : []),
  ]

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setMenuVisible(!entry.isIntersecting))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const stageHeading = p.status === 'Lançamento'
    ? 'Um novo projeto da Tecvale.'
    : p.status === 'Em obras'
      ? 'A construção está em andamento.'
      : 'Um empreendimento entregue.'

  return (
    <>
      <div ref={heroRef} className="frame-x">
        <section aria-labelledby="empreendimento-titulo" className="on-dark relative h-[68svh] min-h-[420px] overflow-hidden bg-ink text-white md:h-[calc(100svh-7rem)]">
          <Photo photo={p.cover} className="h-full" tag={false} eager />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
            <h1 id="empreendimento-titulo" className="max-w-5xl text-[clamp(3rem,7.5vw,6rem)] leading-[0.95]">
              {p.name}
            </h1>
          </div>
        </section>
      </div>

      <div className="frame-x mx-auto max-w-[1600px] pb-24 pt-8 md:pb-36 md:pt-10">
        <div className="grid gap-8 border-t border-ink/15 pt-6 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-8">
          <div className="min-w-0 md:sticky md:top-32 md:h-fit">
            <PageSectionNav title="Neste empreendimento" sections={sections} visible={menuVisible} />
          </div>

          <main className="min-w-0">
            <section id="apresentacao" aria-labelledby="apresentacao-title" className="scroll-mt-28 pb-14 md:pb-20">
              <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
                <div>
                  <h2 id="apresentacao-title" className="max-w-2xl text-3xl leading-tight md:text-5xl">{p.tagline}</h2>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">{p.summary}</p>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
                  {p.presentation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>

              {quickFacts.length > 0 && (
                <dl className="mt-10 grid grid-cols-2 gap-x-5 border-y border-ink/15 py-5 sm:grid-cols-4 md:mt-14 md:gap-x-8 md:py-7">
                  {quickFacts.map(({ label, value }) => (
                    <div key={label} className="py-2">
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-muted">{label}</dt>
                      <dd className="mt-2 font-serif text-lg leading-snug md:text-xl">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>

            {p.gallery.length > 0 && (
              <section id="galeria" aria-labelledby="galeria-title" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
                <h2 id="galeria-title" className="text-3xl md:text-5xl">Galeria arquitetônica.</h2>
                <div className="mt-8 grid gap-2 md:h-[22rem] md:grid-cols-3 md:grid-rows-2 xl:h-[26rem]">
                  {p.gallery.map((photo, index) => (
                    <Photo
                      key={photo.src}
                      photo={photo}
                      className={index === 0 ? 'aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto' : 'aspect-[16/9] md:aspect-auto'}
                    />
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">Mockups ilustrativos para validação visual; não representam imagens ou especificações oficiais do empreendimento.</p>
              </section>
            )}

            {(p.features.length > 0 || p.featuresImage) && (
              <section id="diferenciais" aria-labelledby="diferenciais-title" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
                <h2 id="diferenciais-title" className="max-w-3xl text-3xl md:text-5xl">Diferenciais e áreas de lazer.</h2>
                <div className="mt-8 grid gap-3 md:grid-cols-2 md:items-stretch md:gap-5">
                  {p.featuresImage && <Photo photo={p.featuresImage} className="aspect-[4/3] md:aspect-auto md:min-h-64" />}
                  {p.features.length > 0 ? (
                    <ul className="grid gap-x-8 sm:grid-cols-2">
                      {p.features.map((feature) => (
                        <li key={feature.title} className="border-t border-ink/15 py-5 md:py-6">
                          <h3 className="font-serif text-2xl">{feature.title}</h3>
                          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{feature.text}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col justify-center bg-surface px-6 py-8 md:px-8">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-wine">Prévia ilustrativa</p>
                      <p className="mt-3 max-w-lg font-serif text-2xl leading-snug">Uma referência visual para imaginar os espaços do empreendimento.</p>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">Os diferenciais e itens de lazer serão apresentados após a validação das informações oficiais.</p>
                    </div>
                  )}
                </div>
                {p.featuresImage && <p className="mt-4 text-xs leading-relaxed text-muted">Imagem ilustrativa dos ambientes. Consulte a equipe comercial para confirmar as especificações do empreendimento.</p>}
              </section>
            )}

            {p.plans.length > 0 && <PlansSection key={p.slug} plans={p.plans} />}

            <section id="localizacao" aria-labelledby="localizacao-title" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
              <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                <div>
                  <h2 id="localizacao-title" className="text-3xl md:text-5xl">{p.neighborhood ? `No ${p.neighborhood}.` : 'Localização do empreendimento.'}</h2>
                  {location ? (
                    <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{location}</p>
                  ) : (
                    <p className="mt-4 text-sm leading-relaxed text-muted">A localização ainda não foi informada para este empreendimento.</p>
                  )}
                  {p.address && <p className="mt-3 text-sm leading-relaxed">{p.address}</p>}
                  {p.locationContext && <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">{p.locationContext}</p>}
                  {mapHref && (
                    <a href={mapHref} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center text-sm text-wine underline underline-offset-4 transition-colors hover:text-wine-dark">
                      Abrir localização no mapa
                    </a>
                  )}
                </div>
                {mapQuery ? (
                  <iframe
                    title={`Mapa de ${p.name}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="aspect-[16/10] w-full border-0 bg-surface md:aspect-[4/3]"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-surface px-6 text-center text-sm text-muted md:aspect-[4/3]">
                    O mapa será exibido quando a localização for cadastrada.
                  </div>
                )}
              </div>
            </section>

            <section id="etapa" aria-labelledby="etapa-title" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
              <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-wine">{p.status}</p>
                  <h2 id="etapa-title" className="mt-3 text-3xl md:text-5xl">{stageHeading}</h2>
                  {p.progress?.summary && <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{p.progress.summary}</p>}
                  {p.deliveryDate && (
                    <p className="mt-6 text-sm">
                      <span className="text-muted">{p.status === 'Entregue' ? 'Entrega' : 'Previsão de entrega'}</span>
                      <span className="ml-3">{p.deliveryDate}</span>
                    </p>
                  )}
                  {p.progress?.updatedAt && <p className="mt-3 text-xs text-muted">Atualizado em {p.progress.updatedAt}</p>}
                </div>

                <div>
                  {p.progress?.milestones && p.progress.milestones.length > 0 && (
                    <ol className="mb-8 divide-y divide-ink/15 border-y border-ink/15">
                      {p.progress.milestones.map((milestone) => (
                        <li key={`${milestone.title}-${milestone.date ?? ''}`} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                          <span>{milestone.title}</span>
                          <span className="text-sm text-muted">{milestone.date && `${milestone.date} · `}{milestone.status}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  <p className="mb-4 text-xs text-muted">Ficha técnica · informações divulgadas pela Tecvale</p>
                  {p.specs.length > 0 ? (
                    <dl className="divide-y divide-ink/15 border-y border-ink/15">
                      {p.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between gap-6 py-4">
                          <dt className="text-sm text-muted">{spec.label}</dt>
                          <dd className="text-right text-sm">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="border-y border-ink/15 py-4 text-sm text-muted">Outros dados técnicos serão apresentados quando forem cadastrados.</p>
                  )}
                </div>
              </div>
            </section>

            <section id="contato-comercial" aria-labelledby="contato-title" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
              <div className="bg-wine px-6 py-12 text-white md:px-10 md:py-16">
                <h2 id="contato-title" className="max-w-3xl text-3xl md:text-5xl">Quer saber mais sobre o {p.name}?</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                  Fale com a equipe comercial para consultar informações, disponibilidade e próximos passos.
                </p>
                <div className="mt-7"><ButtonLink to={contactHref} variant="light">Falar com a equipe</ButtonLink></div>
              </div>
              <p className="mt-5 text-sm">
                <Link to="/empreendimentos" className="inline-flex min-h-11 items-center text-wine underline underline-offset-4 transition-colors hover:text-wine-dark">Ver todos os empreendimentos</Link>
              </p>
            </section>

            {relatedProjects.length > 0 && (
              <section id="relacionados" aria-labelledby="relacionados-title" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-wine">Portfólio Tecvale</p>
                    <h2 id="relacionados-title" className="mt-3 text-3xl md:text-5xl">Outros empreendimentos.</h2>
                  </div>
                  <Link to="/empreendimentos" className="text-sm text-wine underline underline-offset-4 transition-colors hover:text-wine-dark">Ver todos</Link>
                </div>
                <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((project) => <ProjectCard key={project.slug} projeto={project} />)}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
