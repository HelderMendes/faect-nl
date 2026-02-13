import {defineField, defineType, defineArrayMember} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons'
import {sectionSettings} from './shared/sectionSettings'

export default defineType({
  name: 'blockStats',
  title: 'Statistics',
  type: 'object',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "150+", "99%", "24/7"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Customers", "Uptime", "Support"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Optional extra detail',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(2).max(6),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'row',
      options: {
        list: [
          {title: 'Row', value: 'row'},
          {title: 'Grid', value: 'grid'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background',
      type: 'string',
      initialValue: 'light',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Accent', value: 'accent'},
        ],
        layout: 'radio',
      },
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
      stats: 'stats',
    },
    prepare({title, stats}) {
      const count = stats?.length || 0
      return {
        title: title || 'Statistics',
        subtitle: `${count} stat${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
