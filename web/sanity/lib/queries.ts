import { groq } from "next-sanity";

// Image asset expansion helper
const imageAsset = `{
  ...,
  asset->
}`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage {
    ...,
    asset->
  },
  author->{
    name,
    image {
      ...,
      asset->
    }
  }
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  hero {
    ...,
    backgroundImage ${imageAsset}
  },
  mainImage ${imageAsset},
  author->{
    name,
    image ${imageAsset}
  }
}`;

// Reference expansions for block types
const appReference = `{
  _id,
  title,
  slug,
  tagline,
  description,
  icon ${imageAsset}
}`;

const teamMemberReference = `{
  _id,
  name,
  role,
  bio,
  photo ${imageAsset},
  email,
  linkedIn
}`;

const partnerReference = `{
  _id,
  name,
  logo ${imageAsset},
  description,
  website
}`;

const caseStudyReference = `{
  _id,
  title,
  slug,
  clientName,
  clientLogo ${imageAsset},
  mainImage ${imageAsset},
  summary,
  industry
}`;

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    pageBuilder[]{
      ...,
      _type == "blockHero" => {
        ...,
        backgroundImage ${imageAsset}
      },
      _type == "blockFeatureGrid" => {
        ...,
        features[]{
          ...,
          icon ${imageAsset}
        }
      },
      _type == "blockTextWithImage" => {
        ...,
        image ${imageAsset}
      },
      _type == "blockCTA" => {
        ...,
        backgroundImage ${imageAsset}
      },
      _type == "blockSectorGrid" => {
        ...,
        sectors[]{
          ...,
          icon ${imageAsset}
        }
      },
      _type == "blockServiceCards" => {
        ...,
        services[]{
          ...,
          icon ${imageAsset}
        }
      },
      _type == "blockProcessSteps" => {
        ...,
        steps[]{
          ...,
          icon ${imageAsset}
        }
      },
      _type == "blockStats" => {
        ...,
        backgroundImage ${imageAsset}
      },
      _type == "blockAppShowcase" => {
        ...,
        apps[]-> ${appReference}
      },
      _type == "blockTeamGrid" => {
        ...,
        members[]-> ${teamMemberReference}
      },
      _type == "blockPartnerLogos" => {
        ...,
        partners[]-> ${partnerReference}
      },
      _type == "blockCaseStudyGrid" => {
        ...,
        caseStudies[]-> ${caseStudyReference}
      }
    }
  }
`;

export const APPS_QUERY = groq`*[_type == "app" && defined(slug.current)] | order(order asc, title asc){
  _id,
  title,
  slug,
  tagline,
  description,
  icon ${imageAsset}
}`;

export const APP_QUERY = groq`*[_type == "app" && slug.current == $slug][0]{
  ...,
  icon ${imageAsset},
  screenshots[] ${imageAsset}
}`;

export const CASE_STUDIES_QUERY = groq`*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  slug,
  clientName,
  clientLogo ${imageAsset},
  mainImage ${imageAsset},
  summary,
  industry
}`;

export const CASE_STUDY_QUERY = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  ...,
  clientLogo ${imageAsset},
  mainImage ${imageAsset},
  gallery[] ${imageAsset}
}`;

export const TEAM_MEMBERS_QUERY = groq`*[_type == "teamMember"] | order(order asc, name asc){
  _id,
  name,
  role,
  bio,
  photo ${imageAsset},
  email,
  linkedIn
}`;

export const PARTNERS_QUERY = groq`*[_type == "partner"] | order(order asc, name asc){
  _id,
  name,
  logo ${imageAsset},
  description,
  website
}`;

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  ...,
  logo ${imageAsset},
  favicon ${imageAsset},
  socialImage ${imageAsset}
}`;
