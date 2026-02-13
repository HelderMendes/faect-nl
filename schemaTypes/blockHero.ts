import {defineField, defineType} from 'sanity'
import {sectionSettings} from './shared/sectionSettings'

export default defineType({
  name: 'blockHero',
  title: 'Hero Section (With Intros)',
  type: 'object',
  fields: [
    defineField({
      name: 'intro01',
      title: 'Intro Block 01',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'intro02',
      title: 'Intro Block 02',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
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
      name: 'settings',
      title: 'Section Settings',
      type: 'sectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero',
        media,
      }
    },
  },
})
