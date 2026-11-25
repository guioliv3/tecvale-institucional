import { useRef, useState, type FormEvent } from 'react'
import type { Empreendimento } from '@/content/empreendimentos'
import { office } from '@/content/site'
import { useEmpreendimentos } from '@/features/empreendimentos/useEmpreendimentos'
import { maskPhone, validate, type ContactErrors, type ContactValues } from './validate'

type ContactIntent = 'geral' | 'empreendimentos' | 'clientes'
type ContactPreference = 'email' | 'celular'

const intents: { id: ContactIntent; label: string; description: string; subject: string }[] = [
  { id: 'geral', label: 'Contato geral', description: 'Dúvidas e informações para a equipe.', subject: 'Contato geral' },
  { id: 'empreendimentos', label: 'Interesse em empreendimentos', description: 'Informações sobre os projetos da Tecvale.', subject: 'Interesse em empreendimentos' },
  { id: 'clientes', label: 'Relacionamento com clientes', description: 'Atendimento para clientes Tecvale.', subject: 'Relacionamento com clientes' },
]

const empty: ContactValues = { nome: '', telefone: '', email: '', mensagem: '' }
const fieldCls = (err?: string, quick = false) => quick
  ? `mt-1 w-full border-0 border-b bg-transparent px-0 py-2 text-base text-white outline-none focus:border-b-white focus:ring-0 ${err ? 'border-b-2 border-b-white' : 'border-b-white/60'}`
  : `mt-2 w-full border bg-white px-4 py-3 text-base focus:border-wine ${err ? 'border-wine' : 'border-ink/20'}`

export function ContactForm({ projeto, quick = false }: { projeto?: Empreendimento; quick?: boolean }) {
  const { projects: portfolio } = useEmpreendimentos()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [intent, setIntent] = useState<ContactIntent>(projeto ? 'empreendimentos' : 'geral')
  const [preferences, setPreferences] = useState<ContactPreference[]>([])
  const [projectSlug, setProjectSlug] = useState(projeto?.slug ?? '')
  const [contactUrl, setContactUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const selectedIntent = intents.find((option) => option.id === intent)!
  const selectedProject = portfolio.find((project) => project.slug === projectSlug) ?? (projectSlug === projeto?.slug ? projeto : undefined)

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
      <div ref={doneRef} tabIndex={-1} role="status" className={`border-t ${quick ? 'border-white/50 text-white' : 'border-wine'} pt-6 outline-none`}>
        <h2 className="text-3xl">Sua mensagem está pronta.</h2>
        <p className={`mt-3 max-w-xl leading-relaxed ${quick ? 'text-white/80' : 'text-muted'}`}>
          Revise os dados e envie a mensagem pelo {channel}. Nada é transmitido ou armazenado por este site.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={contactUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex min-h-12 cursor-pointer items-center px-5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${quick ? 'bg-white text-wine hover:bg-white/90 focus-visible:outline-white' : 'bg-wine text-white hover:bg-wine-dark focus-visible:outline-wine'}`}
          >
            {channel === 'WhatsApp' ? 'Abrir conversa no WhatsApp' : 'Abrir e-mail'}
          </a>
          <button
            type="button"
            onClick={() => setContactUrl('')}
            className={`inline-flex min-h-11 cursor-pointer items-center border-b px-1 text-sm transition-colors ${quick ? 'border-white/60 text-white hover:border-white' : 'border-ink hover:border-wine hover:text-wine'}`}
          >
            Voltar e editar
          </button>
        </div>
      </div>
    )
  }

  const field = (key: keyof ContactValues, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, wrapperClass = '') => (
    <div className={wrapperClass}>
      <label htmlFor={key} className={`text-sm font-medium ${quick ? 'text-white' : ''}`}>{label}</label>
      <input
        id={key}
        name={key}
        value={values[key]}
        onChange={(event) => set(key, key === 'telefone' ? maskPhone(event.target.value) : event.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-erro` : undefined}
        className={fieldCls(errors[key], quick)}
        required
        {...props}
      />
      {errors[key] && <p id={`${key}-erro`} className="mt-1.5 text-sm text-wine">{errors[key]}</p>}
    </div>
  )

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={quick ? 'space-y-3' : 'space-y-7'}>
      {!quick && <fieldset>
        <legend className="text-sm font-medium">Como podemos ajudar?</legend>
        <div className="mt-3 grid gap-x-6 sm:grid-cols-3">
          {intents.map((option) => (
            <label
              key={option.id}
              className={`min-h-11 cursor-pointer border-t py-4 transition-colors hover:border-wine ${intent === option.id ? 'border-wine' : 'border-ink/20'}`}
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
      </fieldset>}

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
            {portfolio.map((project) => (
              <option key={project.slug} value={project.slug}>{project.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className={`grid gap-y-3 ${quick ? 'sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4' : 'sm:grid-cols-2 sm:gap-6'}`}>
        {field('nome', 'Nome completo', { autoComplete: 'name' })}
        {field('telefone', 'Telefone com DDD', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '(12) 99999-9999' })}
        {field('email', 'E-mail', { type: 'email', autoComplete: 'email' }, quick ? 'sm:col-span-2' : '')}
        <div className="sm:col-span-2">
          <label htmlFor="mensagem" className={`text-sm font-medium ${quick ? 'text-white' : ''}`}>Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={quick ? 2 : 5}
            value={values.mensagem}
            onChange={(event) => set('mensagem', event.target.value)}
            aria-invalid={!!errors.mensagem}
            aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
            className={`${fieldCls(errors.mensagem, quick)} ${quick ? 'resize-none' : ''}`}
            placeholder={intent === 'clientes' ? 'Conte como a equipe pode ajudar você.' : 'Escreva sua mensagem.'}
            required
          />
          {errors.mensagem && <p id="mensagem-erro" className="mt-1.5 text-sm text-wine">{errors.mensagem}</p>}
        </div>
      </div>

      {!quick && <fieldset>
        <legend className="text-base">Como prefere ser contatado?</legend>
        <p className="mt-1 text-sm text-muted">Escolha quantas opções preferir.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {([
            ['email', 'E-mail'],
            ['celular', 'Celular'],
          ] as const).map(([value, label]) => (
            <label key={value} className="inline-flex min-h-11 cursor-pointer items-center gap-3 pr-2 text-sm">
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
      </fieldset>}

      <div className={quick ? 'flex flex-wrap items-center justify-end gap-x-4 gap-y-2' : ''}>
        <button type="submit" className={`inline-flex cursor-pointer items-center gap-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${quick ? 'min-h-11 px-2 text-white hover:text-white/75 focus-visible:outline-white' : 'min-h-12 bg-wine px-5 text-white hover:bg-wine-dark focus-visible:outline-wine'}`}>
          {quick ? 'Enviar' : intent === 'empreendimentos' ? 'Continuar pelo WhatsApp' : 'Continuar por e-mail'}
          {quick && <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="M3 10h13M10 4l6 6-6 6" /></svg>}
        </button>
        <p className={`${quick ? 'w-full text-right text-white/75' : 'mt-3 text-muted'} text-xs`}>Você poderá revisar a mensagem antes de enviá-la.</p>
      </div>
    </form>
  )
}
