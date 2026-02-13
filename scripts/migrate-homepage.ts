/**
 * Homepage Migration Script
 *
 * This script creates the homepage in Sanity with all the content blocks
 * based on the current faect.nl WordPress/Elementor site.
 *
 * Run: npx tsx migrate-homepage.ts
 */

import {sanityClient, uploadImageFromUrl} from './lib/sanity-client.js'
import {textToPortableText} from './lib/html-to-portable-text.js'
import dotenv from 'dotenv'

dotenv.config()

function generateKey(): string {
  return Math.random().toString(36).substring(2, 10)
}

// Image URLs from faect.nl
const IMAGES = {
  heroBackground: 'https://faect.nl/wp-content/uploads/2025/07/Faect-Header-Home01-1.jpg',
  efficiencyIcon: 'https://faect.nl/wp-content/uploads/2025/12/Efficientie-en-Innovatie.jpg',
  integratedIcon:
    'https://faect.nl/wp-content/uploads/2025/07/Firefly-contour-drawing-some-arms-and-hands-holding-office-ERP-system-instruments-multitask-eff-scaled-1-2048x1170.jpg',
  userFriendlyIcon: 'https://faect.nl/wp-content/uploads/2025/12/Gebruiksvriendelijkheid.jpg',
  solutionsImage: 'https://faect.nl/wp-content/uploads/2025/12/faect_onzeOplossingen_home.png',
  contactBackground: 'https://faect.nl/wp-content/uploads/2025/07/contact.png',
  vastgoedIcon: 'https://faect.nl/wp-content/uploads/2025/12/Vastgoedbeheer.jpg',
  supplyChainIcon: 'https://faect.nl/wp-content/uploads/2025/12/SupplyChain.jpg',
  productieIcon: 'https://faect.nl/wp-content/uploads/2025/12/ProductieEnAssemblage.jpg',
}

async function createHomepage() {
  console.log('🏠 Starting homepage migration...\n')

  // Check if homepage already exists
  const existing = await sanityClient.fetch(
    `*[_type == "page" && slug.current == "home"][0]._id`
  )

  if (existing) {
    console.log('⚠️  Homepage already exists. Delete it first or update manually.')
    console.log(`   Document ID: ${existing}`)
    return
  }

  console.log('📷 Uploading images...')

  // Upload images
  const heroImage = await uploadImageFromUrl(IMAGES.heroBackground, 'hero-background.jpg')
  const contactImage = await uploadImageFromUrl(IMAGES.contactBackground, 'contact-background.png')
  const solutionsImage = await uploadImageFromUrl(IMAGES.solutionsImage, 'solutions.png')

  // Feature images
  const efficiencyImage = await uploadImageFromUrl(IMAGES.efficiencyIcon, 'efficiency.jpg')
  const integratedImage = await uploadImageFromUrl(IMAGES.integratedIcon, 'integrated.jpg')
  const userFriendlyImage = await uploadImageFromUrl(IMAGES.userFriendlyIcon, 'user-friendly.jpg')

  console.log('✅ Images uploaded\n')

  // Build the homepage document
  const homepage = {
    _type: 'page',
    title: 'Home',
    slug: {
      _type: 'slug',
      current: 'home',
    },
    seoTitle: 'Faect - Microsoft Dynamics 365 Business Central Specialist',
    seoDescription:
      'Transformeer en professionaliseer jouw bedrijf met Faect. Specialisten in Microsoft Dynamics 365 Business Central, op maat geconfigureerd voor jouw organisatie.',
    pageBuilder: [
      // 1. Hero Section
      {
        _type: 'blockHero',
        _key: generateKey(),
        heading: 'Transformeer en professionaliseer jouw bedrijf met Faect',
        subheading:
          'Specialisten in standaard Microsoft business software, op maat voor jou geconfigureerd!',
        backgroundImage: heroImage,
        ctaText: 'Neem contact op',
        ctaLink: '/contact',
      },

      // 2. Intro Text with Image (Business Central Solutions)
      {
        _type: 'blockTextWithImage',
        _key: generateKey(),
        heading: 'Krachtige ERP-oplossingen met Microsoft Dynamics 365 Business Central',
        content: textToPortableText(
          'Bij Faect zijn we gespecialiseerd in het configureren van Microsoft Dynamics 365 Business Central, volledig afgestemd op de unieke behoeften van jouw organisatie.\n\nOnze aanpak combineert de kracht van standaard software met de flexibiliteit van maatwerk configuratie. Dit betekent dat je profiteert van een robuust, bewezen platform dat naadloos aansluit op jouw bedrijfsprocessen.'
        ),
        image: solutionsImage,
        imagePosition: 'right',
        ctaText: 'Bekijk onze oplossingen',
        ctaLink: '/oplossingen',
      },

      // 3. Feature Grid (Waarom Faect)
      {
        _type: 'blockFeatureGrid',
        _key: generateKey(),
        title: 'Waarom kiezen voor Faect?',
        features: [
          {
            _key: generateKey(),
            title: 'Efficiëntie en Innovatie',
            description:
              'Met de Faect Apps haal je meer uit Business Central. Onze oplossingen zijn ontwikkeld om organisaties slimmer te laten werken — met hogere efficiëntie, meer innovatie en gebruiksvriendelijke functionaliteit die direct aansluit op dagelijkse processen.',
            icon: efficiencyImage,
          },
          {
            _key: generateKey(),
            title: 'Geïntegreerde processen',
            description:
              'Door processen te standaardiseren en te automatiseren, verminderen we handmatig werk en foutgevoeligheid. Onze Faect Apps integreren volledig binnen Business Central, waardoor gegevens centraal beschikbaar zijn.',
            icon: integratedImage,
          },
          {
            _key: generateKey(),
            title: 'Gebruiksvriendelijkheid',
            description:
              'Of het nu gaat om finance, inkoop, verkoop of beheer van contracten en data: Faect Apps zorgen voor naadloze processen en een platform dat met jouw organisatie meegroeit.',
            icon: userFriendlyImage,
          },
        ],
      },

      // 4. Sector Grid
      {
        _type: 'blockSectorGrid',
        _key: generateKey(),
        heading: 'Standaard Microsoft software geconfigureerd voor jouw sector',
        subheading:
          'Faect is gespecialiseerd in het leveren van standaard software geconfigureerd op maat van de klant. Met onze expertise ondersteunen wij bedrijven in diverse sectoren.',
        columns: 4,
        sectors: [
          {
            _key: generateKey(),
            title: 'Vastgoedbeheer',
            description: 'Beheer je vastgoedportefeuille effectief met gedetailleerde rapportages',
            link: '/oplossingen/vastgoedbeheer',
          },
          {
            _key: generateKey(),
            title: 'Supply Chain',
            description: 'Verhoog de efficiëntie van jouw logistieke processen',
            link: '/oplossingen/supply-chain',
          },
          {
            _key: generateKey(),
            title: 'Productie en Assemblage',
            description: 'Optimaliseer je productie- en assemblageactiviteiten',
            link: '/oplossingen/productie',
          },
          {
            _key: generateKey(),
            title: 'Jouw Sector',
            description: 'Ontdek hoe wij jouw specifieke sector kunnen ondersteunen',
            link: '/contact',
          },
        ],
      },

      // 5. Services Section
      {
        _type: 'blockServiceCards',
        _key: generateKey(),
        heading: 'All you need',
        subheading:
          'Faect biedt alle tools en expertise die je nodig hebt om het maximale uit Microsoft Dynamics 365 Business Central te halen.',
        columns: 4,
        services: [
          {
            _key: generateKey(),
            title: 'Inrichten Business Central',
            description:
              'Wij zorgen voor een vlekkeloze implementatie van Business Central, volledig afgestemd op jouw bedrijfsprocessen en wensen.',
            link: '/oplossingen/inrichten',
          },
          {
            _key: generateKey(),
            title: 'Optimaliseren Business Central',
            description:
              'Haal meer uit je huidige systeem met onze optimalisatiediensten. We analyseren en verbeteren je processen.',
            link: '/oplossingen/optimaliseren',
          },
          {
            _key: generateKey(),
            title: 'Upgrade van NAV naar Business Central',
            description:
              'Stap over van Dynamics NAV naar Business Central met minimale verstoring en maximaal behoud van je data.',
            link: '/oplossingen/upgrade',
          },
          {
            _key: generateKey(),
            title: 'Support',
            description:
              'Ons supportteam staat klaar om je te helpen met al je vragen en technische uitdagingen.',
            link: '/support',
          },
        ],
      },

      // 6. CTA Section (Klaar om te groeien)
      {
        _type: 'blockCTA',
        _key: generateKey(),
        heading: 'Klaar om te groeien met Faect?',
        text: 'Neem contact met ons op voor een vrijblijvend gesprek over hoe wij jouw organisatie kunnen helpen.',
        ctaText: 'Neem contact op',
        ctaLink: '/contact',
        backgroundImage: contactImage,
        variant: 'primary',
      },

      // 7. Contact Info
      {
        _type: 'blockContactInfo',
        _key: generateKey(),
        heading: 'We zijn er om je te helpen',
        text: 'Heb je vragen of wil je meer weten over onze diensten? Neem gerust contact met ons op.',
        useGlobalSettings: true,
        showMap: false,
        showSocialLinks: true,
      },
    ],
  }

  console.log('📝 Creating homepage document...')

  try {
    const result = await sanityClient.create(homepage)
    console.log('\n✅ Homepage created successfully!')
    console.log(`   Document ID: ${result._id}`)
    console.log(`   Title: ${result.title}`)
    console.log(`   Blocks: ${homepage.pageBuilder.length}`)
    console.log('\n🔗 View in Sanity Studio:')
    console.log(
      `   https://faect-2026.sanity.studio/structure/page;${result._id}`
    )
  } catch (error) {
    console.error('❌ Failed to create homepage:', error)
    throw error
  }
}

// Run the migration
createHomepage()
  .then(() => {
    console.log('\n🎉 Homepage migration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error)
    process.exit(1)
  })
