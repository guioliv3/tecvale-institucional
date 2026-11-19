import { office } from '@/content/site'
import { ContactForm } from '@/features/contato/ContactForm'

export function HomeContactSection() {
  return (
    <section id="contato" aria-labelledby="home-contact-title" className="frame-x scroll-mt-20 pb-10 md:pb-14">
      <div className="mx-auto grid min-h-[min(720px,calc(100svh-7rem))] max-w-[1600px] gap-10 bg-wine p-6 text-white sm:p-8 md:grid-cols-2 md:items-center md:gap-12 md:p-12 lg:p-16">
        <div>
          <h2 id="home-contact-title" className="max-w-lg text-3xl leading-tight md:text-5xl">
            Vamos conversar sobre o seu próximo endereço?
          </h2>
          <address className="mt-5 max-w-md not-italic text-sm leading-relaxed text-white/85">
            {office.address}<br />{office.city}
          </address>
          <a
            href={office.mapHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-11 items-center text-sm underline decoration-white/60 underline-offset-4 hover:decoration-white focus-visible:outline-white"
          >
            Abrir no Google Maps
          </a>
          <iframe
            title="Mapa do escritório da Tecvale em São José dos Campos"
            src={office.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-5 h-48 w-full border-0 sm:h-56 md:h-52 lg:h-60"
          />
        </div>

        <div className="min-w-0">
          <p className="mb-5 text-sm leading-relaxed text-white/85">Deixe seus dados e conte como podemos ajudar.</p>
          <ContactForm quick />
        </div>
      </div>
    </section>
  )
}
