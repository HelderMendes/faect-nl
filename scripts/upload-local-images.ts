/**
 * Upload Local Images to Sanity
 *
 * Uploads images from web/public/home/ to Sanity and updates
 * the homepage document with proper image references.
 *
 * Run: npx tsx upload-local-images.ts
 */

import {createClient} from '@sanity/client'
import {createReadStream} from 'fs'
import {readdir} from 'fs/promises'
import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ymgfr312',
  dataset: process.env.SANITY_DATASET || 'faect',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const PUBLIC_DIR = path.resolve(__dirname, '../web/public')

interface ImageAsset {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
}

async function uploadLocalImage(filePath: string, filename: string): Promise<ImageAsset | null> {
  try {
    console.log(`   📤 Uploading: ${filename}`)
    const stream = createReadStream(filePath)
    const asset = await sanityClient.assets.upload('image', stream, {
      filename,
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`   ❌ Failed to upload ${filename}:`, error)
    return null
  }
}

async function uploadHomepageImages() {
  console.log('🖼️  Uploading homepage images to Sanity...\n')

  const homeDir = path.join(PUBLIC_DIR, 'home')

  // Define which images we need for the homepage
  const imageMapping: Record<string, string> = {
    heroBackground: 'Faect-Header-Home01-1.jpg',
    contactBackground: 'contact.png',
    solutionsImage: 'faect_onzeOplossingen_home.png',
    efficiencyImage: 'Efficientie-en-Innovatie.jpg',
    integratedImage: 'Firefly-contour-drawing-some-arms-and-hands-holding-office-ERP-system-instruments-multitask-eff-scaled-1-2048x1170.jpg',
    userFriendlyImage: 'Gebruiksvriendelijkheid.jpg',
  }

  const uploadedImages: Record<string, ImageAsset> = {}

  // Upload each image
  for (const [key, filename] of Object.entries(imageMapping)) {
    const filePath = path.join(homeDir, filename)
    const asset = await uploadLocalImage(filePath, filename)
    if (asset) {
      uploadedImages[key] = asset
      console.log(`   ✅ ${key}: ${asset.asset._ref}`)
    }
  }

  console.log(`\n📊 Uploaded ${Object.keys(uploadedImages).length}/${Object.keys(imageMapping).length} images`)

  return uploadedImages
}

async function updateHomepageWithImages(images: Record<string, ImageAsset>) {
  console.log('\n📝 Updating homepage document...\n')

  // Find the homepage document
  const homepage = await sanityClient.fetch(
    `*[_type == "page" && slug.current == "home"][0]`
  )

  if (!homepage) {
    console.error('❌ Homepage not found!')
    return
  }

  console.log(`   Found homepage: ${homepage._id}`)

  // Update the pageBuilder blocks with images
  const updatedPageBuilder = homepage.pageBuilder.map((block: any) => {
    switch (block._type) {
      case 'blockHero':
        if (images.heroBackground) {
          console.log('   🎯 Updating blockHero with background image')
          return {...block, backgroundImage: images.heroBackground}
        }
        break

      case 'blockTextWithImage':
        if (images.solutionsImage) {
          console.log('   🎯 Updating blockTextWithImage with solutions image')
          return {...block, image: images.solutionsImage}
        }
        break

      case 'blockFeatureGrid':
        if (block.features && Array.isArray(block.features)) {
          console.log('   🎯 Updating blockFeatureGrid with feature icons')
          const updatedFeatures = block.features.map((feature: any, index: number) => {
            if (index === 0 && images.efficiencyImage) {
              return {...feature, icon: images.efficiencyImage}
            }
            if (index === 1 && images.integratedImage) {
              return {...feature, icon: images.integratedImage}
            }
            if (index === 2 && images.userFriendlyImage) {
              return {...feature, icon: images.userFriendlyImage}
            }
            return feature
          })
          return {...block, features: updatedFeatures}
        }
        break

      case 'blockCTA':
        if (images.contactBackground) {
          console.log('   🎯 Updating blockCTA with background image')
          return {...block, backgroundImage: images.contactBackground}
        }
        break
    }
    return block
  })

  // Patch the document
  try {
    await sanityClient
      .patch(homepage._id)
      .set({pageBuilder: updatedPageBuilder})
      .commit()

    console.log('\n✅ Homepage updated successfully!')
  } catch (error) {
    console.error('\n❌ Failed to update homepage:', error)
  }
}

async function uploadLogoAndUpdateSettings() {
  console.log('\n🏢 Uploading logo and updating site settings...\n')

  const logoPath = path.join(PUBLIC_DIR, 'Logo_Faect_fc.png')
  const logo = await uploadLocalImage(logoPath, 'Logo_Faect_fc.png')

  if (logo) {
    try {
      await sanityClient
        .patch('siteSettings')
        .set({logo})
        .commit()
      console.log('✅ Site settings updated with logo!')
    } catch (error) {
      console.error('❌ Failed to update site settings:', error)
    }
  }
}

async function main() {
  console.log('🚀 Starting local image upload...\n')
  console.log('='.repeat(50))

  // Upload homepage images
  const images = await uploadHomepageImages()

  // Update homepage document
  if (Object.keys(images).length > 0) {
    await updateHomepageWithImages(images)
  }

  // Upload logo and update site settings
  await uploadLogoAndUpdateSettings()

  console.log('\n' + '='.repeat(50))
  console.log('🎉 Image upload complete!')
  console.log('\nView in Sanity Studio:')
  console.log('  pnpm sanity dev')
}

main().catch((error) => {
  console.error('💥 Error:', error)
  process.exit(1)
})
