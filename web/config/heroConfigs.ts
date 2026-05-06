import type { HeroConfig } from "@/components/blocks/sectionUtils";

// ── Per-page intro block styles ───────────────────────────────────────────────
// Format: "border-l-[6px] <border-color> <bg-color>"
// Add a new constant here whenever a page needs its own intro block appearance.

const HEADING_HOME =
  "font-extrabold tracking-tight sm:text-4xl md:text-[2.8rem] lg:text-[3.2rem] lg:-mt-16 xl:text-[3.6rem]/16  text-3xl/9 mb-4 md:mb-0 -mt-10 text-faect-blue ";
const INTRO_HOME = "border-white bg-faect-blue/90 md:ml-[38%] lg:ml-[45%]";
const SUBHEADING =
  "md:text-3xl lg:text-[1.9rem]/9 xl:text-[2rem]/10 pt-0 lg:pt-1 mx-auto text-center md:text-left md:mb-2 sm:-mb-15 md:mt-0 -mt-5 text-[1.5rem]/7 md:mr-[30%] lg:mr-[40%] xl:mr-[50%] -mb-12 sm:-mb-6";
const SUBHEADING_HOME = SUBHEADING + " mb-0";

const HEADING_OPLOSSINGEN =
  "font-extrabold  xl:pr-25 lg:pr-55 lg:-mt-8 md:-mt-18 md:pr-40 md:pt-0 sm:pt-55 pt-10 tracking-tight sm:text-4xl md:text-[2.6rem] lg:text-[3rem] xl:text-[3.6rem]/16  text-3xl";
const SUBHEADING_OPLOSSINGEN =
  "text-2xl md:text-4xl lg:text-[2.5rem]/8 xl:text-[2.9rem]/9 font-semibold pt-0 lg:pt-1 mx-auto text-center md:text-left md:mb-2 sm:-mb-15 md:mt-0 -mt-5 text-[1.7rem] mb-28 ";
const INTRO_OPLOSSINGEN =
  "border-white bg-faect-blue/95 md:ml-[30%] lg:ml-[46%] xl:ml-[45%]";

const HEADING_APPS = HEADING_HOME + " -mt-26 shadow-lg";
const SUBHEADING_APPS = SUBHEADING_HOME + " mb-8";
const INTRO_APPS = "border-white bg-faect-blue/95 lg:ml-[40%] xl:ml-[52%]";

const INTRO_TEAM = "border-white bg-[#1E3E74]/80";
const INTRO_PARTNERS = "border-white bg-[#1E3E74]/80";
const INTRO_NIEUWS = "border-white bg-[#1E3E74]/80";
const INTRO_CONTACT = "border-white bg-[#1E3E74]/80";

const HEADING_KLANTEN =
  " sm:text-[3.4rem]/14 md:text-[3.6rem]/15 lg:text-[4.2rem]/17 xl:text-[4.4rem]/18 font-semibold pt-0 lg:pt-1 mx-auto text-center md:text-left  lg:-mt-15 -mt-17 text-[3.2rem]/15  xl:-mt-20 -mt-26  mb-2 md:mb-0";
const SUBHEADING_KLANTEN =
  "xl:text-[3rem]/9 font-semibold pt-0 lg:pt-2 mx-auto text-center md:text-left md:mb-2 sm:-mb-15 md:mt-0  -mt-5 text-[2.2rem]/9 md:text-[2.4rem]/8 md:text-[2.6rem]/8 md:px-0 px-8 -mb-1 md:-mb-10 lg:-mb-12 xl:-mb-28 -mb-10";
const INTRO_KLANTEN = "border-red bg-[#1E3E74]/85 md:ml-[24%] lg:ml-[55%]";

// ── Hero configs per slug ─────────────────────────────────────────────────────
// Home page uses all BlockHero defaults — no entry needed:
//   headingColor: "white-to-blue" | introVariant: "navy-tinted" | spacing: "default"

export const heroConfigs: Record<string, HeroConfig> = {
  home: {
    headingClass: HEADING_HOME,
    subheadingSizeClass: SUBHEADING_HOME,
    introClass: INTRO_HOME,
  },

  oplossingen: {
    headingColor: "white",
    paddingTop: "none",
    headingSize: "lg",
    subheadingColor: "blue",
    // subheadingSize: "xl",
    introClass: INTRO_OPLOSSINGEN,
    headingClass: HEADING_OPLOSSINGEN,
    subheadingSizeClass: SUBHEADING_OPLOSSINGEN,
  },

  "faect-apps": {
    headingClass: HEADING_APPS,
    subheadingSizeClass: SUBHEADING_APPS,
    introClass: INTRO_APPS,
    mobileIntroBelow: true,
  },

  "klanten-cases": {
    headingColor: "blue",
    subheadingSizeClass: SUBHEADING_KLANTEN,
    subheadingWrapperClass: "md:pb-64 xl:pb-72",
    introClass: INTRO_KLANTEN,
    mobileIntroBelow: true,
    headingClass: HEADING_KLANTEN,
  },

  team: {
    headingColor: "white",
    subheadingColor: "white-faded",
    introClass: INTRO_TEAM,
    mobileIntroBelow: true,
  },

  partners: {
    headingColor: "white",
    subheadingColor: "blue",
    introClass: INTRO_PARTNERS,
    mobileIntroBelow: true,
  },

  nieuws: {
    headingColor: "white",
    subheadingColor: "white-faded",
    introClass: INTRO_NIEUWS,
    mobileIntroBelow: true,
  },

  contact: {
    headingColor: "white",
    subheadingColor: "white-faded",
    spacing: "compact",
    introClass: INTRO_CONTACT,
    mobileIntroBelow: true,
  },
};
