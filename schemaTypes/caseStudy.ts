import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers verschijnen eerst (1, 2, 3 …)',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'clientName',
      title: 'Klantnaam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientLogo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'industry',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          {title: 'Lease', value: 'lease'},
          {title: 'Productie & Assemblage', value: 'productie'},
          {title: 'Vastgoedbeheer', value: 'vastgoed'},
          {title: 'Supply Chain', value: 'supply-chain'},
          {title: 'Handel & Distributie', value: 'handel'},
          {title: 'Retail', value: 'retail'},
          {title: 'Dienstverlening', value: 'dienstverlening'},
          {title: 'Bouwbedrijf', value: 'bouw'},
          {title: 'Overig', value: 'overig'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Case-titel',
      type: 'string',
      description:
        'Verschijnt als heading in het uitklapscherm (bijv. "Succesvolle ERP-implementatie bij Beequip")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Samenvatting (trigger)',
      type: 'text',
      rows: 2,
      description: 'Korte regel zichtbaar in de gesloten accordion-rij',
    }),
    defineField({
      name: 'solution',
      title: 'Verhaal (paneel)',
      type: 'text',
      rows: 5,
      description: 'Volledige tekst zichtbaar na uitklappen',
    }),
    defineField({
      name: 'clientWebsite',
      title: 'Website klant',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'industry',
      media: 'clientLogo',
    },
    prepare({title, subtitle, media}) {
      return {title, subtitle, media}
    },
  },
})
