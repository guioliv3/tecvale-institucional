import { useEffect, useState } from 'react'
import { portfolioEmpreendimentos, type Empreendimento } from '@/content/empreendimentos'
import { fetchPortfolioEmpreendimentos, hasSanityPortfolio } from '@/content/empreendimentosSanity'

export function useEmpreendimentos(enabled = true) {
  const [projects, setProjects] = useState<Empreendimento[]>(portfolioEmpreendimentos)
  const [loading, setLoading] = useState(enabled && hasSanityPortfolio)

  useEffect(() => {
    if (!enabled) return
    let active = true
    fetchPortfolioEmpreendimentos()
      .then((loadedProjects) => {
        if (active) setProjects(loadedProjects)
      })
      .catch((error: unknown) => {
        console.error('Não foi possível carregar os empreendimentos do Sanity.', error)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [enabled])

  return { projects, loading }
}
