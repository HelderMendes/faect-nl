import {defineField, defineType, defineArrayMember} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {sectionSettings} from './shared/sectionSettings'

const columnFields = (prefix: string) => [
  defineField({
    name: 'label',
    title: `${prefix} — Label`,
    type: 'string',
  }),
  defineField({
    name: 'heading',
    title: `${prefix} — Heading`,
    type: 'string',
    validation: (r) => r.required(),
  }),
  defineField({
    name: 'body',
    title: `${prefix} — Body`,
    type: 'text',
    rows: 4,
  }),
  defineField({
    name: 'linkText',
    title: `${prefix} — Link tekst`,
    type: 'string',
  }),
  defineField({
    name: 'linkHref',
    title: `${prefix} — Link URL`,
    type: 'string',
  }),
  defineField({
    name: 'buttonText',
    title: `${prefix} — Knop tekst`,
    type: 'string',
  }),
  defineField({
    name: 'buttonHref',
    title: `${prefix} — Knop URL`,
    type: 'string',
  }),
]

export default defineType({
  name: 'blockTwoColumnCTA',
  title: 'Twee kolommen CTA',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'centeredImage',
      title: 'Afbeelding (gecentreerd boven kolommen)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'leftLabel',
      title: 'Links — Label',
      type: 'string',
    }),
    defineField({
      name: 'leftHeading',
      title: 'Links — Heading',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'leftBody',
      title: 'Links — Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'leftLinkText',
      title: 'Links — Link tekst',
      type: 'string',
    }),
    defineField({
      name: 'leftLinkHref',
      title: 'Links — Link URL',
      type: 'string',
    }),
    defineField({
      name: 'leftButtonText',
      title: 'Links — Knop tekst',
      type: 'string',
    }),
    defineField({
      name: 'leftButtonHref',
      title: 'Links — Knop URL',
      type: 'string',
    }),
    defineField({
      name: 'rightLabel',
      title: 'Rechts — Label',
      type: 'string',
    }),
    defineField({
      name: 'rightHeading',
      title: 'Rechts — Heading',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rightBody',
      title: 'Rechts — Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'rightLinkText',
      title: 'Rechts — Link tekst',
      type: 'string',
    }),
    defineField({
      name: 'rightLinkHref',
      title: 'Rechts — Link URL',
      type: 'string',
    }),
    defineField({
      name: 'rightButtonText',
      title: 'Rechts — Knop tekst',
      type: 'string',
    }),
    defineField({
      name: 'rightButtonHref',
      title: 'Rechts — Knop URL',
      type: 'string',
    }),
    defineField({
      name: 'settings',
      title: 'Section Settings',
      type: 'sectionSettings',
    }),
  ],
  preview: {
    select: {
      left: 'leftHeading',
      right: 'rightHeading',
    },
    prepare({left, right}) {
      return {
        title: 'Twee kolommen CTA',
        subtitle: [left, right].filter(Boolean).join(' · '),
      }
    },
  },
})
