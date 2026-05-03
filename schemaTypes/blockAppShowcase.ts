import {defineField, defineType, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export default defineType({
  name: 'blockAppShowcase',
  title: 'App Showcase',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'apps',
      title: 'Apps to Display',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'app'}],
        }),
      ],
      description: 'Select which apps to display. Leave empty to show all apps.',
    }),
    defineField({
      name: 'showAll',
      title: 'Show All Apps',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, displays all apps regardless of selection above',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      initialValue: 3,
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
        ],
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'View All Button Text',
      type: 'string',
      description: 'Optional button to view all apps',
    }),
    defineField({
      name: 'ctaLink',
      title: 'View All Button Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      showAll: 'showAll',
      apps: 'apps',
    },
    prepare({showAll, apps}) {
      const count = apps?.length || 0
      return {
        title: 'App Showcase',
        subtitle: showAll ? 'Showing all apps' : `${count} selected app${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
