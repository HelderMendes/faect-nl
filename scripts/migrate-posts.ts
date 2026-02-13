/**
 * Blog Posts Migration Script
 *
 * Fetches posts from WordPress REST API and creates them in Sanity.
 *
 * Run: npx tsx migrate-posts.ts
 */

import {sanityClient, uploadImageFromUrl} from './lib/sanity-client.js'
import {getPosts, getMedia} from './lib/wordpress-client.js'
import {htmlToPortableText} from './lib/html-to-portable-text.js'
import dotenv from 'dotenv'

dotenv.config()

async function migratePosts() {
  console.log('📰 Starting blog posts migration...\n')

  // Fetch posts from WordPress
  console.log('📥 Fetching posts from WordPress...')
  const wpPosts = await getPosts(50)
  console.log(`   Found ${wpPosts.length} posts\n`)

  let created = 0
  let skipped = 0
  let failed = 0

  for (const wpPost of wpPosts) {
    const slug = wpPost.slug

    // Check if post already exists
    const existing = await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0]._id`,
      {slug}
    )

    if (existing) {
      console.log(`⏭️  Skipping "${wpPost.title.rendered}" (already exists)`)
      skipped++
      continue
    }

    console.log(`📝 Migrating: ${wpPost.title.rendered}`)

    try {
      // Fetch featured image if available
      let mainImage = null
      if (wpPost.featured_media) {
        const media = await getMedia(wpPost.featured_media)
        if (media?.source_url) {
          console.log(`   📷 Uploading featured image...`)
          mainImage = await uploadImageFromUrl(
            media.source_url,
            `${slug}-featured.jpg`
          )
        }
      }

      // Convert HTML content to Portable Text
      const body = htmlToPortableText(wpPost.content.rendered)

      // Create Sanity document
      const post = {
        _type: 'post',
        title: wpPost.title.rendered.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'"),
        slug: {
          _type: 'slug',
          current: slug,
        },
        mainImage,
        publishedAt: wpPost.date,
        body,
      }

      const result = await sanityClient.create(post)
      console.log(`   ✅ Created: ${result._id}`)
      created++
    } catch (error) {
      console.error(`   ❌ Failed to migrate "${wpPost.title.rendered}":`, error)
      failed++
    }
  }

  console.log('\n📊 Migration Summary:')
  console.log(`   ✅ Created: ${created}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Failed: ${failed}`)
}

migratePosts()
  .then(() => {
    console.log('\n🎉 Blog posts migration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error)
    process.exit(1)
  })
