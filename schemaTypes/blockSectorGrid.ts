import {defineField, defineType, defineArrayMember} from 'sanity'
import {DashboardIcon} from '@sanity/icons'

export default defineType({
  name: 'blockSectorGrid',
  title: 'Sector Grid',
  type: 'object',
  icon: DashboardIcon,
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
      name: 'sectors',
      title: 'Sectors',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Sector Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
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
              media: 'icon',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      initialValue: 4,
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
      sectors: 'sectors',
    },
    prepare({title, sectors}) {
      const count = sectors?.length || 0
      return {
        title: title || 'Sector Grid',
        subtitle: `${count} sector${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
