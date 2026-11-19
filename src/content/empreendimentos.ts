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
  name: string
  tagline: string
  summary: string
  presentation: string[]
  neighborhood: string
  city: string
  address?: string
  locationContext?: string
  mapUrl?: string
  status: 'Lançamento' | 'Em obras' | 'Entregue'
  bedrooms: string
  area: string
  parking?: string
  areaLabel?: string
  deliveryDate?: string
  progress?: ProjectProgress
  cover: Photo
  gallery: Photo[]
  featuresImage?: Photo
  plans: Plan[]
  features: { title: string; text: string }[]
  specs: { label: string; value: string }[]
  relatedSlugs?: string[]
}

export const empreendimentos: Empreendimento[] = [
  {
    slug: 'neori-residence',
    name: 'Neori Jardim Aquarius',
    tagline: 'Apartamentos de 3 dormitórios no Jardim Aquarius.',
    summary: 'Apartamentos de 3 dormitórios, com 86,6 m², suíte com sacada, varanda gourmet, 2 vagas e hobby box.',
    presentation: [
      'O Neori Jardim Aquarius reúne 52 apartamentos em torre única. As unidades têm 3 dormitórios, suíte com sacada, varanda gourmet, 2 vagas e hobby box.',
      'O lazer será entregue equipado e decorado. O projeto também prevê coworking e dois elevadores com energia regenerativa e acesso por senha e reconhecimento facial.',
    ],
    neighborhood: 'Jardim Aquarius',
    city: 'São José dos Campos, SP',
    parking: '2 por unidade',
    status: 'Em obras',
    bedrooms: '3 dormitórios',
    area: '86,6 m²',
    cover: { src: img('neori-interior-option.jpg'), alt: 'Living do Neori Jardim Aquarius, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [
      { title: 'Varanda gourmet', text: 'Guarda-corpo em vidro e suíte com sacada.' },
      { title: 'Coworking', text: 'Espaço de trabalho integrado às áreas comuns.' },
      { title: 'Acesso e elevadores', text: 'Dois elevadores com energia regenerativa; acesso por senha e reconhecimento facial.' },
      { title: 'Lazer equipado', text: 'Áreas comuns entregues equipadas e decoradas.' },
    ],
    specs: [
      { label: 'Unidades', value: '52 apartamentos' },
      { label: 'Vagas', value: '2 por unidade' },
      { label: 'Hobby box', value: 'Incluído' },
    ],
  },
  {
    slug: 'noah',
    name: 'Noah Residence',
    tagline: 'Morar perto de tudo, na Vila Adyanna.',
    summary: 'Apartamentos de 2 dormitórios, a partir de 76 m², com suíte e varanda gourmet, no coração da Vila Adyanna.',
    presentation: [
      'Noah Residence fica na Vila Adyanna, perto dos parques Vicentina Aranha e Santos Dumont, do Tênis Clube e de serviços nas avenidas Adhemar de Barros, Nove de Julho, São João e Anchieta.',
      'Os apartamentos têm 2 dormitórios, suíte com sacada, varanda gourmet e área a partir de 76 m². O projeto tem lazer equipado e decorado, coworking, elevador com energia regenerativa e infraestrutura elétrica para carregamento de veículo em uma vaga por unidade.',
    ],
    neighborhood: 'Vila Adyanna',
    city: 'São José dos Campos, SP',
    locationContext: 'Próximo aos parques Vicentina Aranha e Santos Dumont, ao Tênis Clube e aos serviços das avenidas Adhemar de Barros, Nove de Julho, São João e Anchieta.',
    parking: '1 vaga privativa por apartamento',
    status: 'Em obras',
    bedrooms: '2 dormitórios, 1 suíte',
    area: 'A partir de 76 m²',
    cover: { src: img('noah-residence.jpg'), alt: 'Apartamento decorado do Noah Residence, imagem do site oficial da Tecvale' },
    gallery: [],
    plans: [],
    features: [
      { title: 'Varanda gourmet', text: 'Varanda com ponto para TV e suíte com sacada.' },
      { title: 'Lazer', text: 'Áreas comuns equipadas e decoradas, com piscinas, coworking e espaço fitness.' },
      { title: 'Mobilidade elétrica', text: 'Previsão elétrica para tomada doméstica em uma vaga por apartamento.' },
      { title: 'Acesso', text: 'Elevador com energia regenerativa, senha e reconhecimento facial.' },
    ],
    specs: [
      { label: 'Vagas', value: '1 vaga privativa por apartamento' },
      { label: 'Pé-direito', value: '2,70 m (2,50 m em áreas com sanca ou forro)' },
    ],
  },
]

const empreendimentosLancamentos: Empreendimento[] = [
  {
    slug: 'ares-aquarius',
    name: 'Ares Aquarius',
    tagline: 'Apartamentos de 3 dormitórios, com lazer em dois pavimentos.',
    summary: '60 apartamentos em torre única, com 1 suíte, 2 vagas e plantas de 102,14 m² e 105,82 m².',
    presentation: [
      'No endereço Rua Itajaí, 30, no Jardim Aquarius, em São José dos Campos, o Ares Aquarius reúne 60 apartamentos em torre única. São 15 pavimentos residenciais, com quatro unidades por andar.',
      'As duas plantas têm 3 dormitórios, sendo 1 suíte, e 2 vagas de garagem. A opção de 102,14 m² corresponde aos finais 1 e 3; a de 105,82 m², aos finais 2 e 4. Ambas incluem varanda gourmet de 11,38 m² e varanda técnica de 4,18 m², reversível para área de serviço.',
    ],
    neighborhood: 'Jardim Aquarius',
    city: 'São José dos Campos, SP',
    address: 'Rua Itajaí, 30',
    locationContext: 'O entorno reúne referências como Colinas Shopping, Praça Ulisses Guimarães, Oba Hortifruti, Pão de Açúcar e Avenida Cassiano Ricardo.',
    mapUrl: 'https://www.google.com/maps?q=Ares+Aquarius+-+TECVALE,+Rua+Itaja%C3%AD+30,+Jardim+Aquarius,+S%C3%A3o+Jos%C3%A9+dos+Campos&t=k&z=18',
    status: 'Lançamento',
    bedrooms: '3 dormitórios, 1 suíte',
    area: '102,14 m² e 105,82 m²',
    areaLabel: 'Área privativa',
    parking: '2 vagas por unidade',
    cover: { src: img('TEC_ITA_05_FACHADA 03_EF2.jpg'), alt: 'Fachada do Ares Aquarius ao entardecer, em São José dos Campos' },
    gallery: [
      { src: img('ares-mockup-living.png'), alt: 'Mockup ilustrativo de living para o Ares Aquarius' },
      { src: img('ares-mockup-varanda.png'), alt: 'Mockup ilustrativo de varanda para o Ares Aquarius' },
      { src: img('ares-mockup-bedroom.png'), alt: 'Mockup ilustrativo de dormitório para o Ares Aquarius' },
    ],
    featuresImage: { src: img('ares-mockup-lounge.png'), alt: 'Mockup ilustrativo de ambiente comum para o Ares Aquarius' },
    plans: [
      {
        name: '102,14 m² · finais 1 e 3',
        area: '102,14 m²',
        bedrooms: 3,
        suites: 1,
        image: { src: img('ares-planta-102-14.webp'), alt: 'Planta ilustrada do apartamento de 102,14 m², finais 1 e 3' },
        details: [
          '3 dormitórios, sendo 1 suíte',
          'Sala de estar e jantar e cozinha',
          'Lavabo e banheiro social',
          'Varanda técnica de 4,18 m², reversível para área de serviço',
          'Varanda gourmet de 11,38 m²',
          '2 vagas de garagem',
        ],
      },
      {
        name: '105,82 m² · finais 2 e 4',
        area: '105,82 m²',
        bedrooms: 3,
        suites: 1,
        image: { src: img('ares-planta-105-82.webp'), alt: 'Planta ilustrada do apartamento de 105,82 m², finais 2 e 4' },
        details: [
          '3 dormitórios, sendo 1 suíte',
          'Hall de entrada',
          'Sala de estar e jantar e cozinha',
          'Lavabo e banheiro social',
          'Varanda técnica de 4,18 m², reversível para área de serviço',
          'Varanda gourmet de 11,38 m²',
          '2 vagas de garagem',
        ],
      },
    ],
    features: [
      { title: 'Brises móveis', text: 'Os painéis da fachada permitem ajustar a entrada de luz natural e a privacidade na varanda.' },
      { title: 'Praça e conveniência no térreo', text: 'Praça central com cascata, coworking, sala de reunião e videoconferência, espaço para encomendas e pontos de recarga para veículos elétricos.' },
      { title: 'Lazer no 16º pavimento', text: 'Salão de festas com espaço gourmet, dois belvederes, salão de jogos com American Bar e Game Station, Espaço Kids, Pet Place e Pet Care.' },
      { title: 'Lazer no 17º pavimento', text: 'Piscinas climatizadas para adultos e crianças, deck solário, espaço gourmet com churrasqueira, fitness, espaço de estética, Espaço Zen com ofurô, sala de massagem e sauna.' },
    ],
    specs: [
      { label: 'Unidades', value: '60 apartamentos' },
      { label: 'Torre', value: 'Única' },
      { label: 'Pavimentos residenciais', value: '15' },
      { label: 'Unidades por andar', value: '4' },
      { label: 'Tipologia', value: '3 dormitórios, 1 suíte' },
      { label: 'Vagas', value: '2 por unidade' },
      { label: 'Varanda gourmet', value: '11,38 m²' },
      { label: 'Varanda técnica', value: '4,18 m², reversível para área de serviço' },
    ],
  },
]

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

export const portfolioEmpreendimentos = [...empreendimentos, ...empreendimentosLancamentos, ...empreendimentosEntregues]

export const getEmpreendimento = (slug: string | undefined) =>
  portfolioEmpreendimentos.find((e) => e.slug === slug)

/** Destino do botão do slide/cartão. */
export const projectHref = (e: Empreendimento) => `/empreendimentos/${e.slug}`
