import {defineField, defineType, defineArrayMember} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'
import {sectionSettings} from './shared/sectionSettings'

export default defineType({
  name: 'blockFAQ',
  title: 'FAQ Section',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label (boven heading)',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Veelgestelde vragen',
    }),
    defineField({
      name: 'intro',
      title: 'Intro tekst',
      type: 'text',
      rows: 3,
      description: 'Korte inleidende tekst onder de heading, boven de vragen.',
    }),
    defineField({
      name: 'items',
      title: 'Vragen & Antwoorden',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Vraag',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Antwoord',
              type: 'array',
              of: [{type: 'block'}],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'question'},
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA — Knop tekst',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA — Knop URL',
      type: 'string',
    }),
    defineField({
      name: 'settings',
      title: 'Section Settings',
      type: 'sectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      items: 'items',
    },
    prepare({title, items}) {
      const count = items?.length || 0
      return {
        title: title || 'FAQ Section',
        subtitle: `${count} vraag${count !== 1 ? 'en' : ''}`,
      }
    },
  },
})
