import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import type { Empreendimento } from '@/content/empreendimentos'
import { maskPhone, validate, type ContactErrors, type ContactValues } from './validate'

const empty: ContactValues = { nome: '', telefone: '', email: '', mensagem: '' }
const fieldCls = (err?: string) =>
  `mt-2 w-full border bg-white px-4 py-3 text-base ${err ? 'border-wine' : 'border-ink/20'}`

export function ContactForm({ projeto }: { projeto?: Empreendimento }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)

  const set = (k: keyof ContactValues, v: string) => {
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    const first = (Object.keys(errs) as (keyof ContactValues)[])[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setSent(true)
    setTimeout(() => doneRef.current?.focus(), 0)
  }

  if (sent) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="border border-wine/30 bg-white p-8 outline-none">
        <h2 className="text-3xl">Mensagem simulada</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Este é um site de demonstração: nenhuma mensagem foi enviada de verdade e nenhum dado foi armazenado.
          {projeto ? ` Interesse registrado na tela: ${projeto.name}.` : ''}
        </p>
        <button
          type="button"
          onClick={() => { setValues(empty); setSent(false) }}
          className="mt-6 border-b border-ink pb-1 text-xs font-medium uppercase tracking-[0.16em] hover:text-wine"
        >
          Preencher novamente
        </button>
      </div>
    )
  }

  const field = (k: keyof ContactValues, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={k} className="text-sm font-medium">{label}</label>
      <input
        id={k}
        name={k}
        value={values[k]}
        onChange={(e) => set(k, k === 'telefone' ? maskPhone(e.target.value) : e.target.value)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${k}-erro` : undefined}
        className={fieldCls(errors[k])}
        {...props}
      />
      {errors[k] && <p id={`${k}-erro`} className="mt-1.5 text-sm text-wine">{errors[k]}</p>}
    </div>
  )

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {projeto && (
        <div className="bg-surface px-4 py-3 text-sm">
          Empreendimento de interesse: <strong className="font-medium">{projeto.name}</strong>{' '}
          <Link to="/contato" className="ml-2 underline underline-offset-4 hover:text-wine">remover</Link>
        </div>
      )}
      {field('nome', 'Nome completo', { autoComplete: 'name' })}
      {field('telefone', 'Telefone com DDD', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '(12) 99999-9999' })}
      {field('email', 'E-mail', { type: 'email', autoComplete: 'email' })}
      <div>
        <label htmlFor="mensagem" className="text-sm font-medium">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          value={values.mensagem}
          onChange={(e) => set('mensagem', e.target.value)}
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
          className={fieldCls(errors.mensagem)}
        />
        {errors.mensagem && <p id="mensagem-erro" className="mt-1.5 text-sm text-wine">{errors.mensagem}</p>}
      </div>
      <button type="submit" className="h-[42px] bg-wine px-4 text-[13px] text-white hover:bg-wine-dark">
        Enviar (simulado)
      </button>
      <p className="text-xs text-muted">O envio é simulado: nada é transmitido ou armazenado.</p>
    </form>
  )
}
