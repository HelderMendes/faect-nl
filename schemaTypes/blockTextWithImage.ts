import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'blockTextWithImage',
  title: 'Text with Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'side',
      options: {
        list: [
          {title: 'Side by side (image + text)', value: 'side'},
          {title: 'Centered (stacked)', value: 'centered'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'headerTitle',
      title: 'Eyebrow Label',
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
          {title: 'Center (stacked)', value: 'center'},
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
      subtitle: 'layout',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Text with Image',
        subtitle: subtitle === 'centered' ? 'Centered layout' : 'Side by side layout',
        media,
      }
    },
  },
})
