import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'blockTextWithImage',
  title: 'Text with Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
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
      description: 'Internal path (e.g., /contact) or external URL',
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
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Text with Image',
        subtitle: 'Text + Image Section',
        media,
      }
    },
  },
})
