import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { CatalogoPage } from '@/pages/CatalogoPage'
import { EmpreendimentoPage } from '@/pages/EmpreendimentoPage'
import { SobrePage } from '@/pages/SobrePage'
import { ContatoPage } from '@/pages/ContatoPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'empreendimentos', Component: CatalogoPage },
      { path: 'empreendimentos/:slug', Component: EmpreendimentoPage },
      { path: 'sobre', Component: SobrePage },
      { path: 'contato', Component: ContatoPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
