import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in post cards and meta descriptions',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      description: 'Button shown at the bottom of the post. Leave empty to hide.',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Maak een afspraak',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
          initialValue: '/contact',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'blockTextWithImage'},
        {type: 'blockFeatureGrid'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled post',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('nl-NL') : '',
        media,
      }
    },
  },
})
