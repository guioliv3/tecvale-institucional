import { Eyebrow } from '@/components/ui/Eyebrow'
import { TextLink } from '@/components/ui/TextLink'

export function IntroSection() {
  return (
    <section className="frame-x mx-auto max-w-[1600px] pt-24 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow>Tecvale</Eyebrow>
        <h2 className="mt-6 text-3xl leading-snug md:text-5xl md:leading-tight">
          Casas têm valor quando são idealizadas, projetadas e construídas para melhorar a relação das pessoas com o tempo.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted">
          Texto de demonstração. A Tecvale reinventa a cada projeto a maneira de construir qualidade de vida, com rigor de obra e atenção ao detalhe.
        </p>
        <div className="mt-10"><TextLink to="/sobre">Conheça a Tecvale</TextLink></div>
      </div>
    </section>
  )
}
