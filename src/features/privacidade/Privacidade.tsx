import { office } from '@/content/site'
import { PageSectionNav } from '@/components/ui/PageSectionNav'

const sections = [
  { id: 'dados-coletados', label: 'Dados coletados' },
  { id: 'finalidade', label: 'Finalidade do tratamento' },
  { id: 'base-legal', label: 'Base legal' },
  { id: 'compartilhamento', label: 'Compartilhamento' },
  { id: 'cookies', label: 'Cookies e rastreamento' },
  { id: 'armazenamento', label: 'Armazenamento e segurança' },
  { id: 'direitos', label: 'Direitos do titular' },
  { id: 'canal', label: 'Canal de comunicação' },
  { id: 'alteracoes', label: 'Alterações desta política' },
]

const bodyClass = 'mt-5 max-w-3xl space-y-4 text-sm leading-relaxed text-muted md:text-base'

export function Privacidade() {
  return (
    <div className="frame-x mx-auto max-w-[1600px] pb-24 pt-12 md:pb-36 md:pt-20">
      <header className="max-w-4xl pb-12 md:pb-16">
        <h1 className="text-4xl leading-tight md:text-6xl">Política de privacidade e proteção de dados</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Saiba quais dados pessoais são tratados pela Tecvale, para quais finalidades e como exercer seus direitos.
        </p>
        <p className="mt-4 text-xs text-muted">Última atualização: 7 de outubro de 2026</p>
      </header>

      <div className="grid gap-10 border-t border-ink/15 pt-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8 md:pt-10">
        <div className="md:sticky md:top-32 md:h-fit">
          <PageSectionNav title="Nesta política" sections={sections} visible />
        </div>

        <article className="min-w-0">
          <p className="max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            Esta Política de Privacidade descreve como a TECVALE CONSTRUTORA E INCORPORADORA LTDA., CNPJ 15.479.721/0001-01 ("Controlador"), coleta, utiliza, armazena e protege os dados pessoais dos usuários ("Titular") por meio deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </p>

          <section id="dados-coletados" aria-labelledby="dados-coletados-title" className="scroll-mt-28 border-t border-ink/15 mt-12 py-12 md:mt-16 md:py-16">
            <h2 id="dados-coletados-title" className="text-2xl md:text-4xl">1. Dados coletados</h2>
            <p className={bodyClass}>
              Ao interagir com nosso site, especialmente ao preencher o formulário de pré-cadastro, coletamos os seguintes dados pessoais: nome completo, e-mail, telefone ou WhatsApp e tipo de interesse (investimento ou moradia).
            </p>
          </section>

          <section id="finalidade" aria-labelledby="finalidade-title" className="scroll-mt-28 border-t border-ink/15 py-12 md:py-16">
            <h2 id="finalidade-title" className="text-2xl md:text-4xl">2. Finalidade do tratamento</h2>
            <p className={bodyClass}>Os dados coletados são utilizados exclusivamente para:</p>
            <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted md:text-base">
              <li>Contato comercial direto relacionado ao empreendimento ARES Aquarius.</li>
              <li>Envio de informações detalhadas, propostas e condições comerciais.</li>
              <li>Envio de convites para eventos de lançamento e novidades sobre o empreendimento.</li>
              <li>Atendimento a solicitações e dúvidas do próprio titular.</li>
            </ul>
          </section>

          <section id="base-legal" aria-labelledby="base-legal-title" className="scroll-mt-28 border-t border-ink/15 py-12 md:py-16">
            <h2 id="base-legal-title" className="text-2xl md:text-4xl">3. Base legal</h2>
            <p className={bodyClass}>
              O tratamento dos dados pessoais é realizado com base no consentimento do titular (art. 7º, inciso I, da LGPD), fornecido de forma livre, informada e inequívoca no momento do envio do formulário, bem como na execução de procedimentos preliminares relacionados a contrato do qual o titular seja parte (art. 7º, inciso V, da LGPD).
            </p>
          </section>

          <section id="compartilhamento" aria-labelledby="compartilhamento-title" className="scroll-mt-28 border-t border-ink/15 py-12 md:py-16">
            <h2 id="compartilhamento-title" className="text-2xl md:text-4xl">4. Compartilhamento de dados</h2>
            <p className={bodyClass}>A Tecvale não comercializa nem aluga dados pessoais. O compartilhamento ocorre exclusivamente com:</p>
            <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted md:text-base">
              <li><span className="text-ink">Imobiliária parceira:</span> MORÁBILI GESTÃO &amp; SOLUÇÕES LTDA., CNPJ 14.511.903/0001-41, CRECI 32934-J, estritamente para viabilizar o atendimento comercial e a apresentação do empreendimento.</li>
              <li><span className="text-ink">Provedores de infraestrutura tecnológica:</span> hospedagem do site e sistemas de CRM, que também devem cumprir as diretrizes da LGPD.</li>
            </ul>
          </section>

          <section id="cookies" aria-labelledby="cookies-title" className="scroll-mt-28 border-t border-ink/15 py-12 md:py-16">
            <h2 id="cookies-title" className="text-2xl md:text-4xl">5. Cookies e tecnologias de rastreamento</h2>
            <p className={bodyClass}>Utilizamos cookies para melhorar a experiência de navegação e analisar o tráfego do site:</p>
            <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted md:text-base">
              <li><span className="text-ink">Cookies essenciais:</span> necessários para o funcionamento básico do site.</li>
              <li><span className="text-ink">Cookies de desempenho e marketing:</span> Google Analytics e Meta Pixel coletam informações anônimas sobre como os visitantes utilizam o site, permitindo a otimização de campanhas de publicidade.</li>
            </ul>
            <p className={bodyClass}>O titular pode desativar cookies não essenciais a qualquer momento nas configurações do navegador.</p>
          </section>

          <section id="armazenamento" aria-labelledby="armazenamento-title" className="scroll-mt-28 border-t border-ink/15 py-12 md:py-16">
            <h2 id="armazenamento-title" className="text-2xl md:text-4xl">6. Armazenamento e segurança da informação</h2>
            <p className={bodyClass}>
              Os dados pessoais serão armazenados pelo período de cinco anos, enquanto durar a relação comercial ou até que o titular solicite a revogação do consentimento. Adotamos medidas técnicas e administrativas, como criptografia, controle de acesso e firewalls, para proteger os dados contra acessos não autorizados, perdas, alterações ou vazamentos.
            </p>
          </section>

          <section id="direitos" aria-labelledby="direitos-title" className="scroll-mt-28 border-t border-ink/15 py-12 md:py-16">
            <h2 id="direitos-title" className="text-2xl md:text-4xl">7. Direitos do titular dos dados</h2>
            <p className={bodyClass}>Em conformidade com o art. 18 da LGPD, o titular pode solicitar, a qualquer momento e gratuitamente:</p>
            <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted md:text-base">
              <li>A confirmação da existência de tratamento de dados.</li>
              <li>O acesso aos dados pessoais tratados.</li>
              <li>A correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>A anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos.</li>
              <li>A revogação do consentimento previamente concedido.</li>
            </ul>
          </section>

          <section id="canal" aria-labelledby="canal-title" className="scroll-mt-28 border-t border-ink/15 py-12 md:py-16">
            <h2 id="canal-title" className="text-2xl md:text-4xl">8. Canal de comunicação</h2>
            <p className={bodyClass}>
              Para exercer seus direitos ou tirar dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail{' '}
              <a className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-wine" href={`mailto:${office.email}`}>{office.email}</a>.
            </p>
          </section>

          <section id="alteracoes" aria-labelledby="alteracoes-title" className="scroll-mt-28 border-t border-ink/15 pt-12 md:pt-16">
            <h2 id="alteracoes-title" className="text-2xl md:text-4xl">9. Alterações desta política</h2>
            <p className={bodyClass}>
              Esta política poderá ser atualizada periodicamente para refletir melhorias nos processos de segurança ou adequações legais. Recomendamos visitar esta página para consultar eventuais modificações.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
