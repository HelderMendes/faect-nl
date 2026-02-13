import {defineField, defineType, defineArrayMember} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: 'blockCaseStudyGrid',
  title: 'Case Study Grid',
  type: 'object',
  icon: CaseIcon,
  fields: [
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
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'caseStudy'}],
        }),
      ],
      description: 'Select which case studies to display. Leave empty to show recent ones.',
    }),
    defineField({
      name: 'showAll',
      title: 'Show All Case Studies',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, displays all case studies',
    }),
    defineField({
      name: 'filterByIndustry',
      title: 'Filter by Industry',
      type: 'string',
      options: {
        list: [
          {title: 'All Industries', value: 'all'},
          {title: 'Lease', value: 'lease'},
          {title: 'Productie en Assemblage', value: 'productie'},
          {title: 'Vastgoedbeheer', value: 'vastgoed'},
          {title: 'Supply Chain', value: 'supply-chain'},
          {title: 'Handel en Distributie', value: 'handel'},
          {title: 'Retail', value: 'retail'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'limit',
      title: 'Max Items',
      type: 'number',
      initialValue: 6,
      description: 'Maximum number of case studies to display',
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
        ],
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'View All Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'View All Button Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      filterByIndustry: 'filterByIndustry',
    },
    prepare({title, filterByIndustry}) {
      return {
        title: title || 'Case Study Grid',
        subtitle: filterByIndustry && filterByIndustry !== 'all' ? `Industry: ${filterByIndustry}` : 'All industries',
      }
    },
  },
})
