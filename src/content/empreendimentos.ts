// Dados dos projetos em obras para a Home e do portfólio completo para o catálogo.

/** Resolve um arquivo de public/images respeitando a base do Vite. */
export const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export type Photo = { src: string; alt: string }
export type Plan = {
  name: string
  area: string
  bedrooms: number
  suites: number
  image?: Photo
  details?: string[]
}
export type ProjectMilestone = {
  title: string
  date?: string
  status: 'Concluída' | 'Em andamento' | 'Prevista'
}
export type ProjectProgress = {
  summary?: string
  updatedAt?: string
  milestones?: ProjectMilestone[]
}

export type Empreendimento = {
  slug: string
  createdAt?: string
  name: string
  tagline: string
  summary: string
  presentation: string[]
  neighborhood: string
  city: string
  address?: string
  locationContext?: string
  mapUrl?: string
  landingPageUrl?: string
  status: 'Lançamento' | 'Em obras' | 'Entregue'
  bedrooms: string
  area: string
  parking?: string
  areaLabel?: string
  deliveryDate?: string
  progress?: ProjectProgress
  cover: Photo
  gallery: Photo[]
  featuresGallery?: Photo[]
  featuresImage?: Photo
  illustrativeMedia?: boolean
  plans: Plan[]
  features: { title: string; text: string }[]
  specs: { label: string; value: string }[]
}

const empreendimentosEntregues: Empreendimento[] = [
  {
    slug: 'believe-residence',
    name: 'Believe Residence',
    tagline: 'Apartamentos de 2 dormitórios no Jardim Ismênia.',
    summary: 'Apartamentos de 2 dormitórios, 1 suíte e varanda gourmet; plantas de 64,60 m² e 66,75 m².',
    presentation: [
      'No Jardim Ismênia, o Believe Residence tem apartamentos de 2 dormitórios, sendo 1 suíte, com plantas de 64,60 m² e 66,75 m².',
      'O projeto inclui varanda gourmet, espaço para home office, ambientes integrados e lazer entregue equipado e decorado.',
    ],
    neighborhood: 'Jardim Ismênia',
    city: 'São José dos Campos, SP',
    status: 'Entregue',
    bedrooms: '2 dormitórios, 1 suíte',
    area: '64,60 m² e 66,75 m²',
    deliveryDate: 'Outubro de 2023',
    cover: { src: img('believe-residence.jpg'), alt: 'Fachada do Believe Residence, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [
      { title: 'Varanda gourmet', text: 'Guarda-corpo em vidro e churrasqueira ecológica.' },
      { title: 'Ambientes integrados', text: 'Sala e cozinha em conceito aberto, com espaço para home office.' },
      { title: 'Lazer', text: 'Espaços comuns entregues equipados e decorados.' },
    ],
    specs: [
      { label: 'Entrega', value: 'Outubro de 2023' },
      { label: 'Tipologias', value: '2 opções de planta' },
    ],
  },
  {
    slug: 'green-life-villa-branca',
    name: 'Green Life Villa Branca',
    tagline: 'Um endereço planejado em Jacareí.',
    summary: '72 apartamentos de 2 dormitórios, 1 suíte e varanda gourmet, com 65 m².',
    presentation: [
      'No bairro planejado Villa Branca, em Jacareí, o Green Life tem 72 apartamentos de 65 m², com 2 dormitórios, sendo 1 suíte, e varanda gourmet.',
      'A área de lazer inclui piscinas, espaço gourmet, fitness, horta e bicicletas compartilhadas. As áreas comuns foram entregues equipadas e decoradas.',
    ],
    neighborhood: 'Villa Branca',
    city: 'Jacareí, SP',
    status: 'Entregue',
    bedrooms: '2 dormitórios, 1 suíte',
    area: '65 m²',
    deliveryDate: 'Agosto de 2021',
    cover: { src: img('green-life-interior-option.jpg'), alt: 'Living decorado do Green Life Villa Branca, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [
      { title: 'Varanda gourmet', text: 'Presente nas 72 unidades do empreendimento.' },
      { title: 'Lazer', text: 'Piscinas adulto e infantil, espaço gourmet, fitness, brinquedoteca e espaço teen.' },
      { title: 'Áreas compartilhadas', text: 'Horta compartilhada e oficina de bicicletas.' },
    ],
    specs: [
      { label: 'Unidades', value: '72 apartamentos' },
      { label: 'Entrega', value: 'Agosto de 2021' },
    ],
  },
  {
    slug: 'antonio-de-vimioso',
    name: 'Residencial Antonio de Vimioso',
    tagline: 'Acesso prático no Jardim Paraíso.',
    summary: 'Empreendimento com varanda gourmet, torre única, dois elevadores e lazer.',
    presentation: [
      'O Residencial Antonio de Vimioso fica no Jardim Paraíso, a uma quadra do Shopping Oriente e do supermercado Shibata.',
      'O projeto tem torre única, dois elevadores, varanda gourmet e áreas comuns equipadas e decoradas. Foi entregue quatro meses antes do prazo informado pela Tecvale.',
    ],
    neighborhood: 'Jardim Paraíso',
    city: 'São José dos Campos, SP',
    locationContext: 'A uma quadra do Shopping Oriente e do supermercado Shibata.',
    status: 'Entregue',
    bedrooms: 'Apartamentos',
    area: '',
    deliveryDate: 'Maio de 2019',
    cover: { src: img('antonio-de-vimioso.jpg'), alt: 'Fachada do Residencial Antonio de Vimioso, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [
      { title: 'Varanda gourmet', text: 'Unidades com varanda gourmet.' },
      { title: 'Torre única', text: 'Dois elevadores e áreas comuns equipadas e decoradas.' },
      { title: 'Lazer', text: 'Salão de festas, espaço gourmet, Kids & Teens e playground.' },
    ],
    specs: [{ label: 'Entrega', value: 'Maio de 2019' }],
  },
  {
    slug: 'maison-soraya',
    name: 'Maison Soraya',
    tagline: 'Apartamentos com varanda gourmet.',
    summary: '28 apartamentos de 2 dormitórios, 1 suíte, entre 61,81 m² e 64,26 m².',
    presentation: [
      'O Maison Soraya tem 28 apartamentos em uma torre de oito pavimentos. As unidades variam de 61,81 m² a 64,26 m², com 2 dormitórios, 1 suíte e sacada gourmet.',
      'A página oficial informa integração entre sala, cozinha e varanda gourmet, além de torneiras e vasos sanitários com sistema ecológico.',
    ],
    neighborhood: '',
    city: '',
    status: 'Entregue',
    bedrooms: '2 dormitórios, 1 suíte',
    area: '61,81 m² a 64,26 m²',
    deliveryDate: 'Setembro de 2017',
    cover: { src: img('maison-soraya.jpg'), alt: 'Fachada do Maison Soraya, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [
      { title: 'Varanda gourmet', text: 'Sala, cozinha e varanda gourmet integradas.' },
      { title: 'Plantas', text: '28 apartamentos com 2 dormitórios e 1 suíte.' },
      { title: 'Consumo consciente', text: 'Torneiras e vasos sanitários com sistema ecológico.' },
    ],
    specs: [
      { label: 'Unidades', value: '28 apartamentos' },
      { label: 'Pavimentos', value: '8' },
      { label: 'Área construída', value: '2.169 m²' },
      { label: 'Entrega', value: 'Setembro de 2017' },
    ],
  },
  {
    slug: 'residencial-johanna',
    name: 'Residencial Johanna',
    tagline: 'Apartamentos com suíte em Jacareí.',
    summary: 'Apartamentos de 66 m² com suíte, sacada e elevador, no Jardim Califórnia.',
    presentation: [
      'No Jardim Califórnia, em Jacareí, o Residencial Johanna oferece apartamentos de 66 m² com suíte, sacada e elevador.',
    ],
    neighborhood: 'Jardim Califórnia',
    city: 'Jacareí, SP',
    status: 'Entregue',
    bedrooms: 'Apartamentos com suíte',
    area: '66 m²',
    deliveryDate: 'Setembro de 2014',
    cover: { src: img('residencial-johanna.jpg'), alt: 'Fachada do Residencial Johanna, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [
      { title: 'Unidades', text: 'Apartamentos de 66 m² com suíte.' },
      { title: 'Conforto', text: 'Sacada, elevador e pé-direito de 2,8 m.' },
    ],
    specs: [
      { label: 'Área total do terreno', value: '1.775 m²' },
      { label: 'Entrega', value: 'Setembro de 2014' },
    ],
  },
  {
    slug: 'condominio-mirante-do-vale',
    name: 'Condomínio Mirante do Vale',
    tagline: 'Residência no Condomínio Mirante do Vale.',
    summary: 'Residência no Condomínio Mirante do Vale, em Jacareí. Terreno de 1.000 m² e área construída de 500 m². Entregue em agosto de 2012.',
    presentation: [
      'A Tecvale informa a localização no Condomínio Mirante do Vale, em Jacareí, com terreno de 1.000 m² e 500 m² de área construída.',
    ],
    neighborhood: 'Condomínio Mirante do Vale',
    city: 'Jacareí, SP',
    status: 'Entregue',
    bedrooms: '',
    area: '500 m² construídos',
    areaLabel: 'Área construída',
    deliveryDate: 'Agosto de 2012',
    cover: { src: img('condominio-mirante-do-vale.png'), alt: 'Residência no Condomínio Mirante do Vale, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [],
    specs: [
      { label: 'Área total do terreno', value: '1.000 m²' },
      { label: 'Área construída', value: '500 m²' },
      { label: 'Entrega', value: 'Agosto de 2012' },
    ],
  },
  {
    slug: 'mirante-do-vale',
    name: 'Mirante do Vale',
    tagline: 'Residência no Condomínio Mirante do Vale.',
    summary: 'Residência no Condomínio Mirante do Vale, em Jacareí. Terreno de 1.000 m² e área construída de 620 m². Entregue em julho de 2009.',
    presentation: [
      'A Tecvale informa a localização no Condomínio Mirante do Vale, em Jacareí, com terreno de 1.000 m² e 620 m² de área construída.',
    ],
    neighborhood: 'Condomínio Mirante do Vale',
    city: 'Jacareí, SP',
    status: 'Entregue',
    bedrooms: '',
    area: '620 m² construídos',
    areaLabel: 'Área construída',
    deliveryDate: 'Julho de 2009',
    cover: { src: img('mirante-do-vale.png'), alt: 'Residência no Condomínio Mirante do Vale, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [],
    specs: [
      { label: 'Área total do terreno', value: '1.000 m²' },
      { label: 'Área construída', value: '620 m²' },
      { label: 'Entrega', value: 'Julho de 2009' },
    ],
  },
]

export const portfolioEmpreendimentos = [...empreendimentosEntregues]

/** Destino do botão do slide/cartão. */
export const projectHref = (e: Empreendimento) => `/empreendimentos/${e.slug}`
