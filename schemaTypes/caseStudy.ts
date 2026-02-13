import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      description: 'Client company logo',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          {title: 'Lease', value: 'lease'},
          {title: 'Productie en Assemblage', value: 'productie'},
          {title: 'Vastgoedbeheer', value: 'vastgoed'},
          {title: 'Supply Chain', value: 'supply-chain'},
          {title: 'Handel en Distributie', value: 'handel'},
          {title: 'Retail', value: 'retail'},
          {title: 'Dienstverlening', value: 'dienstverlening'},
          {title: 'Overig', value: 'overig'},
        ],
        layout: 'dropdown',
      },
      group: 'meta',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief overview of the case study',
      group: 'content',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
      description: 'What problem did the client face?',
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 4,
      description: 'How did Faect solve it?',
      group: 'content',
    }),
    defineField({
      name: 'results',
      title: 'The Results',
      type: 'text',
      rows: 4,
      description: 'What were the outcomes?',
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: 'meta',
    }),
    defineField({
      name: 'clientWebsite',
      title: 'Client Website',
      type: 'url',
      group: 'meta',
    }),
    defineField({
      name: 'body',
      title: 'Full Story',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Client Name A-Z',
      name: 'clientNameAsc',
      by: [{field: 'clientName', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'clientName',
      industry: 'industry',
      media: 'clientLogo',
    },
    prepare({title, client, industry, media}) {
      return {
        title,
        subtitle: `${client}${industry ? ` • ${industry}` : ''}`,
        media,
      }
    },
  },
})
