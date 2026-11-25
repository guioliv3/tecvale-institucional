import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ptBRLocale } from '@sanity/locale-pt-br'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'tecvale',
  title: 'Tecvale | Empreendimentos',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structureTool(), ptBRLocale()],

  schema: { types: schemaTypes },
})
