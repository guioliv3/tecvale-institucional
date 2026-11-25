import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { portfolioEmpreendimentos, type Empreendimento } from '@/content/empreendimentos'
import { fetchEmpreendimentoDetalhe, hasSanityPortfolio } from '@/content/empreendimentosSanity'
import { EmpreendimentoDetalhe } from '@/features/empreendimentos/EmpreendimentoDetalhe'
import { ProjectNotFound } from '@/features/empreendimentos/ProjectNotFound'
import { useEmpreendimentos } from '@/features/empreendimentos/useEmpreendimentos'

export function EmpreendimentoPage() {
  const { slug } = useParams()
  const { projects: portfolio, loading } = useEmpreendimentos()
  const [detail, setDetail] = useState<{ slug: string; project?: Empreendimento; error?: boolean } | null>(null)

  useEffect(() => {
    if (!slug) return
    let active = true
    fetchEmpreendimentoDetalhe(slug)
      .then((project) => { if (active) setDetail({ slug, project }) })
      .catch((error: unknown) => {
        console.error('Não foi possível carregar o empreendimento do Sanity.', error)
        if (active) setDetail({ slug, project: portfolioEmpreendimentos.find((item) => item.slug === slug), error: true })
      })
    return () => { active = false }
  }, [slug])

  const projeto = !hasSanityPortfolio && !detail ? portfolio.find((item) => item.slug === slug) : detail?.slug === slug ? detail?.project : undefined
  if (projeto) return <EmpreendimentoDetalhe projeto={projeto} portfolio={portfolio} />
  if (loading || (slug && detail?.slug !== slug)) return <p className="frame-x py-20 text-sm text-muted" role="status">Carregando empreendimento…</p>
  if (detail?.error) return <p className="frame-x py-20 text-sm text-muted" role="alert">Não foi possível carregar este empreendimento. Tente atualizar a página.</p>
  return <ProjectNotFound />
}
