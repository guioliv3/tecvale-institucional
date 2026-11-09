export type ContactValues = { nome: string; telefone: string; email: string; mensagem: string }
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export function validate(v: ContactValues): ContactErrors {
  const e: ContactErrors = {}
  if (v.nome.trim().split(/\s+/).filter(Boolean).length < 2 || v.nome.trim().length < 5) e.nome = 'Informe seu nome completo.'
  const digits = v.telefone.replace(/\D/g, '')
  if (!/^[1-9]{2}9?\d{8}$/.test(digits)) e.telefone = 'Informe o telefone com DDD, por exemplo (12) 99999-9999.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Informe um e-mail válido.'
  if (v.mensagem.trim().length < 10) e.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  return e
}

/** Máscara (DD) 9XXXX-XXXX */
export function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  const cut = d.length > 10 ? 7 : 6
  return `(${d.slice(0, 2)}) ${d.slice(2, cut)}-${d.slice(cut)}`
}
