import { img } from '@/content/empreendimentos'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Photo } from '@/components/ui/Photo'

export function LocationSection() {
  return (
    <section className="mt-24 bg-surface py-20 md:mt-40 md:py-32">
      <div className="frame-x mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Eyebrow>Localização</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">Mais tempo para o que realmente importa</h2>
          <p className="mt-6 leading-relaxed text-muted">
            Texto de demonstração. Os empreendimentos ficam em regiões com serviços, escolas, comércio e áreas verdes, simplificando a rotina de quem mora.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Um equilíbrio entre infraestrutura e contato com a natureza, pensado para quem busca viver bem.
          </p>
        </div>
        <Photo
          photo={{ src: img('fachada-1.jpg'), alt: 'Casa cercada de vegetação (imagem ilustrativa)' }}
          className="aspect-[4/3] md:col-span-7 md:aspect-[16/11]"
        />
      </div>
    </section>
  )
}
