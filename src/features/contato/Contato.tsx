import { office } from '@/content/site'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function Contato() {
  return (
    <section className="frame-x mx-auto max-w-3xl pt-12 md:pt-20">
      <div>
        <Eyebrow>Contato</Eyebrow>
        <h1 className="mt-4 text-4xl md:text-6xl">Vamos conversar</h1>
        <p className="mt-5 leading-relaxed text-muted">Conte como podemos ajudar e retornaremos em breve.</p>
        <address className="mt-8 space-y-1 text-sm not-italic">
          <p>{office.email}</p>
          <p>{office.phone}</p>
        </address>
        <div className="mt-10 flex aspect-[4/3] flex-col items-center justify-center gap-1 border border-dashed border-ink/30 bg-surface p-6 text-center">
          <p className="font-serif text-xl">Mapa do escritório</p>
          <p className="text-sm text-muted">{office.address}</p>
          <p className="text-sm text-muted">Espaço reservado até a localização oficial.</p>
        </div>
      </div>
    </section>
  )
}
