import {defineField} from 'sanity'

export const sectionSettings = {
  name: 'sectionSettings',
  title: 'Section Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Off-White / Gray', value: 'gray'},
          {title: 'Dither Gradient', value: 'dither'},
          {title: 'Navy (Dark)', value: 'navy'},
          {title: 'None / Transparent', value: 'none'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'paddingTop',
      title: 'Padding Top',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default (100px)', value: 'default'},
          {title: 'Compact (50px)', value: 'compact'},
          {title: 'None', value: 'none'},
        ],
      },
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default (70px)', value: 'default'},
          {title: 'Compact (35px)', value: 'compact'},
          {title: 'None', value: 'none'},
        ],
      },
    }),
    defineField({
      name: 'verticalSpacing',
      title: 'Vertical Spacing (Mobile)',
      type: 'string',
      initialValue: 'default',
      description: 'Adjustment for mobile spacing if needed',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Compact', value: 'compact'},
        ],
      },
    }),
  ],
}
