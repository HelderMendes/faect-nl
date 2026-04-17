import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'
import {seoFields} from './shared/seoFields'

export default defineType({
  name: 'vacature',
  title: 'Vacature',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Functietitel',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'published',
      title: 'Gepubliceerd',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'location',
      title: 'Locatie',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'employmentType',
      title: 'Dienstverband',
      type: 'string',
      options: {
        list: [
          {title: 'Fulltime', value: 'fulltime'},
          {title: 'Parttime', value: 'parttime'},
          {title: 'Freelance', value: 'freelance'},
        ],
        layout: 'radio',
      },
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Korte omschrijving',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Vacaturetekst',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      published: 'published',
    },
    prepare({title, slug, published}) {
      return {
        title,
        subtitle: `${published ? 'Gepubliceerd' : 'Concept'} · /vacatures/${slug ?? ''}`,
      }
    },
  },
})
