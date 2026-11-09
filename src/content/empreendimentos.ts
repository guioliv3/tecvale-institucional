// Fonte única de dados dos empreendimentos (carrossel, catálogo e páginas individuais).
// CONTEÚDO DE DEMONSTRAÇÃO: textos, números e imagens provisórios, a substituir por material oficial.

/** Resolve um arquivo de public/images respeitando a base do Vite. */
export const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export type Plan = { name: string; area: string; bedrooms: number; suites: number }
export type Photo = { src: string; alt: string }

export type Empreendimento = {
  slug: string
  name: string
  tagline: string
  /** Descrição breve (carrossel e catálogo) */
  summary: string
  /** Texto de apresentação (página individual) */
  presentation: string[]
  neighborhood: string
  city: string
  status: string
  bedrooms: string
  area: string
  cover: Photo
  /** Fotos de apoio; pode ficar vazio */
  gallery: Photo[]
  /** Plantas; pode ficar vazio */
  plans: Plan[]
  features: { title: string; text: string }[]
  specs: { label: string; value: string }[]
  /** Link oficial da landing, quando existir. Ares usa a página interna por enquanto. */
  externalUrl?: string
}

export const empreendimentos: Empreendimento[] = [
  {
    slug: 'ares-aquarius',
    name: 'Ares Aquarius',
    tagline: 'Viver acima do horizonte',
    summary: 'Torre residencial com lazer completo e vista aberta para a cidade.',
    presentation: [
      'O Ares Aquarius reúne arquitetura contemporânea, plantas generosas e um lazer pensado para o ritmo de quem valoriza tempo e conforto.',
      'Cada pavimento foi desenhado para aproveitar a luz natural e a vista, com acabamentos que dialogam com a paisagem urbana.',
    ],
    neighborhood: 'Aquarius',
    city: 'São José dos Campos, SP',
    status: 'Em construção',
    bedrooms: '3 a 4 dormitórios',
    area: '118 a 186 m²',
    cover: { src: img('ares.jpg'), alt: 'Edifício residencial com piscina ao entardecer (imagem ilustrativa)' },
    gallery: [
      { src: img('fachada-1.jpg'), alt: 'Fachada com vegetação (imagem ilustrativa)' },
      { src: img('sala-1.jpg'), alt: 'Living amplo com grande janela (imagem ilustrativa)' },
      { src: img('concreto.jpg'), alt: 'Detalhe de arquitetura em concreto (imagem ilustrativa)' },
    ],
    plans: [],
    features: [
      { title: 'Lazer no topo', text: 'Piscina, spa e salão de festas com vista panorâmica.' },
      { title: 'Plantas flexíveis', text: 'Ambientes integrados que se adaptam à rotina da família.' },
      { title: 'Segurança 24h', text: 'Controle de acesso e monitoramento integrado.' },
    ],
    specs: [
      { label: 'Torres', value: '1' },
      { label: 'Pavimentos', value: '32' },
      { label: 'Vagas', value: '3 a 4 por unidade' },
      { label: 'Previsão de entrega', value: '2028' },
    ],
  },
  {
    slug: 'neori-residence',
    name: 'Neori Residence',
    tagline: 'Casas com a leveza do jardim',
    summary: 'Residencial de baixa densidade com paisagismo e grandes aberturas.',
    presentation: [
      'O Neori Residence aposta em volumes limpos, vidro e jardins que entram nos ambientes, criando uma relação direta entre morar e respirar.',
      'Do pórtico ao paisagismo, cada detalhe valoriza a escala humana e a privacidade das famílias.',
      'Os espaços de convivência foram distribuídos entre áreas verdes, com percursos de caminhada e áreas de descanso.',
    ],
    neighborhood: 'Jardim Esplanada',
    city: 'São José dos Campos, SP',
    status: 'Lançamento',
    bedrooms: '3 a 4 suítes',
    area: '210 a 320 m²',
    cover: { src: img('neori.jpg'), alt: 'Casa moderna com grandes janelas e gramado (imagem ilustrativa)' },
    gallery: [
      { src: img('casa-1.jpg'), alt: 'Residência com varandas e muitas janelas (imagem ilustrativa)' },
      { src: img('casa-2.jpg'), alt: 'Casa com revestimento em pedra ao anoitecer (imagem ilustrativa)' },
      { src: img('sala-2.jpg'), alt: 'Sala de estar em tons neutros (imagem ilustrativa)' },
      { src: img('sala-3.jpg'), alt: 'Living integrado com janelas amplas (imagem ilustrativa)' },
    ],
    plans: [
      { name: 'Casa Jardim', area: '210 m²', bedrooms: 3, suites: 3 },
      { name: 'Casa Terraço', area: '265 m²', bedrooms: 4, suites: 4 },
      { name: 'Casa Praça', area: '320 m²', bedrooms: 4, suites: 4 },
    ],
    features: [
      { title: 'Paisagismo assinado', text: 'Jardins projetados para florescer em todas as estações.' },
      { title: 'Grandes aberturas', text: 'Esquadrias de piso a teto e ventilação cruzada.' },
      { title: 'Baixa densidade', text: 'Poucas unidades, mais privacidade e silêncio.' },
      { title: 'Espaço gourmet', text: 'Área de convivência integrada ao jardim.' },
    ],
    specs: [
      { label: 'Unidades', value: '24 casas' },
      { label: 'Terreno', value: '18.000 m²' },
      { label: 'Vagas', value: '4 por unidade' },
      { label: 'Previsão de entrega', value: '2027' },
    ],
  },
  {
    slug: 'noah',
    name: 'Noah',
    tagline: 'Natureza em cada ambiente',
    summary: 'Residencial vertical cercado de verde, com terraços e áreas comuns.',
    presentation: [
      'O Noah leva a vegetação para a fachada e para os terraços, criando um refúgio urbano com conforto e discrição.',
    ],
    neighborhood: 'Jardim Apolo',
    city: 'São José dos Campos, SP',
    status: 'Em breve',
    bedrooms: '2 a 3 dormitórios',
    area: '86 a 124 m²',
    cover: { src: img('noah.jpg'), alt: 'Edifício com terraços e plantas (imagem ilustrativa)' },
    gallery: [],
    plans: [],
    features: [],
    specs: [
      { label: 'Previsão de lançamento', value: '2026' },
      { label: 'Vagas', value: '2 por unidade' },
    ],
  },
]

export const getEmpreendimento = (slug: string | undefined) =>
  empreendimentos.find((e) => e.slug === slug)

/** Destino do botão do slide/cartão: página interna, ou landing oficial quando houver. */
export const projectHref = (e: Empreendimento) => e.externalUrl ?? `/empreendimentos/${e.slug}`
