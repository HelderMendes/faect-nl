import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockTextWithAccordion',
  title: 'Tekst + Accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label (boven heading)',
      type: 'string',
      description: 'Kleine tekst boven de heading, bv. "Onze diensten en werkwijzen"',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body tekst',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'items',
      title: 'Accordion items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Beschrijving',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'details',
              title: 'Details (Voordeel / Oplossing / etc.)',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'label', title: 'Label', type: 'string', description: 'bv. Voordeel, Oplossing, Implementatie'}),
                    defineField({name: 'text', title: 'Tekst', type: 'text', rows: 3}),
                  ],
                  preview: {
                    select: {title: 'label'},
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title'},
          },
        }),
      ],
    }),
    defineField({
      name: 'settings',
      title: 'Section Settings',
      type: 'sectionSettings',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Tekst + Accordion',
        subtitle: 'Links tekst/afbeelding — Rechts uitklaplijst',
      }
    },
  },
})
