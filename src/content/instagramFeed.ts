export type InstagramFeedPost = {
  id: string
  project: string
  imageUrl: string
  imageAlt: string
  caption: string
  isMock: boolean
}

/** Conteúdo visual de demonstração; substituir pela resposta do Worker conectado à Meta. */
export const mockInstagramFeedPosts: InstagramFeedPost[] = [
  {
    id: 'neori-jardim-aquarius',
    project: 'Neori Jardim Aquarius',
    imageUrl: '/images/neori-interior-option.jpg',
    imageAlt: 'Living decorado do Neori Jardim Aquarius',
    caption: 'Uma prévia visual de um dos projetos da Tecvale.',
    isMock: true,
  },
  {
    id: 'ares-aquarius',
    project: 'Ares Aquarius',
    imageUrl: '/images/ares.jpg',
    imageAlt: 'Imagem de divulgação do Ares Aquarius',
    caption: 'Um novo endereço no Jardim Aquarius.',
    isMock: true,
  },
  {
    id: 'noah-residence',
    project: 'Noah Residence',
    imageUrl: '/images/noah-residence.jpg',
    imageAlt: 'Apartamento decorado do Noah Residence',
    caption: 'Interiores, arquitetura e escolhas que dão forma ao projeto.',
    isMock: true,
  },
  {
    id: 'believe-residence',
    project: 'Believe Residence',
    imageUrl: '/images/believe-residence.jpg',
    imageAlt: 'Fachada do Believe Residence',
    caption: 'Um registro do empreendimento no Jardim Ismênia.',
    isMock: true,
  },
]
