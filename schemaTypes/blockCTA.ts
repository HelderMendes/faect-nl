import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {sectionSettings} from './shared/sectionSettings'

export default defineType({
  name: 'blockCTA',
  title: 'Call to Action',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Supporting Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      description: 'Internal path (e.g., /contact) or external URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundPhotoUrl',
      title: 'Background Photo URL (fallback)',
      type: 'string',
      description: 'Public path fallback when no Sanity image is uploaded (e.g. /team/photo.jpg)',
    }),
    defineField({
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          {title: 'Primary (Dark)', value: 'primary'},
          {title: 'Secondary (Light)', value: 'secondary'},
          {title: 'Accent (Blue)', value: 'accent'},
          {title: 'Transparent', value: 'transparent'},
        ],
        layout: 'radio',
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
      subtitle: 'ctaText',
      media: 'backgroundImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Call to Action',
        subtitle: subtitle ? `Button: ${subtitle}` : 'CTA Section',
        media,
      }
    },
  },
})
