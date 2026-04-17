/**
 * Create Pages Script
 *
 * This script creates the skeleton for all requested pages in Sanity.
 * Each page will include a Hero Section to maintain visual consistency.
 *
 * Run: npx tsx scripts/create-pages.ts
 */

import {sanityClient} from './lib/sanity-client'
import dotenv from 'dotenv'

dotenv.config({path: 'scripts/.env'})

function generateKey(): string {
  return Math.random().toString(36).substring(2, 10)
}

const PAGES_TO_CREATE = [
  {name: 'Oplossingen', slug: 'oplossingen'},
  {name: 'Onze Apps', slug: 'onze-apps'},
  {name: 'Klanten & Cases', slug: 'klanten-cases'},
  {name: 'Partners', slug: 'partners'},
  {name: 'Team', slug: 'team'},
  {name: 'Nieuws', slug: 'blog-nieuws', isNews: true}, // Special case for the blog list
  {name: 'Contact', slug: 'contact'},
  {name: 'Vacatures', slug: 'vacatures'},
  {name: 'Algemene Voorwaarden', slug: 'algemene-voorwaarden'},
  {name: 'Privacy Policy', slug: 'privacy-policy'},
  {name: 'Help & Ondersteuning', slug: 'help-ondersteuning'},
  {
    name: 'Mogelijkheden van Business Central',
    slug: 'ontdek-de-standaardvoordelen-van-microsoft-dynamics-365-business-central-voor-nieuwe-klanten',
  },
  {name: 'Upgraden naar Business Central', slug: 'upgraden-naar-business-central'},
  {
    name: 'Overstappen naar Business Central',
    slug: 'overstappen-naar-business-central-de-slimme-keuze',
  },
  {
    name: 'Aflopende support Navision versies 2016-2018',
    slug: 'aflopende-microsoft-support-voor-navision-versies-2016-2017-en-2018',
  },
  {
    name: 'Verschil tussen Navision en Microsoft Dynamics 365',
    slug: 'wat-is-het-verschil-tussen-navision-en-microsoft-dynamics-365-business-central',
  },
]

async function createPages() {
  console.log('📄 Starting page creation...\n')

  // Get existing hero backgrounds to reuse if possible, or we'll just leave it empty for the user to fill
  const homeHero = await sanityClient.fetch(
    `*[_type == "page" && slug.current == "home"][0].pageBuilder[_type == "blockHero"][0].backgroundImage`,
  )

  for (const page of PAGES_TO_CREATE) {
    // Check if page already exists
    const existing = await sanityClient.fetch(
      `*[_type == "page" && slug.current == "${page.slug}"][0]`,
    )

    if (existing) {
      console.log(`⚠️  Page "${page.name}" already exists (${page.slug}). Skipping.`)
      continue
    }

    console.log(`📝 Creating page: ${page.name}...`)

    const doc = {
      _type: 'page',
      title: page.name,
      slug: {
        _type: 'slug',
        current: page.slug,
      },
      pageBuilder: [
        {
          _type: 'blockHero',
          _key: generateKey(),
          heading: page.name,
          subheading:
            'Ontdek hoe Faect jouw organisatie ondersteunt met gespecialiseerde oplossingen.',
          backgroundImage: homeHero || undefined,
          intro01: 'Specialisten in Microsoft Business Software',
          intro02: 'Maatwerk configuratie op standaard platformen',
        },
      ],
    }

    try {
      const result = await sanityClient.create(doc)
      console.log(`✅ Created ${page.name} (ID: ${result._id})`)
    } catch (error) {
      console.error(`❌ Failed to create ${page.name}:`, error)
    }
  }

  console.log('\n✨ All pages processed!')
}

createPages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
