/*
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

type RichTextParagraph = {
  _type: 'block'
  _key: string
  style: 'normal'
  markDefs: []
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: []
  }>
}

function createParagraph(text: string): RichTextParagraph {
  return {
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: generateKey(),
        text,
        marks: [],
      },
    ],
  }
}

function createRichTextBlock(title: string, paragraphs: string[]) {
  return {
    _type: 'blockRichText',
    _key: generateKey(),
    heading: title,
    content: paragraphs.map(createParagraph),
    alignment: 'left',
    maxWidth: 'wide',
  }
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
  {
    name: 'Algemene Voorwaarden',
    slug: 'voorwaarden',
    pageFolder: 'regels',
    pageBuilder: [
      createRichTextBlock('Downloads', [
        'Faect hanteert de NLdigital voorwaarden als basis voor haar dienstverlening. Deze voorwaarden vormen de standaard voor de ICT-branche en dekken de belangrijkste zakelijke afspraken en dienstverlening af.',
        'Gebruik de downloads hieronder om de actuele versie te openen in de taal die je nodig hebt.',
      ]),
      createRichTextBlock('Wat je kunt verwachten', [
        'De voorwaarden beschrijven onder andere de manier waarop Faect diensten levert, welke afspraken gelden rondom samenwerking en hoe verantwoordelijkheden zijn verdeeld.',
      ]),
    ],
  },
  {
    name: 'Privacy Policy',
    slug: 'privacy',
    pageFolder: 'regels',
    pageBuilder: [
      createRichTextBlock('Toepassingsbereik', [
        'Dit privacybeleid geldt voor alle websites en elektronische nieuwsbrieven van Faect.',
        'Wanneer je de website bezoekt, kunnen technische gegevens worden verwerkt zoals IP-adres, browserinformatie en de pagina die je bezocht.',
      ]),
      createRichTextBlock('Verwerking van persoonsgegevens', [
        'Persoonsgegevens die je actief verstrekt, zoals naam, contactgegevens en voorkeuren, worden gebruikt om contact op te nemen, informatie te delen over producten of aanbiedingen, de dienstverlening te verbeteren en marktonderzoek uit te voeren.',
        'Andere vormen van verwerking vinden alleen plaats als je daar ondubbelzinnig toestemming voor hebt gegeven.',
      ]),
      createRichTextBlock('Nieuwsbrieven en cookies', [
        'Aanmelden voor een nieuwsbrief verloopt via een double opt-in proces. Onder aan elke nieuwsbrief vind je een link waarmee je je eenvoudig kunt uitschrijven.',
        'Faect maakt daarnaast gebruik van Google Analytics om het gebruik van de website te analyseren en te verbeteren.',
      ]),
      createRichTextBlock('Vragen en inzage', [
        'Heb je vragen over de verwerking van je gegevens of wil je inzage of correctie van persoonsgegevens aanvragen, neem dan contact op met Faect via info@faect.nl of 088 – 707 7000.',
      ]),
    ],
  },
  {
    name: 'Help & Ondersteuning',
    slug: 'support',
    pageFolder: 'regels',
    pageBuilder: [
      createRichTextBlock('Support Service Desk', [
        'Bij Faect staan we altijd voor je klaar. Je kunt onze Support Service Desk van maandag tot en met vrijdag bereiken van 9:00 tot 17:00, telefonisch of per e-mail.',
        'Heb je vragen of behoefte aan ondersteuning, neem gerust contact op. We helpen je graag verder met dagelijkse vragen, incidents of hulp bij gebruik van Business Central.',
        'Would you like support in English? No problem. All our staff are happy to help.',
      ]),
      createRichTextBlock('Service Contract', [
        'Bij Faect bieden we onze klanten de zekerheid van uitstekende service, ondersteund door duidelijke Service Level Afspraken, wanneer zij kiezen voor een Service Contract.',
        'Onze experts reageren snel en efficiënt, zodat je nooit voor verrassingen komt te staan en vragen de juiste prioriteit krijgen.',
      ]),
      createRichTextBlock('Onze belofte', [
        'Vraag ons naar de mogelijkheden van een Service Contract. Jouw tevredenheid is onze prioriteit.',
      ]),
    ],
  },
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
      pageFolder: page.pageFolder,
      pageBuilder:
        'pageBuilder' in page && page.pageBuilder
          ? page.pageBuilder
          : [
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
