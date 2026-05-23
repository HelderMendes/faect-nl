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
      name: 'headingSize',
      title: 'Heading Size',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Small  — text-2xl / md:text-3xl', value: 'sm'},
          {title: 'Default — text-3xl / md:text-4xl', value: 'default'},
          {title: 'Large  — text-4xl / md:text-5xl', value: 'lg'},
          {title: 'XL     — text-5xl / md:text-6xl', value: 'xl'},
        ],
        layout: 'radio',
      },
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
      name: 'imageUrl',
      title: 'Image URL (fallback)',
      type: 'string',
      description: 'Public path fallback when no Sanity image is uploaded (e.g. /MicrosoftDynamics-365_BusinessCentral/hero.jpg)',
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
