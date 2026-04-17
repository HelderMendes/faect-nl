import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './sanity.structure'

export default defineConfig({
  name: 'default',
  title: 'Faect',

  projectId: 'ymgfr312',
  dataset: 'faect',

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
