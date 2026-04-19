import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockTextWithServiceGrid',
  title: 'Text + Service Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'services',
      title: 'Services (max 4)',
      type: 'array',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'icon', title: 'Icon', type: 'image'}),
          ],
          preview: {
            select: {title: 'title', media: 'icon'},
          },
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
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Text + Service Grid',
        subtitle: 'Left text/image — Right 2×2 grid',
      }
    },
  },
})
