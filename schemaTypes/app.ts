import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export default defineType({
  name: 'app',
  title: 'Faect App',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'App Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'App Icon',
      type: 'image',
      description: 'Square icon for the app (300x300px recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short value proposition (one line)',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief explanation of the app functionality',
    }),
    defineField({
      name: 'body',
      title: 'Uitgebreide beschrijving',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rijke tekst voor de detail pagina van de app',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of key features/benefits',
    }),
    defineField({
      name: 'appStoreUrl',
      title: 'Microsoft AppSource URL',
      type: 'url',
      description: 'Link naar de app in de Microsoft AppSource store',
    }),
    defineField({
      name: 'factsheet',
      title: 'Factsheet PDF',
      type: 'file',
      description: 'Downloadable PDF with detailed information',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the app appears in lists',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      tagline: 'tagline',
      media: 'icon',
    },
    prepare({title, tagline, media}) {
      return {
        title,
        subtitle: tagline,
        media,
      }
    },
  },
})
