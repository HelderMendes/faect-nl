import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export default defineType({
  name: 'blockRichText',
  title: 'Rich Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading above the content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'maxWidth',
      title: 'Content Width',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Narrow', value: 'narrow'},
          {title: 'Wide', value: 'wide'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Rich Text Block',
        subtitle: 'Text Content',
      }
    },
  },
})
