import { createClient } from '@sanity/client'
import { portfolioEmpreendimentos, type Empreendimento, type Photo, type ProjectMilestone } from './empreendimentos'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

const client = projectId && dataset
  ? createClient({ projectId, dataset, apiVersion: '2025-02-19', useCdn: true })
  : null

export const hasSanityPortfolio = Boolean(client)

const summaryFields = `
  name,
  "slug": slug.current,
  "createdAt": _createdAt,
  tagline,
  summary,
  neighborhood,
  city,
  status,
  bedrooms,
  area,
  parking,
  areaLabel,
  deliveryDate,
  "cover": {"src": cover.asset->url, "alt": cover.alt}
`

const detailFields = `${summaryFields},
  presentation,
  address,
  locationContext,
  mapUrl,
  landingPageUrl,
  "gallery": gallery[]{"src": asset->url, alt},
  "featuresGallery": featuresGallery[]{"src": asset->url, alt},
  "plans": plans[]{name, area, bedrooms, suites, details, "image": {"src": image.asset->url, "alt": image.alt}},
  features[]{title, text},
  specs[]{label, value},
  progressSummary,
  progressUpdatedAt,
  milestones[]{title, date, status}
`

const summaryQuery = `*[_type == "empreendimento" && defined(slug.current)] | order(_createdAt desc) {${summaryFields}}`
const detailQuery = `*[_type == "empreendimento" && slug.current == $slug][0] {${detailFields}}`

type SanityPhoto = { src?: string | null; alt?: string | null } | null
type SanityProject = {
  name?: string
  slug?: string
  createdAt?: string
  tagline?: string
  summary?: string
  presentation?: string[]
  neighborhood?: string
  city?: string
  address?: string
  locationContext?: string
  mapUrl?: string
  landingPageUrl?: string
  status?: string
  bedrooms?: string
  area?: string
  parking?: string
  areaLabel?: string
  deliveryDate?: string
  cover?: SanityPhoto
  gallery?: SanityPhoto[]
  featuresGallery?: SanityPhoto[]
  plans?: { name: string; area: string; bedrooms: number; suites: number; image?: SanityPhoto; details?: string[] }[]
  features?: { title: string; text: string }[]
  specs?: { label: string; value: string }[]
  progressSummary?: string
  progressUpdatedAt?: string
  milestones?: ProjectMilestone[]
}

function photoFromSanity(photo: SanityPhoto | undefined, fallbackAlt = ''): Photo | undefined {
  if (!photo?.src) return undefined
  return { src: photo.src, alt: photo.alt || fallbackAlt }
}

function formatDate(date?: string) {
  if (!date) return undefined
  const parsed = new Date(`${date}T00:00:00`)
  return Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat('pt-BR').format(parsed)
}

function mapProject(project: SanityProject): Empreendimento | undefined {
  const cover = photoFromSanity(project.cover, project.name)
  if (!project.name || !project.slug || !cover || !project.neighborhood || !project.city) return undefined
  if (!['Lançamento', 'Em obras', 'Entregue'].includes(project.status ?? '')) return undefined

  const progress = project.progressSummary || project.progressUpdatedAt || project.milestones?.length
    ? {
        summary: project.progressSummary,
        updatedAt: formatDate(project.progressUpdatedAt),
        milestones: project.milestones ?? [],
      }
    : undefined

  return {
    slug: project.slug,
    createdAt: project.createdAt,
    name: project.name,
    tagline: project.tagline ?? '',
    summary: project.summary ?? '',
    presentation: project.presentation ?? [],
    neighborhood: project.neighborhood,
    city: project.city,
    address: project.address,
    locationContext: project.locationContext,
    mapUrl: project.mapUrl,
    landingPageUrl: project.landingPageUrl,
    status: project.status as Empreendimento['status'],
    bedrooms: project.bedrooms ?? '',
    area: project.area ?? '',
    parking: project.parking,
    areaLabel: project.areaLabel,
    deliveryDate: project.deliveryDate,
    progress,
    cover,
    gallery: (project.gallery ?? []).flatMap((image) => {
      const photo = photoFromSanity(image)
      return photo ? [photo] : []
    }),
    featuresGallery: (project.featuresGallery ?? []).flatMap((image) => {
      const photo = photoFromSanity(image)
      return photo ? [photo] : []
    }),
    plans: (project.plans ?? []).map((plan) => ({
      ...plan,
      image: photoFromSanity(plan.image),
    })),
    features: project.features ?? [],
    specs: project.specs ?? [],
  }
}

let portfolioRequest: Promise<Empreendimento[]> | undefined

export function fetchPortfolioEmpreendimentos(): Promise<Empreendimento[]> {
  if (!client) return Promise.resolve(portfolioEmpreendimentos)

  portfolioRequest ??= loadPortfolio().catch((error: unknown) => {
    portfolioRequest = undefined
    throw error
  })
  return portfolioRequest
}

async function loadPortfolio(): Promise<Empreendimento[]> {
  const records = await client!.fetch<SanityProject[]>(summaryQuery)
  const remoteProjects = records.flatMap((record) => {
    const project = mapProject(record)
    return project ? [project] : []
  })
  if (remoteProjects.length === 0) return portfolioEmpreendimentos

  const projectsBySlug = new Map(portfolioEmpreendimentos.map((project) => [project.slug, project]))
  for (const project of remoteProjects) projectsBySlug.set(project.slug, project)
  return [...projectsBySlug.values()]
}

export async function fetchEmpreendimentoDetalhe(slug: string): Promise<Empreendimento | undefined> {
  const fallback = portfolioEmpreendimentos.find((project) => project.slug === slug)
  if (!client) return fallback
  const record = await client.fetch<SanityProject | null>(detailQuery, { slug })
  return record ? mapProject(record) ?? fallback : fallback
}
