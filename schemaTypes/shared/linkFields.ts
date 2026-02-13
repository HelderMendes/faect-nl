import {defineField} from 'sanity'

export const linkFields = [
  defineField({
    name: 'linkType',
    title: 'Link Type',
    type: 'string',
    initialValue: 'internal',
    options: {
      list: [
        {title: 'Internal Page', value: 'internal'},
        {title: 'External URL', value: 'external'},
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'internalLink',
    title: 'Internal Page',
    type: 'reference',
    to: [{type: 'page'}],
    hidden: ({parent}) => parent?.linkType !== 'internal',
  }),
  defineField({
    name: 'externalUrl',
    title: 'External URL',
    type: 'url',
    validation: (rule) =>
      rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
      }),
    hidden: ({parent}) => parent?.linkType !== 'external',
  }),
]

export const linkObject = defineField({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: linkFields,
})
