import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'blockContactForm',
  title: 'Contact Form',
  type: 'object',
  icon: EnvelopeIcon,
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
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      initialValue: 'contact',
      options: {
        list: [
          {title: 'General Contact', value: 'contact'},
          {title: 'Demo Request', value: 'demo'},
          {title: 'Support Request', value: 'support'},
          {title: 'Newsletter Signup', value: 'newsletter'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Verzenden',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.',
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Recipient Email',
      type: 'string',
      description: 'Email address to receive form submissions (handled by frontend)',
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      formType: 'formType',
    },
    prepare({title, formType}) {
      return {
        title: title || 'Contact Form',
        subtitle: `Form type: ${formType || 'contact'}`,
      }
    },
  },
})
