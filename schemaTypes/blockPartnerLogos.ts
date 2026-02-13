import {defineField, defineType, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'blockPartnerLogos',
  title: 'Partner Logos',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'partner'}],
        }),
      ],
      description: 'Select which partners to display. Leave empty to show all.',
    }),
    defineField({
      name: 'showAll',
      title: 'Show All Partners',
      type: 'boolean',
      initialValue: true,
      description: 'If checked, displays all partners regardless of selection above',
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      initialValue: 'grid',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Logo Slider', value: 'slider'},
          {title: 'Cards with Description', value: 'cards'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'showDescription',
      title: 'Show Partner Descriptions',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.displayMode !== 'cards',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      displayMode: 'displayMode',
    },
    prepare({title, displayMode}) {
      return {
        title: title || 'Partner Logos',
        subtitle: `Display: ${displayMode || 'grid'}`,
      }
    },
  },
})
