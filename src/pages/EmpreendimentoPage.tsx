import { useParams } from 'react-router'
import { getEmpreendimento } from '@/content/empreendimentos'
import { EmpreendimentoDetalhe } from '@/features/empreendimentos/EmpreendimentoDetalhe'
import { ProjectNotFound } from '@/features/empreendimentos/ProjectNotFound'

export function EmpreendimentoPage() {
  const { slug } = useParams()
  const projeto = getEmpreendimento(slug)
  return projeto ? <EmpreendimentoDetalhe projeto={projeto} /> : <ProjectNotFound />
}
