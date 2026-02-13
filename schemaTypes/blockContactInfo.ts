import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'blockContactInfo',
  title: 'Contact Info',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Introductory Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'useGlobalSettings',
      title: 'Use Global Contact Info',
      type: 'boolean',
      initialValue: true,
      description: 'If checked, uses contact info from Site Settings. Otherwise, enter custom values below.',
    }),
    defineField({
      name: 'customAddress',
      title: 'Address',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.useGlobalSettings === true,
    }),
    defineField({
      name: 'customPhone',
      title: 'Phone',
      type: 'string',
      hidden: ({parent}) => parent?.useGlobalSettings === true,
    }),
    defineField({
      name: 'customEmail',
      title: 'Email',
      type: 'string',
      hidden: ({parent}) => parent?.useGlobalSettings === true,
    }),
    defineField({
      name: 'showMap',
      title: 'Show Map',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Get this from Google Maps > Share > Embed',
      hidden: ({parent}) => !parent?.showMap,
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      useGlobal: 'useGlobalSettings',
    },
    prepare({title, useGlobal}) {
      return {
        title: title || 'Contact Info',
        subtitle: useGlobal ? 'Using global settings' : 'Custom contact info',
      }
    },
  },
})
