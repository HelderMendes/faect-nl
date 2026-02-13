import * as cheerio from 'cheerio'
import {createClient} from '@sanity/client'
import slugify from 'slugify'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({path: path.resolve(process.cwd(), 'web/.env.local')})

if (!process.env.SANITY_API_TOKEN) {
  console.log('⚠️  No SANITY_API_TOKEN found. Running in DRY RUN mode.')
  console.log(
    "   To import to Sanity, run: SANITY_API_TOKEN='your_token' node scripts/migrate.mjs\n",
  )
}

// Configuration
const PROJECT_ID = 'ymgfr312'
const DATASET = 'faect'
const TOKEN = process.env.SANITY_API_TOKEN

const client = TOKEN
  ? createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      token: TOKEN,
      apiVersion: '2024-02-04',
      useCdn: false,
    })
  : null

async function uploadImage(imageUrl) {
  if (!client) return null

  try {
    const res = await fetch(imageUrl)
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`)
    const buffer = await res.arrayBuffer()
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: path.basename(imageUrl),
    })
    return asset
  } catch (error) {
    console.warn(`   ⚠️  Failed to upload image ${imageUrl}:`, error.message)
    return null
  }
}

async function scrapeHomepage() {
  console.log('🌐 Scraping Homepage...')
  const html = await fetch('https://faect.nl/').then((res) => res.text())
  const $ = cheerio.load(html)

  // Extract Hero Section
  const heading = $('h1').first().text().trim()
  const subheading = $('h2').first().text().trim()

  console.log(`   ✅ Hero: "${heading}"`)
  console.log(`   ✅ Subheading: "${subheading}"`)

  // Extract Features - "Efficiëntie en Innovatie" section
  const features = []

  // Look for the three main features in the first section
  const featureTitles = [
    'Efficiëntie en Innovatie',
    'Geïntegreerde processen',
    'Gebruiksvriendelijkheid',
  ]

  $('h3').each((i, el) => {
    const title = $(el).text().trim()
    if (featureTitles.includes(title)) {
      // Get the next paragraph as description
      const description = $(el).next('p').text().trim()
      if (description) {
        features.push({
          _key: `feature_${slugify(title, {lower: true})}`,
          title,
          description,
        })
      }
    }
  })

  console.log(`   ✅ Found ${features.length} features`)

  // Extract Sector Solutions
  const sectors = []
  const sectorTitles = ['Vastgoedbeheer', 'Supply Chain', 'Productie en Assemblage', 'Jouw Sector']

  $('h3').each((i, el) => {
    const title = $(el).text().trim()
    if (sectorTitles.includes(title)) {
      const description = $(el).next('p').text().trim()
      if (description) {
        sectors.push({
          _key: `sector_${slugify(title, {lower: true})}`,
          title,
          description,
        })
      }
    }
  })

  console.log(`   ✅ Found ${sectors.length} sector solutions`)

  // Create Sanity Document
  const doc = {
    _id: 'page-home',
    _type: 'page',
    title: 'Home',
    slug: {_type: 'slug', current: 'home'},
    pageBuilder: [
      {
        _key: 'hero',
        _type: 'blockHero',
        heading,
        subheading,
        ctaText: 'Bekijk onze oplossingen',
        ctaLink: '/oplossingen',
      },
      {
        _key: 'features_grid',
        _type: 'blockFeatureGrid',
        title: 'Waarom kiezen voor Faect?',
        features: features,
      },
      {
        _key: 'sectors_grid',
        _type: 'blockFeatureGrid',
        title: 'Standaard Microsoft software geconfigureerd voor jouw sector',
        features: sectors,
      },
    ],
  }

  if (!client) {
    console.log('\n📄 DRY RUN - Document that would be created:')
    console.log(JSON.stringify(doc, null, 2))
    return
  }

  await client.createOrReplace(doc)
  console.log('✨ Homepage imported to Sanity!')
}

async function scrapePosts() {
  console.log('\n🌐 Scraping Blog Posts...')
  const html = await fetch('https://faect.nl/blog-nieuws/').then((res) => res.text())
  const $ = cheerio.load(html)

  const posts = []

  $('article').each((i, el) => {
    const title = $(el).find('h2, h3, .elementor-post__title').first().text().trim()
    const link = $(el).find('a').first().attr('href')
    const imageSrc = $(el).find('img').first().attr('src')
    const excerpt = $(el).find('.elementor-post__excerpt, p').first().text().trim()

    if (title && link) {
      posts.push({title, link, imageSrc, excerpt})
    }
  })

  console.log(`   ✅ Found ${posts.length} blog posts`)

  if (!client) {
    console.log('   ⚠️  Skipping import (DRY RUN mode)')
    return
  }

  for (const post of posts) {
    let mainImage = undefined
    if (post.imageSrc) {
      const asset = await uploadImage(post.imageSrc)
      if (asset) {
        mainImage = {
          _type: 'image',
          asset: {_type: 'reference', _ref: asset._id},
        }
      }
    }

    const doc = {
      _type: 'post',
      title: post.title,
      slug: {_type: 'slug', current: slugify(post.title, {lower: true, strict: true})},
      mainImage,
      publishedAt: new Date().toISOString(),
    }

    await client.create(doc).catch((err) => {
      if (err.message.includes('already exists')) {
        console.log(`   ⚠️  Post "${post.title}" already exists, skipping`)
      } else {
        console.error(`   ❌ Failed to create post "${post.title}":`, err.message)
      }
    })
  }

  console.log('✨ Blog posts imported!')
}

async function run() {
  console.log('🚀 Starting Faect.nl Content Migration\n')
  console.log('='.repeat(60))

  await scrapeHomepage()
  // await scrapePosts(); // Uncomment to scrape blog posts

  console.log('\n' + '='.repeat(60))
  console.log('✅ Migration complete!')

  if (!client) {
    console.log('\n💡 To actually import to Sanity, run:')
    console.log('   SANITY_API_TOKEN="your_token_here" node scripts/migrate.mjs')
  }
}

run().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
