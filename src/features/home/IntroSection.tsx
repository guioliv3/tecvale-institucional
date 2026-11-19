import { TextLink } from '@/components/ui/TextLink'

export function IntroSection() {
  return (
    <section className="frame-x mx-auto max-w-[1600px] pt-24 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mt-6 text-3xl leading-snug md:text-5xl md:leading-tight">
          “Tudo posso naquele que me fortalece.”
        </h2>
        <p className="mx-auto mt-6 text-sm tracking-wide text-muted">
          Filipenses 4:13
        </p>
        <div className="mt-10"><TextLink to="/sobre">Conheça a Tecvale</TextLink></div>
      </div>
    </section>
  )
}
