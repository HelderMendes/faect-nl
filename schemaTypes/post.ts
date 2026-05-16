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
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'Nieuws',
      options: {
        list: [
          {title: 'Nieuws', value: 'Nieuws'},
          {title: 'Klanten', value: 'Klanten'},
          {title: 'Producten', value: 'Producten'},
          {title: 'Evenementen', value: 'Evenementen'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'blockRichText'},
        {type: 'blockTextWithImage'},
        {type: 'blockFeatureGrid'},
        {type: 'blockCTA'},
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
