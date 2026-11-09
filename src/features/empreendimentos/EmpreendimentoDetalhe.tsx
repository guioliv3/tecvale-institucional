import { Link } from 'react-router'
import type { Empreendimento } from '@/content/empreendimentos'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Photo } from '@/components/ui/Photo'
import { PlanDiagram } from './PlanDiagram'

// Layout reutilizável. Cada bloco só aparece quando há conteúdo.
export function EmpreendimentoDetalhe({ projeto: p }: { projeto: Empreendimento }) {
  const contato = `/contato?empreendimento=${p.slug}`
  const quick = [
    ['Bairro', p.neighborhood],
    ['Status', p.status],
    ['Dormitórios', p.bedrooms],
    ['Área privativa', p.area],
  ]
  return (
    <>
      <section aria-labelledby="titulo" className="frame-x">
        <div className="on-dark relative h-[70svh] min-h-[420px] overflow-hidden bg-ink text-white md:h-[calc(100svh-7rem)]">
          <Photo photo={p.cover} className="h-full" eager />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">{p.status} · {p.neighborhood}</p>
            <h1 id="titulo" className="mt-3 text-5xl md:text-8xl">{p.name}</h1>
          </div>
        </div>
        <dl className="mx-auto grid max-w-[1600px] grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {quick.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
              <dd className="mt-1 font-serif text-xl md:text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="frame-x mx-auto grid max-w-[1600px] gap-8 py-16 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Eyebrow>Apresentação</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">{p.tagline}</h2>
        </div>
        <div className="space-y-5 leading-relaxed text-muted md:col-span-6 md:col-start-7">
          {p.presentation.map((t) => <p key={t}>{t}</p>)}
          <div className="pt-4"><ButtonLink to={contato}>Quero saber mais</ButtonLink></div>
        </div>
      </section>

      {p.gallery.length > 0 && (
        <section aria-labelledby="galeria" className="frame-x mx-auto max-w-[1600px]">
          <h2 id="galeria" className="sr-only">Galeria</h2>
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            {p.gallery.map((g, i) => {
              // Primeira foto larga; se sobrar uma foto sozinha na última linha, ela também ocupa a largura.
              const n = p.gallery.length
              const full = i === 0 || (i === n - 1 && (n - 1) % 2 === 1)
              return (
                <Photo key={g.src} photo={g} className={full ? 'aspect-[16/9] md:col-span-12' : 'aspect-[4/3] md:col-span-6'} />
              )
            })}
          </div>
        </section>
      )}

      {p.features.length > 0 && (
        <section className="frame-x mx-auto max-w-[1600px] py-20 md:py-32">
          <Eyebrow>Diferenciais</Eyebrow>
          <ul className="mt-8 grid gap-x-10 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {p.features.map((f) => (
              <li key={f.title}>
                <h3 className="text-2xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.plans.length > 0 && (
        <section className="bg-surface py-20 md:py-28">
          <div className="frame-x mx-auto max-w-[1600px]">
            <Eyebrow>Plantas</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl">Opções de planta</h2>
            <p className="mt-3 text-sm text-muted">Esquemas provisórios; plantas oficiais serão inseridas.</p>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {p.plans.map((pl) => (
                <li key={pl.name} className="bg-page p-6">
                  <div className="aspect-[10/7]"><PlanDiagram /></div>
                  <h3 className="mt-4 text-2xl">{pl.name}</h3>
                  <p className="mt-1 text-sm text-muted">{pl.area} · {pl.bedrooms} dormitórios · {pl.suites} suítes</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="frame-x mx-auto grid max-w-[1600px] gap-8 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Eyebrow>Ficha técnica</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">Em números</h2>
          <p className="mt-3 text-sm text-muted">Dados de demonstração.</p>
        </div>
        <dl className="md:col-span-6 md:col-start-7">
          {[...p.specs, { label: 'Localização', value: `${p.neighborhood}, ${p.city}` }].map((s) => (
            <div key={s.label} className="flex justify-between gap-6 border-b border-ink/15 py-4">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="text-right">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="frame-x mx-auto max-w-[1600px]">
        <div className="bg-wine px-6 py-14 text-center text-white md:py-20">
          <h2 className="text-3xl md:text-5xl">Fale com a Tecvale sobre o {p.name}</h2>
          <div className="mt-8"><ButtonLink to={contato} variant="light">Solicitar contato</ButtonLink></div>
        </div>
        <p className="mt-6 text-sm"><Link to="/empreendimentos" className="underline underline-offset-4 hover:text-wine">Voltar ao catálogo</Link></p>
      </section>
    </>
  )
}
