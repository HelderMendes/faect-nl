import {defineField, defineType, defineArrayMember} from 'sanity'
import {ActivityIcon} from '@sanity/icons'
import {sectionSettings} from './shared/sectionSettings'

export default defineType({
  name: 'blockProcessSteps',
  title: 'Process Steps',
  type: 'object',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'Small label above the heading (e.g. "Implementatiebenadering")',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content (Rich Text)',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'introImage',
      title: 'Intro Image (Optional)',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional image shown in the left column below the intro text.',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(2).max(10),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'horizontal',
      options: {
        list: [
          {title: 'Horizontal Timeline', value: 'horizontal'},
          {title: 'Vertical Timeline', value: 'vertical'},
          {title: 'Numbered List', value: 'numbered'},
          {title: 'Numbered Cards Grid', value: 'cards'},
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
      steps: 'steps',
    },
    prepare({title, steps}) {
      const count = steps?.length || 0
      return {
        title: title || 'Process Steps',
        subtitle: `${count} step${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
