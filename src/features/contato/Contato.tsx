import { useLocation } from 'react-router'
import { getEmpreendimento } from '@/content/empreendimentos'
import { office } from '@/content/site'
import { PageSectionNav } from '@/components/ui/PageSectionNav'
import { ContactForm } from './ContactForm'

const sections = [
  { id: 'mensagem', label: 'Envie uma mensagem' },
  { id: 'contato-direto', label: 'Contato direto' },
  { id: 'localizacao', label: 'Localização' },
  { id: 'faq', label: 'Dúvidas frequentes' },
]

function ContactIcon({ type }: { type: 'phone' | 'mail' | 'chat' | 'pin' }) {
  const paths = {
    phone: <path d="M5 3h3l2 5-2 1.5a14 14 0 0 0 6.5 6.5L16 14l5 2v3a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.5-.8L4 20l1.4-3.5A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-5 shrink-0 text-wine">{paths[type]}</svg>
}

export function Contato() {
  const { search } = useLocation()
  const projectSlug = new URLSearchParams(search).get('empreendimento') ?? undefined
  const projeto = getEmpreendimento(projectSlug)

  return (
    <div className="frame-x mx-auto max-w-[1600px] pb-24 pt-12 md:pb-36 md:pt-20">
      <header className="max-w-4xl pb-12 md:pb-16">
        <h1 className="text-4xl leading-tight md:text-6xl">Fale com a Tecvale.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Escolha o assunto da sua mensagem ou fale diretamente com a equipe responsável.
        </p>
      </header>

      <div className="grid gap-10 border-t border-ink/15 pt-8 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 md:pt-10 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-8">
        <div className="md:sticky md:top-32 md:h-fit">
          <PageSectionNav title="Contato" sections={sections} visible />
        </div>

        <div className="min-w-0">
          <div className="grid gap-14 md:grid-cols-12 md:gap-12">
            <section id="mensagem" aria-labelledby="mensagem-title" className="scroll-mt-28 md:col-span-7">
              <h2 id="mensagem-title" className="text-2xl md:text-3xl">Envie uma mensagem</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                O assunto escolhido ajuda a encaminhar sua solicitação para a equipe certa.
              </p>
              <div className="mt-8">
                <ContactForm key={projeto?.slug ?? 'geral'} projeto={projeto} />
              </div>
            </section>

            <section id="contato-direto" aria-labelledby="contato-direto-title" className="scroll-mt-28 md:col-span-4 md:col-start-9">
              <h2 id="contato-direto-title" className="text-2xl md:text-3xl">Contato direto</h2>
              <dl className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
                <div className="flex gap-3 py-4">
                  <ContactIcon type="phone" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted">Telefone</dt>
                    <dd className="mt-1.5 text-sm"><a href={`tel:${office.phoneHref}`} className="transition-colors hover:text-wine">{office.phone}</a></dd>
                  </div>
                </div>
                <div className="flex gap-3 py-4">
                  <ContactIcon type="mail" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted">E-mail</dt>
                    <dd className="mt-1.5 break-words text-sm"><a href={`mailto:${office.email}`} className="transition-colors hover:text-wine">{office.email}</a></dd>
                  </div>
                </div>
                <div className="flex gap-3 py-4">
                  <ContactIcon type="chat" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted">WhatsApp de vendas</dt>
                    <dd className="mt-1.5 text-sm"><a href={office.whatsappHref} target="_blank" rel="noreferrer" className="transition-colors hover:text-wine">{office.whatsapp}</a></dd>
                  </div>
                </div>
              </dl>
            </section>
          </div>

          <section id="localizacao" aria-labelledby="localizacao-title" className="scroll-mt-28 mt-20 border-t border-ink/15 pt-8 md:mt-32 md:pt-10">
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-4">
                <div className="flex gap-3">
                  <ContactIcon type="pin" />
                  <div>
                    <h2 id="localizacao-title" className="text-2xl md:text-3xl">Nosso escritório</h2>
                    <address className="mt-4 text-sm leading-relaxed text-muted not-italic">
                      {office.address}<br />{office.city}
                    </address>
                    <a href={office.mapHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex cursor-pointer items-center gap-2 border-b border-ink/40 pb-1 text-xs transition-colors hover:border-wine hover:text-wine">
                      Ver rota no Google Maps
                      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-3.5"><path d="M4 12 12 4M5 4h7v7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:col-span-8">
                <iframe
                  title="Localização do escritório da Tecvale no Hyde Park, em São José dos Campos"
                  src={office.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[16/9] w-full border-0 bg-surface"
                />
              </div>
            </div>
          </section>

          <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28 mt-20 border-t border-ink/15 pt-8 md:mt-32 md:pt-10">
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-4">
                <h2 id="faq-title" className="text-3xl md:text-4xl">Dúvidas frequentes</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                  Respostas sobre o formulário, o atendimento e o escritório da Tecvale.
                </p>
              </div>
              <div className="md:col-span-8">
                {[
                  {
                    question: 'Que tipo de assunto posso enviar pelo formulário?',
                    answer: 'Você pode falar com a equipe em geral, pedir informações sobre empreendimentos ou tratar de um assunto relacionado a clientes. Selecione a opção que melhor descreve sua solicitação.',
                  },
                  {
                    question: 'Como peço informações sobre um empreendimento?',
                    answer: 'Escolha “Interesse em empreendimentos” no formulário. Você pode indicar o projeto de interesse, se já tiver um em mente; essa informação é opcional.',
                  },
                  {
                    question: 'Já sou cliente. Como entro em contato?',
                    answer: 'Selecione “Relacionamento com clientes” e descreva o que precisa. Ao continuar, o site prepara uma mensagem de e-mail para você revisar e enviar.',
                  },
                  {
                    question: 'A mensagem é enviada diretamente pelo site?',
                    answer: 'Não. O formulário abre uma mensagem preenchida no e-mail ou no WhatsApp, conforme o assunto selecionado. Você pode revisar e enviar pelo aplicativo.',
                  },
                  {
                    question: 'Onde fica o escritório da Tecvale?',
                    answer: `${office.address}, ${office.city}.`,
                  },
                ].map(({ question, answer }) => (
                  <details key={question} className="group border-t border-ink/20">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base marker:hidden hover:text-wine [&::-webkit-details-marker]:hidden md:text-lg">
                      {question}
                      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4 shrink-0 transition-transform group-open:rotate-45">
                        <path d="M10 3v14M3 10h14" />
                      </svg>
                    </summary>
                    <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-muted">{answer}</p>
                  </details>
                ))}
                <div className="border-t border-ink/20" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
