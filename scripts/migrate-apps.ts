/**
 * Faect Apps Migration Script
 *
 * Creates the Faect Apps documents in Sanity based on the apps page content.
 *
 * Run: npx tsx migrate-apps.ts
 */

import {sanityClient, uploadImageFromUrl, uploadFileFromUrl} from './lib/sanity-client.js'
import dotenv from 'dotenv'

dotenv.config()

// Faect Apps data extracted from faect.nl/apps/
const FAECT_APPS = [
  {
    title: 'Complementary Fields & Dynamic Rolecenter',
    slug: 'complementary-fields-dynamic-rolecenter',
    tagline: 'Meer flexibiliteit in je Business Central omgeving',
    description:
      'Voeg extra velden toe aan standaard tabellen en creëer dynamische rolecenters die zich aanpassen aan de gebruiker. Verbeter de gebruikerservaring zonder complexe aanpassingen.',
    factsheetUrl:
      'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-Complementary-FieldsDynamicRoleCenter.pdf',
    order: 1,
  },
  {
    title: 'Configurator',
    slug: 'configurator',
    tagline: 'Complexe producten eenvoudig configureren',
    description:
      'Stel complexe producten samen met een intuïtieve configurator. Ideaal voor bedrijven die maatwerkproducten aanbieden met vele opties en varianten.',
    factsheetUrl: 'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-Configurator.pdf',
    order: 2,
  },
  {
    title: 'Data Exchange Extension',
    slug: 'data-exchange-extension',
    tagline: 'Naadloze data-integratie',
    description:
      'Importeer en exporteer data eenvoudig tussen Business Central en externe systemen. Ondersteunt diverse formaten en automatische verwerking.',
    factsheetUrl:
      'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-DataExchangeExtension.pdf',
    order: 3,
  },
  {
    title: 'Direct Payment Integration',
    slug: 'direct-payment-integration',
    tagline: 'Directe betalingsverwerking',
    description:
      'Integreer betalingen direct in Business Central. Verwerk bankafschriften automatisch en koppel betalingen aan facturen zonder handmatig werk.',
    factsheetUrl:
      'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-DirectPaymentInt.pdf',
    order: 4,
  },
  {
    title: 'Multi Finance',
    slug: 'multi-finance',
    tagline: 'Beheer meerdere financiële entiteiten',
    description:
      'Beheer meerdere bedrijven of financiële entiteiten vanuit één Business Central omgeving. Ideaal voor holdings en organisaties met meerdere vestigingen.',
    factsheetUrl: 'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-MultiFinance.pdf',
    order: 5,
  },
  {
    title: 'Process Flow',
    slug: 'process-flow',
    tagline: 'Visueel workflowbeheer',
    description:
      'Ontwerp en beheer bedrijfsprocessen met visuele workflows. Automatiseer goedkeuringen, notificaties en taken voor een efficiëntere organisatie.',
    factsheetUrl: 'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-ProcessFlow.pdf',
    order: 6,
  },
  {
    title: 'Document Process Management',
    slug: 'document-process-management',
    tagline: 'Slim documentbeheer',
    description:
      'Beheer documenten efficiënt binnen Business Central. Van ontvangst tot archivering, met automatische classificatie en routing.',
    factsheetUrl:
      'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-DocumentProcessManagement.pdf',
    order: 7,
  },
  {
    title: 'Profit, Pricing & Promotions',
    slug: 'profit-pricing-promotions',
    tagline: 'Dynamisch prijsbeheer',
    description:
      'Beheer prijzen, kortingen en promoties centraal. Analyseer marges en optimaliseer je prijsstrategie met geavanceerde inzichten.',
    factsheetUrl:
      'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-Profit_PricingPromotions.pdf',
    order: 8,
  },
  {
    title: 'Transport Planning',
    slug: 'transport-planning',
    tagline: 'Efficiënte transportplanning',
    description:
      'Plan en optimaliseer je transportactiviteiten direct vanuit Business Central. Van routeplanning tot voertuigbeheer.',
    factsheetUrl:
      'https://faect.nl/wp-content/uploads/2026/01/Faectsheet-TransportPlanning.pdf',
    order: 9,
  },
]

async function migrateApps() {
  console.log('🚀 Starting Faect Apps migration...\n')

  let created = 0
  let skipped = 0
  let failed = 0

  for (const app of FAECT_APPS) {
    // Check if app already exists
    const existing = await sanityClient.fetch(
      `*[_type == "app" && slug.current == $slug][0]._id`,
      {slug: app.slug}
    )

    if (existing) {
      console.log(`⏭️  Skipping "${app.title}" (already exists)`)
      skipped++
      continue
    }

    console.log(`📝 Creating: ${app.title}`)

    try {
      // Upload factsheet PDF
      let factsheet = null
      if (app.factsheetUrl) {
        console.log(`   📄 Uploading factsheet...`)
        factsheet = await uploadFileFromUrl(
          app.factsheetUrl,
          `faectsheet-${app.slug}.pdf`
        )
      }

      const appDoc = {
        _type: 'app',
        title: app.title,
        slug: {
          _type: 'slug',
          current: app.slug,
        },
        tagline: app.tagline,
        description: app.description,
        factsheet,
        order: app.order,
      }

      const result = await sanityClient.create(appDoc)
      console.log(`   ✅ Created: ${result._id}`)
      created++
    } catch (error) {
      console.error(`   ❌ Failed to create "${app.title}":`, error)
      failed++
    }
  }

  console.log('\n📊 Migration Summary:')
  console.log(`   ✅ Created: ${created}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Failed: ${failed}`)
}

migrateApps()
  .then(() => {
    console.log('\n🎉 Faect Apps migration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error)
    process.exit(1)
  })
