import {defineField, defineType, defineArrayMember} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'
import {sectionSettings} from './shared/sectionSettings'

export default defineType({
  name: 'blockServiceCards',
  title: 'Service Cards',
  type: 'object',
  icon: StackCompactIcon,
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Internal path or external URL',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        }),
      ],
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
      name: 'settings',
      title: 'Section Settings',
      type: 'sectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      services: 'services',
    },
    prepare({title, services}) {
      const count = services?.length || 0
      return {
        title: title || 'Service Cards',
        subtitle: `${count} service${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
