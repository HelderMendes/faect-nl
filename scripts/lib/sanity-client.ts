import {createClient} from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({path: 'scripts/.env'})

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ymgfr312',
  dataset: process.env.SANITY_DATASET || 'faect',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function uploadImageFromUrl(
  url: string,
  filename?: string
): Promise<{_type: 'image'; asset: {_type: 'reference'; _ref: string}} | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`Failed to fetch image: ${url}`)
      return null
    }

    const buffer = await response.arrayBuffer()
    const asset = await sanityClient.assets.upload('image', Buffer.from(buffer), {
      filename: filename || url.split('/').pop() || 'image',
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`Error uploading image ${url}:`, error)
    return null
  }
}

export async function uploadFileFromUrl(
  url: string,
  filename?: string
): Promise<{_type: 'file'; asset: {_type: 'reference'; _ref: string}} | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`Failed to fetch file: ${url}`)
      return null
    }

    const buffer = await response.arrayBuffer()
    const asset = await sanityClient.assets.upload('file', Buffer.from(buffer), {
      filename: filename || url.split('/').pop() || 'file',
    })

    return {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`Error uploading file ${url}:`, error)
    return null
  }
}
