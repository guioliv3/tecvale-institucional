import { ButtonLink } from '@/components/ui/ButtonLink'

export function NotFoundPage() {
  return (
    <section className="frame-x mx-auto max-w-3xl py-24 text-center">
      <h1 className="text-5xl">Página não encontrada</h1>
      <p className="mt-4 text-muted">O endereço acessado não existe.</p>
      <ButtonLink to="/" className="mt-8">Voltar ao início</ButtonLink>
    </section>
  )
}
