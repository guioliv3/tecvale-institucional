import { ALL_FIELDS_GROUP, defineArrayMember, defineField, defineType } from 'sanity'

const projectImage = (name: string, title: string, description: string, required = false, altRequired = required) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Texto alternativo',
        description: 'Descreva o que aparece na imagem para pessoas que usam leitores de tela.',
        type: 'string',
        validation: (rule) => (altRequired ? rule.required() : rule),
      }),
    ],
    validation: (rule) => (required ? rule.required() : rule),
  })

const plan = defineType({
  name: 'projectPlan',
  title: 'Planta',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Nome da tipologia', description: 'Nome usado nas abas da seção Plantas e tipologias.', placeholder: 'Ex.: 3 dormitórios · finais 1 e 3', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'area', title: 'Área', description: 'Área desta planta, com unidade de medida.', placeholder: 'Ex.: 102,14 m²', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'bedrooms', title: 'Dormitórios', description: 'Quantidade de dormitórios desta planta. Digite apenas o número.', type: 'number', validation: (rule) => rule.required().min(0) }),
    defineField({ name: 'suites', title: 'Suítes', description: 'Quantidade de suítes desta planta. Digite apenas o número.', type: 'number', validation: (rule) => rule.required().min(0) }),
    projectImage('image', 'Imagem da planta', 'Planta exibida ao selecionar esta tipologia na página do empreendimento.'),
    defineField({
      name: 'details',
      title: 'Detalhes',
      description: 'Informações adicionais mostradas abaixo dos dados da planta. Adicione uma por item.',
      type: 'array',
      of: [defineArrayMember({ type: 'string', title: 'Detalhe da planta', placeholder: 'Ex.: Varanda gourmet integrada à sala.' })],
    }),
  ],
})

const feature = defineType({
  name: 'projectFeature',
  title: 'Diferencial',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Título', description: 'Nome do diferencial exibido na seção Diferenciais e lazer.', placeholder: 'Ex.: Varanda gourmet', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'text', title: 'Descrição', description: 'Explique brevemente o benefício ou característica.', placeholder: 'Ex.: Espaço integrado à sala para receber amigos e familiares.', type: 'text', rows: 3, validation: (rule) => rule.required() }),
  ],
})

const specification = defineType({
  name: 'projectSpecification',
  title: 'Item da ficha técnica',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Informação', description: 'Nome da informação exibida na ficha técnica.', placeholder: 'Ex.: Unidades', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'value', title: 'Valor', description: 'Dado correspondente à informação acima.', placeholder: 'Ex.: 52 apartamentos', type: 'string', validation: (rule) => rule.required() }),
  ],
})

const milestone = defineType({
  name: 'projectMilestone',
  title: 'Etapa da obra',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Etapa', description: 'Nome da fase exibida no acompanhamento da obra.', placeholder: 'Ex.: Fundação', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'date', title: 'Data', description: 'Previsão ou período desta etapa, se houver.', placeholder: 'Ex.: março de 2027', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Situação',
      description: 'Escolha o andamento desta etapa específica da obra.',
      type: 'string',
      options: { list: ['Concluída', 'Em andamento', 'Prevista'] },
      validation: (rule) => rule.required(),
    }),
  ],
})

const projectStatus = [
  { title: 'Lançamento', value: 'Lançamento' },
  { title: 'Em obras', value: 'Em obras' },
  { title: 'Entregue', value: 'Entregue' },
]

export const empreendimento = defineType({
  name: 'empreendimento',
  title: 'Empreendimento',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Comece aqui', default: true },
    { name: 'media', title: 'Fotos e plantas' },
    { name: 'details', title: 'Características' },
    { name: 'location', title: 'Localização' },
    { name: 'progress', title: 'Andamento da obra' },
    { ...ALL_FIELDS_GROUP, hidden: true },
  ],
  fields: [
    defineField({ name: 'name', title: 'Nome do empreendimento', description: 'Nome exibido no catálogo, no banner e no título da página individual.', placeholder: 'Ex.: Ares Aquarius', type: 'string', group: 'basic', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Link da página',
      type: 'slug',
      group: 'basic',
      description: 'Endereço da página individual. Depois de preencher o nome, clique em Gerar. Não altere esse link após publicar.',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'landingPageUrl',
      title: 'Landing page do empreendimento (opcional)',
      description: 'Cole o link da landing page específica deste empreendimento. O acesso aparece na seção Apresentação da página individual. Deixe vazio para ocultar o link.',
      placeholder: 'Ex.: https://www.tecvaleconstrutora.com.br/ares-aquarius',
      type: 'url',
      group: 'basic',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'status',
      title: 'Situação do empreendimento',
      description: 'Escolha a situação atual. Ela aparece no catálogo e na página do empreendimento.',
      type: 'string',
      group: 'basic',
      options: { list: projectStatus, layout: 'radio' },
      validation: (rule) => rule.required().custom((value) =>
        projectStatus.some((option) => option.value === value) || 'Escolha Lançamento, Em obras ou Entregue.'),
    }),
    defineField({
      name: 'tagline',
      title: 'Chamada da página',
      description: 'Título da seção Apresentação na página individual.',
      placeholder: 'Ex.: Apartamentos de 3 dormitórios no Jardim Aquarius.',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'summary', title: 'Resumo do empreendimento', description: 'Texto curto exibido no catálogo, no carrossel da Home e na página individual.', placeholder: 'Ex.: Apartamentos de 3 dormitórios com varanda gourmet, 2 vagas e lazer equipado.', type: 'text', rows: 3, group: 'basic', validation: (rule) => rule.required() }),
    defineField({
      name: 'presentation',
      title: 'Apresentação',
      type: 'array',
      group: 'basic',
      description: 'Texto exibido na seção Apresentação da página individual, ao lado da chamada e do resumo. Clique em Adicionar item para criar cada parágrafo.',
      of: [defineArrayMember({
        type: 'text',
        title: 'Parágrafo da apresentação',
        placeholder: 'Ex.: O empreendimento reúne apartamentos com varanda gourmet e áreas de lazer equipadas.',
      })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'neighborhood', title: 'Bairro', description: 'Bairro mostrado no catálogo e na localização da página.', placeholder: 'Ex.: Jardim Aquarius', type: 'string', group: 'basic', validation: (rule) => rule.required() }),
    defineField({ name: 'city', title: 'Cidade e estado', description: 'Cidade mostrada no catálogo e na localização da página.', placeholder: 'Ex.: São José dos Campos, SP', type: 'string', group: 'basic', validation: (rule) => rule.required() }),
    defineField({ name: 'address', title: 'Endereço (opcional)', description: 'Endereço exibido na seção Localização e usado na busca do mapa.', placeholder: 'Ex.: Rua Itajaí, 30', type: 'string', group: 'location' }),
    defineField({ name: 'locationContext', title: 'Texto sobre a localização (opcional)', description: 'Descreva os pontos de interesse próximos; aparece na seção Localização.', placeholder: 'Ex.: Próximo a parques, escolas e serviços do bairro.', type: 'text', rows: 3, group: 'location' }),
    defineField({ name: 'mapUrl', title: 'Link do mapa (opcional)', description: 'Cole a URL do Google Maps. Sem ela, o site monta o mapa com o endereço cadastrado.', placeholder: 'Ex.: https://maps.google.com/...', type: 'url', group: 'location' }),
    defineField({ name: 'bedrooms', title: 'Tipologia', description: 'Resumo dos dormitórios e suítes exibido no catálogo e na página individual.', placeholder: 'Ex.: 3 dormitórios, 1 suíte', type: 'string', group: 'details' }),
    defineField({ name: 'area', title: 'Área', description: 'Área resumida exibida no catálogo e nos dados rápidos da página.', placeholder: 'Ex.: A partir de 86,6 m²', type: 'string', group: 'details' }),
    defineField({ name: 'areaLabel', title: 'Rótulo da área', description: 'Nome que aparece antes da área. Se ficar vazio, o site usa Área privativa.', placeholder: 'Ex.: Área privativa', type: 'string', group: 'details' }),
    defineField({ name: 'parking', title: 'Vagas', description: 'Quantidade de vagas exibida nos dados rápidos da página.', placeholder: 'Ex.: 2 por unidade', type: 'string', group: 'details' }),
    defineField({ name: 'deliveryDate', title: 'Entrega ou previsão de entrega (opcional)', description: 'Aparece no catálogo e na seção Etapa. O rótulo acompanha a situação escolhida.', placeholder: 'Ex.: março de 2027', type: 'string', group: 'progress' }),
    { ...projectImage('cover', 'Imagem principal', 'Foto de capa usada no banner, no catálogo e nos cards. Ajuste o ponto focal para manter o assunto visível em telas diferentes.', true), group: 'basic' },
    defineField({
      name: 'gallery',
      title: 'Fotos da galeria (opcional)',
      description: 'Fotos exibidas na seção Galeria. Para enviar várias de uma vez, selecione os arquivos no computador e arraste todos para este campo. O texto alternativo de cada foto é opcional.',
      type: 'array',
      group: 'media',
      of: [defineArrayMember(projectImage('image', 'Imagem', 'Foto exibida na galeria da página individual.', true, false))],
    }),
    defineField({
      name: 'featuresGallery',
      title: 'Fotos dos diferenciais (opcional)',
      description: 'Imagens exibidas ao lado dos diferenciais e áreas de lazer. Arraste várias fotos para este campo de uma vez; o texto alternativo é opcional.',
      type: 'array',
      group: 'media',
      of: [defineArrayMember(projectImage('image', 'Imagem', 'Foto exibida na galeria dos diferenciais.'))],
    }),
    defineField({ name: 'plans', title: 'Plantas e tipologias (opcional)', description: 'Cada item cria uma opção na seção Plantas e tipologias da página individual.', type: 'array', group: 'media', of: [defineArrayMember({ type: 'projectPlan', title: 'Planta' })] }),
    defineField({ name: 'features', title: 'Diferenciais (opcional)', description: 'Liste os atributos e espaços de lazer exibidos na página individual.', type: 'array', group: 'details', of: [defineArrayMember({ type: 'projectFeature', title: 'Diferencial' })] }),
    defineField({ name: 'specs', title: 'Ficha técnica (opcional)', description: 'Adicione pares de informação e valor exibidos na seção Ficha técnica.', type: 'array', group: 'details', of: [defineArrayMember({ type: 'projectSpecification', title: 'Item da ficha técnica' })] }),
    defineField({ name: 'progressSummary', title: 'Resumo do andamento (opcional)', description: 'Estado atual da obra exibido na seção Etapa da página individual.', placeholder: 'Ex.: A estrutura está concluída e as instalações estão em andamento.', type: 'text', rows: 3, group: 'progress' }),
    defineField({ name: 'progressUpdatedAt', title: 'Data da atualização (opcional)', description: 'Data exibida junto ao resumo do andamento para indicar quando ele foi revisado.', type: 'date', group: 'progress' }),
    defineField({ name: 'milestones', title: 'Etapas da obra (opcional)', description: 'Fases exibidas na seção Etapa da página individual. Adicione uma fase por item.', type: 'array', group: 'progress', of: [defineArrayMember({ type: 'projectMilestone', title: 'Etapa da obra' })] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'status', media: 'cover' },
  },
})

export const projectObjectTypes = [plan, feature, specification, milestone]
