import { img } from '@/content/empreendimentos'
import { obras, stats } from '@/content/site'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Photo } from '@/components/ui/Photo'
import { ProvisionalTag } from '@/components/ui/ProvisionalTag'

export function Sobre() {
  return (
    <>
      <section className="frame-x mx-auto max-w-[1600px] pt-12 md:pt-20">
        <Eyebrow>Sobre</Eyebrow>
        <h1 className="mt-4 max-w-4xl text-4xl md:text-7xl">Construímos com o tempo das pessoas em mente</h1>
        <Photo photo={{ src: img('concreto.jpg'), alt: 'Detalhe de arquitetura (imagem ilustrativa)' }} className="mt-12 aspect-[4/3] md:aspect-[21/9]" />
      </section>

      <section className="frame-x mx-auto grid max-w-[1600px] gap-8 py-16 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <h2 className="text-3xl md:text-5xl">Nossa trajetória</h2>
          <ProvisionalTag className="mt-4 !bg-ink/70">Texto provisório</ProvisionalTag>
        </div>
        <div className="space-y-5 leading-relaxed text-muted md:col-span-6 md:col-start-7">
          <p>Texto de demonstração. Aqui entrará a história da Tecvale: fundação, valores e o caminho percorrido até os empreendimentos atuais.</p>
          <p>Espaço reservado para contar como a construtora evoluiu em processos, engenharia e relacionamento com clientes.</p>
        </div>
      </section>

      <section aria-labelledby="indicadores" className="bg-surface py-16 md:py-24">
        <div className="frame-x mx-auto max-w-[1600px]">
          <h2 id="indicadores" className="sr-only">Indicadores</h2>
          <p className="mb-8 text-xs uppercase tracking-[0.16em] text-muted">Números de exemplo (conteúdo de demonstração)</p>
          <dl className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-serif text-5xl font-normal text-wine md:text-7xl">{s.value}</dd>
                <dt className="mt-2 text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="frame-x mx-auto max-w-[1600px] py-20 md:py-32">
        <h2 className="text-3xl md:text-5xl">Obras realizadas</h2>
        <p className="mt-3 text-sm text-muted">Obras de exemplo.</p>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {obras.map((o) => (
            <li key={o.name}>
              <Photo photo={o.image} className="aspect-[4/3]" />
              <h3 className="mt-4 text-2xl">{o.name}</h3>
              <p className="text-sm text-muted">{o.place} · {o.year}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
