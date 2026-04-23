import type { HeroConfig } from "@/components/blocks/sectionUtils";

// ── Per-page intro block styles ───────────────────────────────────────────────
// Format: "border-l-[6px] <border-color> <bg-color>"
// Add a new constant here whenever a page needs its own intro block appearance.

const INTRO_OPLOSSINGEN = "border-white bg-faect-blue/95 md:ml-0 pr-2 md:pr-3";
const INTRO_APPS = "border-white bg-faect-blue/95";
const INTRO_KLANTEN = "border-white bg-[#1E3E74]/80 ";
const INTRO_TEAM = "border-white bg-[#1E3E74]/80";
const INTRO_PARTNERS = "border-white bg-[#1E3E74]/80";
const INTRO_NIEUWS = "border-white bg-[#1E3E74]/80";
const INTRO_CONTACT = "border-white bg-[#1E3E74]/80";

const HEADING_OPLOSSINGEN =
  "font-extrabold  xl:pr-25 lg:pr-55 lg:-mt-8 md:-mt-18 md:pr-40 md:pt-0 sm:pt-55 pt-10 tracking-tight sm:text-4xl md:text-[2.6rem] lg:text-[3rem] xl:text-[3.6rem]/16  text-3xl";

const SUBHEADING_OPLOSSINGEN =
  "text-2xl md:text-4xl lg:text-[2.5rem]/8 xl:text-[2.9rem]/9 font-semibold pt-0 lg:pt-1 mx-auto text-center md:text-left md:mb-2 sm:-mb-15 md:mt-0 -mt-5 text-[1.7rem] mb-28 ";

// ── Hero configs per slug ─────────────────────────────────────────────────────
// Home page uses all BlockHero defaults — no entry needed:
//   headingColor: "white-to-blue" | introVariant: "navy-tinted" | spacing: "default"

export const heroConfigs: Record<string, HeroConfig> = {
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

  apps: {
    headingColor: "white",
    subheadingColor: "blue",
    introClass: INTRO_APPS,
  },

  "klanten-cases": {
    headingColor: "white",
    subheadingColor: "white-faded",
    introClass: INTRO_KLANTEN,
  },

  team: {
    headingColor: "white",
    subheadingColor: "white-faded",
    introClass: INTRO_TEAM,
  },

  partners: {
    headingColor: "white",
    subheadingColor: "blue",
    introClass: INTRO_PARTNERS,
  },

  nieuws: {
    headingColor: "white",
    subheadingColor: "white-faded",
    introClass: INTRO_NIEUWS,
  },

  contact: {
    headingColor: "white",
    subheadingColor: "white-faded",
    spacing: "compact",
    introClass: INTRO_CONTACT,
  },
};
