import type { Empreendimento } from '@/content/empreendimentos'

const statusOrder: Record<Empreendimento['status'], number> = {
  'Lançamento': 0,
  'Em obras': 1,
  'Entregue': 2,
}

export function orderHomeProjects(projects: Empreendimento[]) {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) =>
      statusOrder[a.project.status] - statusOrder[b.project.status]
      || (b.project.createdAt ?? '').localeCompare(a.project.createdAt ?? '')
      || a.index - b.index,
    )
    .map(({ project }) => project)
}
