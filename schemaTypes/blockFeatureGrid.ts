import {defineField, defineType} from 'sanity'
import {sectionSettings} from './shared/sectionSettings'

export default defineType({
  name: 'blockFeatureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
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
            defineField({name: 'description', type: 'text', rows: 3, title: 'Description'}),
            defineField({name: 'icon', type: 'image', title: 'Icon (Optional)'}),
          ],
        },
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
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Feature Grid',
        subtitle: 'Grid of features',
      }
    },
  },
})
