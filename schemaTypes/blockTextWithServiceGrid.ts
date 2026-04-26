import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockTextWithServiceGrid',
  title: 'Text + Service Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'Small uppercase label above the heading (e.g. "Wat Wij Doen")',
    }),
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
      name: 'links',
      title: 'CTA Links',
      description: 'Bordered link buttons shown below the image on the left',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'href', title: 'URL', type: 'string', validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'icon', title: 'Icon', type: 'image'}),
            defineField({name: 'link', title: 'Link URL', type: 'string'}),
            defineField({name: 'linkLabel', title: 'Link Label', type: 'string', description: 'Defaults to "Meer informatie"'}),
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
    select: {title: 'heading', subtitle: 'label'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Text + Service Grid',
        subtitle: subtitle ?? 'Left text/image — Right service grid',
      }
    },
  },
})
