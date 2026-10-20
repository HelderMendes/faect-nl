import {createClient} from '@sanity/client'
import {createReadStream} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config({path: 'scripts/.env'})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ymgfr312',
  dataset: process.env.SANITY_DATASET || 'faect',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const k = () => crypto.randomBytes(6).toString('hex')

async function run() {
  console.log('🚀 Creating Materials Management App in Sanity...\n')

  // 1. Upload icon
  const iconPath = path.resolve(__dirname, '../web/public/apps/Materials-Management-768x768.png')
  console.log(`📤 Uploading icon: ${iconPath}`)
  const iconStream = createReadStream(iconPath)
  const imageAsset = await sanityClient.assets.upload('image', iconStream, {
    filename: 'Materials-Management-768x768.png',
  })
  console.log(`✅ Uploaded image asset: ${imageAsset._id}`)

  // 2. Prepare body PortableText
  const ctaLinkKey = k()
  const body = [
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Met Materials Management in Microsoft Dynamics 365 Business Central krijgen inkopers direct in het inkoopvoorstel een helder overzicht van de verwachte voorraad per week. Voor elk artikel en elke locatie toont de app de verwachte voorraad, vraag, forecast, aanbod en beschikbaar-voor-toezegging (ATP) voor de komende weken in één overzicht.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Forecasts zijn gebaseerd op het werkelijke verbruik: de app berekent het gemiddelde verbruik per week uit de artikelposthistorie en kan dit als forecast gebruiken. In combinatie met een voorraaddoel in weken dekking zien inkopers direct wanneer de voorraad te laag of te hoog dreigt te worden, ruim voordat het zover is.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Het resultaat: inkooporders op het juiste moment, minder voorraadtekorten, minder werkkapitaal in voorraad en minder rekenwerk in Excel naast Business Central.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h2',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Waarom kiezen voor Materials Management?',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Plan inkopen op basis van een weekoverzicht van meerdere weken per artikel en locatie.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Baseer forecasts op het werkelijke historische verbruik.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Stuur de voorraad met een doel in weken dekking.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Signaleer tekorten en overtollige voorraad weken van tevoren.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Werk direct in het standaard inkoopvoorstel van Business Central.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h2',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Belangrijkste functionaliteiten',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h3',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Wekelijkse planningsmatrix',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Verwachte voorraad (begin en eind), vraag, aanbod en ATP per week, voor 11 weken vooruit.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h3',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Forecast op basis van verbruik',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Berekent automatisch het gemiddelde verbruik per week uit de artikelposthistorie en gebruikt dit optioneel als forecast.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h3',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Voorraaddoel in weken',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Leg de gewenste dekking per artikel vast en zie direct of de verwachte voorraad aan het doel voldoet.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h3',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Inzicht in ongeplande transacties',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Apart inzicht in ongeplande mutaties, zodat uitzonderingen uw planning niet verstoren.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h3',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Artikelposthistorie',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Bewaar of importeer historische artikelbewegingen (bijv. uit een vorig ERP-systeem) als betrouwbare basis voor de planning.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h3',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Geïntegreerd in het inkoopvoorstel',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Werkt binnen bestaande sjablonen en batches per inkoper; zet voorstellen op de standaard manier om in inkooporders.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h2',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Voordelen in één oogopslag',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: '✔ Minder voorraadtekorten – tekorten worden weken vooruit zichtbaar.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: '✔ Lagere voorraadkosten – bestel in lijn met de werkelijke vraag.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: '✔ Snellere inkoopbeslissingen – alle planningscijfers in één scherm.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: '✔ Datagedreven forecasting – op basis van werkelijk verbruik in plaats van onderbuikgevoel.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: '✔ Geen extra tools – volledig geïntegreerd in Dynamics 365 Business Central.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h2',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Beschikbaarheid',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: ['strong'],
          text: 'Platform',
        },
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: ': Microsoft Dynamics 365 Business Central',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: ['strong'],
          text: 'Categorie',
        },
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: ': Supply Chain / Inkoop- & voorraadplanning / ERP-extensies',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      level: 1,
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: ['strong'],
          text: 'Publicatie via',
        },
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: ': Microsoft AppSource',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'h2',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Direct aan de slag',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Ontdek hoe Materials Management uw inkoopteam volledige grip geeft op voorraadniveaus en bestelmomenten.',
        },
      ],
    },
    {
      _key: k(),
      _type: 'block',
      style: 'normal',
      markDefs: [
        {
          _key: ctaLinkKey,
          _type: 'link',
          href: 'https://faect.nl/contact/',
        },
      ],
      children: [
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: 'Vraag vandaag nog een demo aan bij ',
        },
        {
          _key: k(),
          _type: 'span',
          marks: [ctaLinkKey],
          text: 'Faect',
        },
        {
          _key: k(),
          _type: 'span',
          marks: [],
          text: ' via Microsoft AppSource.',
        },
      ],
    },
  ]

  const appDoc = {
    _type: 'app',
    title: 'Materials Management',
    slug: {
      _type: 'slug',
      current: 'materials-management',
    },
    tagline: 'Zie uw voorraadpositie weken vooruit – en bestel precies wat u nodig heeft.',
    description:
      'Met Materials Management in Microsoft Dynamics 365 Business Central krijgen inkopers direct in het inkoopvoorstel een helder overzicht van de verwachte voorraad per week. Voor elk artikel en elke locatie toont de app de verwachte voorraad, vraag, forecast, aanbod en beschikbaar-voor-toezegging (ATP) voor de komende weken in één overzicht.',
    features: [
      'Wekelijkse planningsmatrix (11 weken vooruit)',
      'Forecast op basis van werkelijk verbruik',
      'Voorraaddoel in weken dekking',
      'Inzicht in ongeplande transacties',
      'Artikelposthistorie als planningsbasis',
      'Geïntegreerd in het Business Central inkoopvoorstel',
    ],
    order: 10,
    icon: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id,
      },
    },
    body,
  }

  // Check if already exists
  const existing = await sanityClient.fetch(
    `*[_type == "app" && slug.current == "materials-management"][0]._id`
  )

  let result
  if (existing) {
    console.log(`Updating existing doc: ${existing}`)
    result = await sanityClient.createOrReplace({
      _id: existing,
      ...appDoc,
    })
  } else {
    console.log('Creating new app document...')
    result = await sanityClient.create(appDoc)
  }

  console.log('🎉 Successfully created/updated Materials Management app in Sanity!')
  console.log(`Document ID: ${result._id}`)
}

run().catch((err) => {
  console.error('Error running script:', err)
  process.exit(1)
})
