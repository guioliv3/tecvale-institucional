// CONTEÚDO DE DEMONSTRAÇÃO: substituir por textos, números e endereços oficiais.
import { img } from './empreendimentos'

export const nav = [
  { label: 'Início', to: '/' },
  { label: 'Empreendimentos', to: '/empreendimentos' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]

export const stats = [
  { value: '20', label: 'anos de atuação' },
  { value: '4.000', label: 'residências entregues' },
  { value: '35', label: 'obras concluídas' },
  { value: '1,2 mi', label: 'm² construídos' },
]

export const obras = [
  { name: 'Residencial Vale Verde', year: '2019', place: 'São José dos Campos', image: { src: img('casa-2.jpg'), alt: 'Residência com pedra (imagem ilustrativa)' } },
  { name: 'Edifício Solaris', year: '2021', place: 'Jacareí', image: { src: img('concreto.jpg'), alt: 'Edifício em concreto (imagem ilustrativa)' } },
  { name: 'Parque das Acácias', year: '2023', place: 'Taubaté', image: { src: img('fachada-1.jpg'), alt: 'Casa entre árvores (imagem ilustrativa)' } },
]

export const journal = [
  { title: 'Como a luz natural muda a forma de morar', tag: 'Arquitetura', image: { src: img('sala-1.jpg'), alt: 'Sala com grande janela (imagem ilustrativa)' } },
  { title: 'Paisagismo como parte do projeto, não do acabamento', tag: 'Design', image: { src: img('sala-4.jpg'), alt: 'Sala com janela (imagem ilustrativa)' } },
  { title: 'Bastidores da obra: do canteiro à entrega das chaves', tag: 'Obras', image: { src: img('casa-1.jpg'), alt: 'Residência com varandas (imagem ilustrativa)' } },
]

export const office = {
  address: 'Endereço do escritório a confirmar',
  city: 'São José dos Campos, SP',
  email: 'contato@tecvale.example',
  phone: '(12) 0000-0000',
}
