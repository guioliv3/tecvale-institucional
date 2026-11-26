import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Destaque da página inicial',
  type: 'document',
  fields: [
    defineField({
      name: 'homeHeroProject',
      title: 'Empreendimento em destaque no hero',
      description: 'Escolha o projeto que aparece primeiro no hero da página inicial.',
      type: 'reference',
      to: [{ type: 'empreendimento' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'homeHeroProject.name' },
    prepare: ({ title }) => ({ title: title ?? 'Destaque da página inicial' }),
  },
})
