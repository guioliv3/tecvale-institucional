import { ALL_FIELDS_GROUP, defineArrayMember, defineField, defineType } from 'sanity'

const projectImage = (name: string, title: string, description: string, required = false, altRequired = required, hero = false) =>
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
    validation: (rule) => hero ? [
      rule.required(),
      rule.custom((value) => {
        const dimensions = value?.asset?._ref?.match(/-(\d+)x(\d+)-/)
        if (!dimensions) return true
        return Math.min(Number(dimensions[1]), Number(dimensions[2])) >= 1600
          || 'Para manter a nitidez no hero, use uma imagem com pelo menos 1600 px no lado menor.'
      }).warning(),
    ] : (required ? rule.required() : rule),
  })

const plan = defineType({
  name: 'projectPlan',
  title: 'Planta',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Nome da tipologia', description: 'Nome usado nas abas da seção Plantas e tipologias. Até 45 caracteres.', placeholder: 'Ex.: 3 dormitórios · finais 1 e 3', type: 'string', validation: (rule) => rule.required().max(45) }),
    defineField({ name: 'area', title: 'Área', description: 'Área desta planta, com unidade de medida. Até 30 caracteres.', placeholder: 'Ex.: 102,14 m²', type: 'string', validation: (rule) => rule.required().max(30) }),
    defineField({ name: 'bedrooms', title: 'Dormitórios', description: 'Quantidade de dormitórios desta planta. Digite apenas o número.', type: 'number', validation: (rule) => rule.required().min(0) }),
    defineField({ name: 'suites', title: 'Suítes', description: 'Quantidade de suítes desta planta. Digite apenas o número.', type: 'number', validation: (rule) => rule.required().min(0) }),
    projectImage('image', 'Imagem da planta', 'Planta exibida ao selecionar esta tipologia na página do empreendimento.'),
    defineField({
      name: 'details',
      title: 'Detalhes',
      description: 'Informações adicionais mostradas abaixo dos dados da planta. Adicione uma por item.',
      type: 'array',
      of: [defineArrayMember({ type: 'string', title: 'Detalhe da planta', placeholder: 'Ex.: Varanda gourmet integrada à sala.', validation: (rule) => rule.max(110) })],
    }),
  ],
})

const feature = defineType({
  name: 'projectFeature',
  title: 'Diferencial',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Título', description: 'Nome do diferencial exibido na seção Diferenciais e lazer. Ideal: até 30 caracteres; máximo: 40.', placeholder: 'Ex.: Varanda gourmet', type: 'string', validation: (rule) => rule.required().max(40) }),
    defineField({ name: 'text', title: 'Descrição', description: 'Explique brevemente o benefício ou característica. Ideal: até 150 caracteres; máximo: 200.', placeholder: 'Ex.: Espaço integrado à sala para receber amigos e familiares.', type: 'text', rows: 3, validation: (rule) => rule.required().max(200) }),
  ],
})

const specification = defineType({
  name: 'projectSpecification',
  title: 'Item da ficha técnica',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Informação', description: 'Nome da informação exibida na ficha técnica. Até 35 caracteres.', placeholder: 'Ex.: Unidades', type: 'string', validation: (rule) => rule.required().max(35) }),
    defineField({ name: 'value', title: 'Valor', description: 'Dado correspondente à informação acima. Até 80 caracteres.', placeholder: 'Ex.: 52 apartamentos', type: 'string', validation: (rule) => rule.required().max(80) }),
  ],
})

const milestone = defineType({
  name: 'projectMilestone',
  title: 'Etapa da obra',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Etapa', description: 'Nome da fase exibida no acompanhamento da obra. Até 45 caracteres.', placeholder: 'Ex.: Fundação', type: 'string', validation: (rule) => rule.required().max(45) }),
    defineField({ name: 'date', title: 'Data', description: 'Previsão ou período desta etapa, se houver. Até 35 caracteres.', placeholder: 'Ex.: março de 2027', type: 'string', validation: (rule) => rule.max(35) }),
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
    defineField({ name: 'name', title: 'Nome do empreendimento', description: 'Nome exibido no catálogo, no hero e na página individual. Ideal: até 30 caracteres; máximo: 45.', placeholder: 'Ex.: Ares Aquarius', type: 'string', group: 'basic', validation: (rule) => [rule.required().max(45), rule.max(30).warning('Para o hero, prefira um nome com até 30 caracteres.')] }),
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
      description: 'Título da seção Apresentação e dos cards da Home. Ideal: até 60 caracteres; máximo: 85.',
      placeholder: 'Ex.: Apartamentos de 3 dormitórios no Jardim Aquarius.',
      type: 'string',
      group: 'basic',
      validation: (rule) => [rule.required().max(85), rule.max(60).warning('Para manter o título compacto, prefira até 60 caracteres.')],
    }),
    defineField({ name: 'summary', title: 'Resumo do empreendimento', description: 'Aparece no hero, no catálogo e na página individual. No celular, o hero mostra apenas duas linhas. Ideal: até 100 caracteres; máximo: 150.', placeholder: 'Ex.: Apartamentos de 3 dormitórios com varanda gourmet, 2 vagas e lazer equipado.', type: 'text', rows: 3, group: 'basic', validation: (rule) => [rule.required().max(150), rule.max(100).warning('No hero do celular, textos acima de 100 caracteres podem ser cortados.')] }),
    defineField({
      name: 'presentation',
      title: 'Apresentação',
      type: 'array',
      group: 'basic',
      description: 'Texto exibido na seção Apresentação da página individual. Ideal: 120 a 220 caracteres por parágrafo; máximo: 350. Crie cada parágrafo em um item.',
      of: [defineArrayMember({
        type: 'text',
        title: 'Parágrafo da apresentação',
        placeholder: 'Ex.: O empreendimento reúne apartamentos com varanda gourmet e áreas de lazer equipadas.',
        validation: (rule) => rule.max(350),
      })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'neighborhood', title: 'Bairro', description: 'Bairro mostrado no catálogo e na localização da página. Até 40 caracteres.', placeholder: 'Ex.: Jardim Aquarius', type: 'string', group: 'basic', validation: (rule) => rule.required().max(40) }),
    defineField({ name: 'city', title: 'Cidade e estado', description: 'Cidade mostrada no catálogo e na localização da página. Até 50 caracteres.', placeholder: 'Ex.: São José dos Campos, SP', type: 'string', group: 'basic', validation: (rule) => rule.required().max(50) }),
    defineField({ name: 'address', title: 'Endereço (opcional)', description: 'Endereço exibido na seção Localização e usado na busca do mapa. Até 100 caracteres.', placeholder: 'Ex.: Rua Itajaí, 30', type: 'string', group: 'location', validation: (rule) => rule.max(100) }),
    defineField({ name: 'locationContext', title: 'Texto sobre a localização (opcional)', description: 'Descreva os pontos de interesse próximos. Ideal: até 150 caracteres; máximo: 220.', placeholder: 'Ex.: Próximo a parques, escolas e serviços do bairro.', type: 'text', rows: 3, group: 'location', validation: (rule) => rule.max(220) }),
    defineField({ name: 'mapUrl', title: 'Link do mapa (opcional)', description: 'Cole a URL do Google Maps. Sem ela, o site monta o mapa com o endereço cadastrado.', placeholder: 'Ex.: https://maps.google.com/...', type: 'url', group: 'location' }),
    defineField({ name: 'bedrooms', title: 'Tipologia', description: 'Resumo dos dormitórios e suítes exibido no catálogo e na página individual. Até 45 caracteres.', placeholder: 'Ex.: 3 dormitórios, 1 suíte', type: 'string', group: 'details', validation: (rule) => rule.max(45) }),
    defineField({ name: 'area', title: 'Área', description: 'Área resumida exibida no catálogo e nos dados rápidos da página. Até 55 caracteres.', placeholder: 'Ex.: A partir de 86,6 m²', type: 'string', group: 'details', validation: (rule) => rule.max(55) }),
    defineField({ name: 'areaLabel', title: 'Rótulo da área', description: 'Nome que aparece antes da área. Se ficar vazio, o site usa Área privativa. Até 30 caracteres.', placeholder: 'Ex.: Área privativa', type: 'string', group: 'details', validation: (rule) => rule.max(30) }),
    defineField({ name: 'parking', title: 'Vagas', description: 'Quantidade de vagas exibida nos dados rápidos da página. Até 45 caracteres.', placeholder: 'Ex.: 2 por unidade', type: 'string', group: 'details', validation: (rule) => rule.max(45) }),
    defineField({ name: 'deliveryDate', title: 'Entrega ou previsão de entrega (opcional)', description: 'Aparece no catálogo e na seção Etapa. Até 35 caracteres.', placeholder: 'Ex.: março de 2027', type: 'string', group: 'progress', validation: (rule) => rule.max(35) }),
    { ...projectImage('cover', 'Imagem principal', 'Usada no hero, catálogo e cards. Ideal: 2400 × 2400 px (quadrada); mínimo: 1600 px no lado menor. Mantenha o prédio visível nos cortes horizontal e vertical e reserve o canto inferior esquerdo para o texto.', true, true, true), group: 'basic' },
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
    defineField({ name: 'progressSummary', title: 'Resumo do andamento (opcional)', description: 'Estado atual da obra exibido na seção Etapa da página individual. Ideal: até 150 caracteres; máximo: 220.', placeholder: 'Ex.: A estrutura está concluída e as instalações estão em andamento.', type: 'text', rows: 3, group: 'progress', validation: (rule) => rule.max(220) }),
    defineField({ name: 'progressUpdatedAt', title: 'Data da atualização (opcional)', description: 'Data exibida junto ao resumo do andamento para indicar quando ele foi revisado.', type: 'date', group: 'progress' }),
    defineField({ name: 'milestones', title: 'Etapas da obra (opcional)', description: 'Fases exibidas na seção Etapa da página individual. Adicione uma fase por item.', type: 'array', group: 'progress', of: [defineArrayMember({ type: 'projectMilestone', title: 'Etapa da obra' })] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'status', media: 'cover' },
  },
})

export const projectObjectTypes = [plan, feature, specification, milestone]
