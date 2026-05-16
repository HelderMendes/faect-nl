import {defineField, defineType} from 'sanity'
import {SplitVerticalIcon} from '@sanity/icons'

export default defineType({
  name: 'blockContactSplit',
  title: 'Contact Split (form + info)',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Hoe kunnen we je helpen?',
    }),
    defineField({
      name: 'intro',
      title: 'Intro text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'E.164 format — e.g. +31101234567',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedInLabel',
      title: 'LinkedIn label',
      type: 'string',
      initialValue: 'Faect op LinkedIn',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit button text',
      type: 'string',
      initialValue: 'Verstuur bericht',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success message',
      type: 'text',
      rows: 2,
      initialValue:
        'Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Contact Split',
        subtitle: 'Form + contact info — split layout',
      }
    },
  },
})
