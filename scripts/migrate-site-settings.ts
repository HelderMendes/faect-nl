/**
 * Site Settings Migration Script
 *
 * Creates the global site settings document in Sanity
 * with contact info, social links, and footer content.
 *
 * Run: npx tsx migrate-site-settings.ts
 */

import {sanityClient, uploadImageFromUrl} from './lib/sanity-client.js'
import dotenv from 'dotenv'

dotenv.config()

function generateKey(): string {
  return Math.random().toString(36).substring(2, 10)
}

async function createSiteSettings() {
  console.log('⚙️  Starting site settings migration...\n')

  // Check if settings already exist
  const existing = await sanityClient.fetch(`*[_type == "siteSettings"][0]._id`)

  if (existing) {
    console.log('⚠️  Site settings already exist. Delete first or update manually.')
    console.log(`   Document ID: ${existing}`)
    return
  }

  // Upload logo
  console.log('📷 Uploading logo...')
  const logo = await uploadImageFromUrl(
    'https://faect.nl/wp-content/uploads/2025/07/Faect_logo_beeldmerk_kleur-1.png',
    'faect-logo.png'
  )
  console.log('✅ Logo uploaded\n')

  const siteSettings = {
    _type: 'siteSettings',
    _id: 'siteSettings', // Singleton pattern

    // General
    siteName: 'Faect',
    siteTagline:
      'Specialisten in Microsoft Dynamics 365 Business Central',
    logo: logo,

    // Contact Info
    address: {
      street: 'Gooimeer 12',
      postalCode: '1411 DE',
      city: 'Naarden',
      country: 'Nederland',
    },
    phone: '+31 (0) 88 707 7000',
    email: 'info@faect.nl',
    googleMapsUrl: 'https://maps.google.com/?q=Gooimeer+12,+1411+DE+Naarden',

    // Social Media
    socialLinks: [
      {
        _key: generateKey(),
        platform: 'linkedin',
        url: 'https://www.linkedin.com/company/faect/',
      },
    ],

    // Footer
    footerText: `© ${new Date().getFullYear()} Faect. Alle rechten voorbehouden.`,
    footerLinks: [
      {
        _key: generateKey(),
        title: 'Business Central',
        links: [
          {_key: generateKey(), label: 'Inrichten', url: '/oplossingen/inrichten'},
          {_key: generateKey(), label: 'Optimaliseren', url: '/oplossingen/optimaliseren'},
          {_key: generateKey(), label: 'Upgrade NAV', url: '/oplossingen/upgrade'},
          {_key: generateKey(), label: 'Support', url: '/support'},
        ],
      },
      {
        _key: generateKey(),
        title: 'Faect',
        links: [
          {_key: generateKey(), label: 'Over ons', url: '/over-ons'},
          {_key: generateKey(), label: 'Team', url: '/ons-team'},
          {_key: generateKey(), label: 'Partners', url: '/partners'},
          {_key: generateKey(), label: 'Nieuws', url: '/nieuws'},
        ],
      },
      {
        _key: generateKey(),
        title: 'Legal',
        links: [
          {_key: generateKey(), label: 'Algemene voorwaarden', url: '/algemene-voorwaarden'},
          {_key: generateKey(), label: 'Privacy Policy', url: '/privacy'},
          {_key: generateKey(), label: 'License Agreement', url: '/license-agreement'},
        ],
      },
    ],
  }

  console.log('📝 Creating site settings document...')

  try {
    const result = await sanityClient.createOrReplace(siteSettings)
    console.log('\n✅ Site settings created successfully!')
    console.log(`   Document ID: ${result._id}`)
  } catch (error) {
    console.error('❌ Failed to create site settings:', error)
    throw error
  }
}

createSiteSettings()
  .then(() => {
    console.log('\n🎉 Site settings migration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error)
    process.exit(1)
  })
