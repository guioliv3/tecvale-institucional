import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ptBRLocale } from '@sanity/locale-pt-br'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'tecvale',
  title: 'Tecvale | Empreendimentos',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.documentTypeListItem('empreendimento').title('Empreendimentos'),
            S.listItem()
              .title('Destaque da página inicial')
              .id('homeHeroSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Destaque da página inicial'),
              ),
          ]),
    }),
    ptBRLocale(),
  ],

  schema: { types: schemaTypes },
})
