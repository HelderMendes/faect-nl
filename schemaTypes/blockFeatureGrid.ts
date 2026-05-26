import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blockFeatureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'grid',
      options: {
        list: [
          {title: 'Card Grid (default)', value: 'grid'},
          {title: 'Numbered Cards (app-style)', value: 'numbered-cards'},
          {title: 'Icon List (2 columns)', value: 'icon-list-2col'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'Optional subtitle shown below the section title.',
    }),
    defineField({
      name: 'gridCols',
      title: 'Grid Columns',
      type: 'string',
      initialValue: '3',
      description: 'Number of columns in the card grid (used by grid layout only).',
      options: {
        list: [
          {title: '3 columns — lg:grid-cols-3 (default)', value: '3'},
          {title: '4 columns — lg:grid-cols-4', value: '4'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'subtitle', type: 'string', title: 'Subtitle'}),
            defineField({
              name: 'body',
              title: 'Body (rich text)',
              type: 'array',
              of: [{type: 'block'}],
              description:
                'Supports bold, paragraphs, lists. Used in numbered-cards and icon-list layouts.',
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
              title: 'Description (plain, legacy)',
            }),
            defineField({name: 'icon', type: 'image', title: 'Icon (Optional)'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'subtitle'},
          },
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link',
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
      title: 'title',
      layout: 'layout',
    },
    prepare({title, layout}) {
      const layoutLabel =
        layout === 'numbered-cards'
          ? 'Numbered Cards'
          : layout === 'icon-list-2col'
            ? 'Icon List (2 columns)'
            : 'Card Grid'

      return {
        title: title || 'Feature Grid',
        subtitle: layoutLabel,
      }
    },
  },
})
