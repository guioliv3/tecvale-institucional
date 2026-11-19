import { useRef, useState, type FormEvent } from 'react'
import type { Empreendimento } from '@/content/empreendimentos'
import { portfolioEmpreendimentos } from '@/content/empreendimentos'
import { office } from '@/content/site'
import { maskPhone, validate, type ContactErrors, type ContactValues } from './validate'

type ContactIntent = 'geral' | 'empreendimentos' | 'clientes'
type ContactPreference = 'email' | 'celular'

const intents: { id: ContactIntent; label: string; description: string; subject: string }[] = [
  { id: 'geral', label: 'Contato geral', description: 'Dúvidas e informações para a equipe.', subject: 'Contato geral' },
  { id: 'empreendimentos', label: 'Interesse em empreendimentos', description: 'Informações sobre os projetos da Tecvale.', subject: 'Interesse em empreendimentos' },
  { id: 'clientes', label: 'Relacionamento com clientes', description: 'Atendimento para clientes Tecvale.', subject: 'Relacionamento com clientes' },
]

const empty: ContactValues = { nome: '', telefone: '', email: '', mensagem: '' }
const fieldCls = (err?: string) =>
  `mt-2 w-full border bg-white px-4 py-3 text-base focus:border-wine ${err ? 'border-wine' : 'border-ink/20'}`

export function ContactForm({ projeto }: { projeto?: Empreendimento }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [intent, setIntent] = useState<ContactIntent>(projeto ? 'empreendimentos' : 'geral')
  const [preferences, setPreferences] = useState<ContactPreference[]>([])
  const [projectSlug, setProjectSlug] = useState(projeto?.slug ?? '')
  const [contactUrl, setContactUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const selectedIntent = intents.find((option) => option.id === intent)!
  const selectedProject = portfolioEmpreendimentos.find((project) => project.slug === projectSlug)

  const set = (key: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const first = (Object.keys(nextErrors) as (keyof ContactValues)[])[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    const message = [
      `Assunto: ${selectedIntent.subject}`,
      selectedProject && `Empreendimento: ${selectedProject.name}`,
      `Preferência de retorno: ${preferences.length ? preferences.map((preference) => preference === 'email' ? 'E-mail' : 'Celular').join(' e ') : 'Sem preferência'}`,
      `Nome: ${values.nome}`,
      `Telefone: ${values.telefone}`,
      `E-mail: ${values.email}`,
      '',
      values.mensagem,
    ].filter((line): line is string => Boolean(line)).join('\n')
    const isSalesContact = intent === 'empreendimentos'
    const url = isSalesContact
      ? `${office.whatsappHref}?text=${encodeURIComponent(message)}`
      : `mailto:${office.email}?subject=${encodeURIComponent(selectedIntent.subject)}&body=${encodeURIComponent(message)}`
    setContactUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => doneRef.current?.focus(), 0)
  }

  if (contactUrl) {
    const channel = intent === 'empreendimentos' ? 'WhatsApp' : 'e-mail'
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="border-t border-wine pt-6 outline-none">
        <h2 className="text-3xl">Sua mensagem está pronta.</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-muted">
          Revise os dados e envie a mensagem pelo {channel}. Nada é transmitido ou armazenado por este site.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={contactUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 cursor-pointer items-center bg-wine px-5 text-sm text-white transition-colors hover:bg-wine-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine"
          >
            {channel === 'WhatsApp' ? 'Abrir conversa no WhatsApp' : 'Abrir e-mail'}
          </a>
          <button
            type="button"
            onClick={() => setContactUrl('')}
            className="cursor-pointer border-b border-ink pb-1 text-sm transition-colors hover:border-wine hover:text-wine"
          >
            Voltar e editar
          </button>
        </div>
      </div>
    )
  }

  const field = (key: keyof ContactValues, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={key} className="text-sm font-medium">{label}</label>
      <input
        id={key}
        name={key}
        value={values[key]}
        onChange={(event) => set(key, key === 'telefone' ? maskPhone(event.target.value) : event.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-erro` : undefined}
        className={fieldCls(errors[key])}
        required
        {...props}
      />
      {errors[key] && <p id={`${key}-erro`} className="mt-1.5 text-sm text-wine">{errors[key]}</p>}
    </div>
  )

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-7">
      <fieldset>
        <legend className="text-sm font-medium">Como podemos ajudar?</legend>
        <div className="mt-3 grid gap-x-6 sm:grid-cols-3">
          {intents.map((option) => (
            <label
              key={option.id}
              className={`cursor-pointer border-t py-4 transition-colors hover:border-wine ${intent === option.id ? 'border-wine' : 'border-ink/20'}`}
            >
              <span className="flex items-start gap-3">
                <input
                  type="radio"
                  name="tipo-contato"
                  value={option.id}
                  checked={intent === option.id}
                  onChange={() => setIntent(option.id)}
                  className="mt-1 accent-wine"
                />
                <span>
                  <span className={`block text-sm font-medium ${intent === option.id ? 'text-wine' : 'text-ink'}`}>
                    {option.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{option.description}</span>
                </span>
              </span>
            </label>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted" aria-live="polite">Assunto: {selectedIntent.subject}</p>
      </fieldset>

      {intent === 'empreendimentos' && (
        <div>
          <label htmlFor="empreendimento" className="text-sm font-medium">Empreendimento de interesse <span className="text-muted">(opcional)</span></label>
          <select
            id="empreendimento"
            name="empreendimento"
            value={projectSlug}
            onChange={(event) => setProjectSlug(event.target.value)}
            className={`${fieldCls()} cursor-pointer`}
          >
            <option value="">Selecione um empreendimento</option>
            {portfolioEmpreendimentos.map((project) => (
              <option key={project.slug} value={project.slug}>{project.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {field('nome', 'Nome completo', { autoComplete: 'name' })}
        {field('telefone', 'Telefone com DDD', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '(12) 99999-9999' })}
        {field('email', 'E-mail', { type: 'email', autoComplete: 'email' })}
        <div className="sm:col-span-2">
          <label htmlFor="mensagem" className="text-sm font-medium">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={5}
            value={values.mensagem}
            onChange={(event) => set('mensagem', event.target.value)}
            aria-invalid={!!errors.mensagem}
            aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
            className={fieldCls(errors.mensagem)}
            placeholder={intent === 'clientes' ? 'Conte como a equipe pode ajudar você.' : 'Escreva sua mensagem.'}
            required
          />
          {errors.mensagem && <p id="mensagem-erro" className="mt-1.5 text-sm text-wine">{errors.mensagem}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="text-base">Como prefere ser contatado?</legend>
        <p className="mt-1 text-sm text-muted">Escolha quantas opções preferir.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {([
            ['email', 'E-mail'],
            ['celular', 'Celular'],
          ] as const).map(([value, label]) => (
            <label key={value} className="inline-flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="preferencia-contato"
                value={value}
                checked={preferences.includes(value)}
                onChange={(event) => setPreferences((current) => event.target.checked
                  ? [...current, value]
                  : current.filter((preference) => preference !== value))}
                className="size-4 cursor-pointer accent-wine"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <button type="submit" className="inline-flex min-h-12 cursor-pointer items-center bg-wine px-5 text-sm text-white transition-colors hover:bg-wine-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine">
          {intent === 'empreendimentos' ? 'Continuar pelo WhatsApp' : 'Continuar por e-mail'}
        </button>
        <p className="mt-3 text-xs text-muted">Você poderá revisar a mensagem antes de enviá-la.</p>
      </div>
    </form>
  )
}
