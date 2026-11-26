import { useEffect, useState } from 'react'
import { portfolioEmpreendimentos, type Empreendimento } from '@/content/empreendimentos'
import { fetchHomeHeroProjectSlug, fetchPortfolioEmpreendimentos, hasSanityPortfolio } from '@/content/empreendimentosSanity'

export function useEmpreendimentos(enabled = true) {
  const [projects, setProjects] = useState<Empreendimento[]>(portfolioEmpreendimentos)
  const [homeHeroProjectSlug, setHomeHeroProjectSlug] = useState<string>()
  const [loading, setLoading] = useState(enabled && hasSanityPortfolio)

  useEffect(() => {
    if (!enabled) return
    let active = true
    fetchPortfolioEmpreendimentos()
      .then((loadedProjects) => {
        if (active) setProjects(loadedProjects)
      })
      .catch((error: unknown) => {
        console.error('Failed to load Sanity projects.', error)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    fetchHomeHeroProjectSlug()
      .then((slug) => {
        if (active) setHomeHeroProjectSlug(slug)
      })
      .catch((error: unknown) => {
        console.error('Failed to load the hero highlight from Sanity.', error)
      })

    return () => {
      active = false
    }
  }, [enabled])

  return { projects, loading, homeHeroProjectSlug }
}
