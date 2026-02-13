// Document types
import page from './page'
import post from './post'
import caseStudy from './caseStudy'
import app from './app'
import teamMember from './teamMember'
import partner from './partner'
import faqItem from './faqItem'
import siteSettings from './siteSettings'

// Block types
import blockHero from './blockHero'
import blockFeatureGrid from './blockFeatureGrid'
import blockTextWithImage from './blockTextWithImage'
import blockCTA from './blockCTA'
import blockRichText from './blockRichText'
import blockFAQ from './blockFAQ'
import blockProcessSteps from './blockProcessSteps'
import blockSectorGrid from './blockSectorGrid'
import blockServiceCards from './blockServiceCards'
import blockAppShowcase from './blockAppShowcase'
import blockTeamGrid from './blockTeamGrid'
import blockPartnerLogos from './blockPartnerLogos'
import blockCaseStudyGrid from './blockCaseStudyGrid'
import blockContactForm from './blockContactForm'
import blockContactInfo from './blockContactInfo'
import blockStats from './blockStats'

import {sectionSettings} from './shared/sectionSettings'

export const schemaTypes = [
  // Documents
  page,
  post,
  caseStudy,
  app,
  teamMember,
  partner,
  faqItem,
  siteSettings,

  // Blocks
  blockHero,
  blockFeatureGrid,
  blockTextWithImage,
  blockCTA,
  blockRichText,
  blockFAQ,
  blockProcessSteps,
  blockSectorGrid,
  blockServiceCards,
  blockAppShowcase,
  blockTeamGrid,
  blockPartnerLogos,
  blockCaseStudyGrid,
  blockContactForm,
  blockContactInfo,
  blockStats,

  // Shared
  sectionSettings,
]
