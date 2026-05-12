import {defineField, defineType, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'blockTeamGrid',
  title: 'Team Grid',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Eyebrow Label',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'teamMember'}],
        }),
      ],
      description: 'Select which team members to display. Leave empty to show all.',
    }),
    defineField({
      name: 'showAll',
      title: 'Show All Team Members',
      type: 'boolean',
      initialValue: true,
      description: 'If checked, displays all team members regardless of selection above',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      initialValue: 3,
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
        ],
      },
    }),
    defineField({
      name: 'showBio',
      title: 'Show Biography',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showContact',
      title: 'Show Contact Info',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      showAll: 'showAll',
      members: 'members',
    },
    prepare({title, showAll, members}) {
      const count = members?.length || 0
      return {
        title: title || 'Team Grid',
        subtitle: showAll
          ? 'Showing all members'
          : `${count} selected member${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
