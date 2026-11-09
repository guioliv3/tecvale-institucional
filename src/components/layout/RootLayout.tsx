import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { empreendimentos } from '@/content/empreendimentos'
import { ContactForm } from '@/features/contato/ContactForm'

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Tecvale | Empreendimentos',
    description: 'Conheça os empreendimentos da Tecvale, explore detalhes de cada projeto e fale com nossa equipe.',
  },
  '/empreendimentos': {
    title: 'Empreendimentos | Tecvale',
    description: 'Explore os empreendimentos da Tecvale e encontre informações sobre cada projeto.',
  },
  '/sobre': {
    title: 'Sobre a Tecvale',
    description: 'Conheça a Tecvale e sua atuação em projetos e empreendimentos.',
  },
  '/contato': {
    title: 'Contato | Tecvale',
    description: 'Entre em contato com a equipe da Tecvale para saber mais sobre nossos empreendimentos.',
  },
}

export function RootLayout() {
  const { pathname, search } = useLocation()
  const selectedProject = pathname === '/contato'
    ? empreendimentos.find(({ slug }) => slug === new URLSearchParams(search).get('empreendimento'))
    : undefined
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  useEffect(() => {
    const project = pathname.startsWith('/empreendimentos/')
      ? empreendimentos.find(({ slug }) => pathname.endsWith(`/${slug}`))
      : undefined
    const metadata = project
      ? { title: `${project.name} | Tecvale`, description: project.summary }
      : (pageMetadata[pathname] ?? {
          title: 'Página não encontrada | Tecvale',
          description: 'A página solicitada não foi encontrada.',
        })

    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
  }, [pathname])
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo"><Outlet /></main>
      <section aria-labelledby="footer-contact-title" className="bg-surface py-20 md:py-28">
        <div className="frame-x mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 id="footer-contact-title" className="text-3xl md:text-5xl">Envie uma mensagem</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">Conte como podemos ajudar e fale com a equipe da Tecvale.</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm key={selectedProject?.slug ?? 'geral'} projeto={selectedProject} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
