import { ButtonLink } from '@/components/ui/ButtonLink'

export function ProjectNotFound() {
  return (
    <section className="frame-x mx-auto max-w-3xl py-24 text-center">
      <h1 className="text-4xl md:text-5xl">Empreendimento não encontrado</h1>
      <p className="mt-4 text-muted">Não encontramos um projeto com este endereço.</p>
      <ButtonLink to="/empreendimentos" className="mt-8">Voltar ao catálogo</ButtonLink>
    </section>
  )
}
