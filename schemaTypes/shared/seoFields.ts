import {defineField} from 'sanity'

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    description: 'Override the page title for search engines',
    validation: (rule) => rule.max(60).warning('Keep under 60 characters for best SEO'),
    group: 'seo',
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    rows: 3,
    description: 'Brief description for search engine results',
    validation: (rule) => rule.max(160).warning('Keep under 160 characters for best SEO'),
    group: 'seo',
  }),
  defineField({
    name: 'seoImage',
    title: 'Social Share Image',
    type: 'image',
    description: 'Image shown when sharing on social media (1200x630px recommended)',
    options: {
      hotspot: true,
    },
    group: 'seo',
  }),
]
