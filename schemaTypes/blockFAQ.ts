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
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Veelgestelde vragen',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'sourceType',
      title: 'FAQ Source',
      type: 'string',
      initialValue: 'manual',
      options: {
        list: [
          {title: 'Manual (add items below)', value: 'manual'},
          {title: 'Reference FAQ documents', value: 'reference'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      hidden: ({parent}) => parent?.sourceType !== 'manual',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [{type: 'block'}],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'faqReferences',
      title: 'FAQ References',
      type: 'array',
      hidden: ({parent}) => parent?.sourceType !== 'reference',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'faqItem'}],
        }),
      ],
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
        subtitle: `${count} question${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
