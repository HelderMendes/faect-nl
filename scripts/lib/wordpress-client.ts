import dotenv from 'dotenv'

dotenv.config()

const WP_API_URL = process.env.WP_API_URL || 'https://faect.nl/wp-json/wp/v2'

export interface WPPage {
  id: number
  slug: string
  title: {rendered: string}
  content: {rendered: string}
  excerpt: {rendered: string}
  featured_media: number
  date: string
  modified: string
  status: string
}

export interface WPPost {
  id: number
  slug: string
  title: {rendered: string}
  content: {rendered: string}
  excerpt: {rendered: string}
  featured_media: number
  date: string
  categories: number[]
  tags: number[]
}

export interface WPMedia {
  id: number
  source_url: string
  title: {rendered: string}
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes?: Record<string, {source_url: string}>
  }
}

async function fetchJSON<T>(endpoint: string): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`
  console.log(`Fetching: ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export async function getPages(perPage = 100): Promise<WPPage[]> {
  return fetchJSON<WPPage[]>(`/pages?per_page=${perPage}&_embed`)
}

export async function getPage(id: number): Promise<WPPage> {
  return fetchJSON<WPPage>(`/pages/${id}?_embed`)
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchJSON<WPPage[]>(`/pages?slug=${slug}&_embed`)
  return pages[0] || null
}

export async function getPosts(perPage = 100): Promise<WPPost[]> {
  return fetchJSON<WPPost[]>(`/posts?per_page=${perPage}&_embed`)
}

export async function getPost(id: number): Promise<WPPost> {
  return fetchJSON<WPPost>(`/posts/${id}?_embed`)
}

export async function getMedia(id: number): Promise<WPMedia | null> {
  if (!id) return null
  try {
    return await fetchJSON<WPMedia>(`/media/${id}`)
  } catch {
    console.error(`Could not fetch media ${id}`)
    return null
  }
}

export async function getAllMedia(perPage = 100): Promise<WPMedia[]> {
  return fetchJSON<WPMedia[]>(`/media?per_page=${perPage}`)
}
