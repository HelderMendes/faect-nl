import {defineField, defineType, defineArrayMember} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {seoFields} from './shared/seoFields'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      of: [
        // Hero & CTA
        defineArrayMember({type: 'blockHero'}),
        defineArrayMember({type: 'blockCTA'}),

        // Content blocks
        defineArrayMember({type: 'blockRichText'}),
        defineArrayMember({type: 'blockTextWithImage'}),
        defineArrayMember({type: 'blockFeatureGrid'}),

        // Process & FAQ
        defineArrayMember({type: 'blockProcessSteps'}),
        defineArrayMember({type: 'blockFAQ'}),
        defineArrayMember({type: 'blockStats'}),

        // Grids & Showcases
        defineArrayMember({type: 'blockSectorGrid'}),
        defineArrayMember({type: 'blockServiceCards'}),
        defineArrayMember({type: 'blockAppShowcase'}),
        defineArrayMember({type: 'blockTeamGrid'}),
        defineArrayMember({type: 'blockPartnerLogos'}),
        defineArrayMember({type: 'blockCaseStudyGrid'}),

        // Contact
        defineArrayMember({type: 'blockContactForm'}),
        defineArrayMember({type: 'blockContactInfo'}),
      ],
    }),
    // SEO Fields (spread from shared)
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : 'No slug',
      }
    },
  },
})
