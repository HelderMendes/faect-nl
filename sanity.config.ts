import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'faect-2026',

  projectId: 'ymgfr312',
  dataset: 'faect',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
