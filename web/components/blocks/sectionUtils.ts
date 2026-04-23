import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SectionSettings {
  backgroundColor?: "white" | "gray" | "dither" | "navy" | "none";
  paddingTop?: "default" | "compact" | "none";
  paddingBottom?: "default" | "compact" | "none";
  verticalSpacing?: "default" | "compact";
}

// ─── Hero-specific per-page config ───────────────────────────────────────────

/** Controls the border + background of intro blocks 01 & 02 */
export type HeroIntroVariant =
  | "navy-tinted" // home default — border-white, bg-[#1E3E74]/80
  | "white-tinted" // border-faect-blue, bg-white/20
  | "blue" // border-white, bg-faect-blue/95
  | "dark"; // border-white, bg-black/60

/** Font family — maps to the three project-defined font tokens */
export type HeroFont =
  | "sans" // Work Sans  (default body font)
  | "heading" // Cairo
  | "ui"; // Varela

/** Controls how far right the heading container extends (effective text column width) */
export type HeroHeadingWidth =
  | "default" // md:mr-[35%] xl:mr-[45%]  — heading fills left ~60%
  | "narrow" // md:mr-[45%] xl:mr-[55%]  — heading fills left ~50%
  | "wide" // md:mr-[20%] xl:mr-[25%]  — heading fills left ~75%
  | "full"; // no right margin           — full container width

/** Controls h1 font weight */
export type HeroHeadingWeight =
  | "semibold" // default
  | "bold"
  | "normal";

/** Controls h1 responsive font size */
export type HeroHeadingSize =
  | "default" // text-4xl → md:text-5xl → xl:text-[52px]
  | "sm" // text-3xl → md:text-4xl → xl:text-[44px]
  | "lg"; // text-5xl → md:text-6xl → xl:text-[64px]

/** Controls the bottom spacing between h1 and the subheading */
export type HeroHeadingSpacing =
  | "default" // pb-3
  | "tight" // pb-1
  | "loose"; // pb-6

/** Controls subheading responsive font size */
export type HeroSubheadingSize =
  | "default" // text-2xl → md:text-[1.5rem] → xl:text-[1.7rem]
  | "sm" // text-lg  → md:text-xl       → xl:text-2xl
  | "lg" // text-3xl → md:text-[1.8rem] → xl:text-[2rem]
  | "xl"; // text-4xl → md:text-[2.25rem] → xl:text-[2.5rem]

/** Controls h1 color across breakpoints */
export type HeroHeadingColor =
  | "white-to-blue" // home default — white on mobile, faect-blue on md+
  | "white" // white at all sizes
  | "blue"; // faect-blue at all sizes

/** Controls the subheading / intro line color */
export type HeroSubheadingColor =
  | "white-faded" // home default — text-white/90
  | "white" // text-white
  | "blue"; // text-faect-blue

/** Controls section vertical spacing (the inner content margins) */
export type HeroSpacing = "default" | "compact" | "tall";

/** Fine-grained top/bottom padding override — applied on top of spacing */
export type HeroPadding = "none" | "compact" | "default" | "large";

/** Controls how far the intro block strip sits from the section bottom */
export type HeroIntroPosition = "default" | "low" | "high";

export interface HeroConfig {
  introVariant?: HeroIntroVariant;
  introClass?: string; // escape hatch — overrides introVariant with raw Tailwind classes
  introPosition?: HeroIntroPosition;
  headingFont?: HeroFont;
  headingSize?: HeroHeadingSize;
  headingSizeClass?: string; // escape hatch — overrides headingSize with raw Tailwind classes
  headingWeight?: HeroHeadingWeight;
  headingWidth?: HeroHeadingWidth;
  headingWidthClass?: string; // escape hatch — overrides headingWidth with raw Tailwind classes
  headingSpacing?: HeroHeadingSpacing;
  headingColor?: HeroHeadingColor;
  subheadingFont?: HeroFont;
  subheadingSize?: HeroSubheadingSize;
  subheadingSizeClass?: string; // escape hatch — overrides subheadingSize with raw Tailwind classes
  subheadingColor?: HeroSubheadingColor;
  spacing?: HeroSpacing;
  paddingTop?: HeroPadding; // overrides the top portion of spacing
  paddingBottom?: HeroPadding; // overrides the bottom portion of spacing
  headingClass?: string; // escape hatch — extra classes appended to h1 (wins via twMerge)
  subheadingClass?: string; // escape hatch — extra classes appended to subheading (wins via twMerge)
}

// Resolved class maps — consumed by BlockHero
export const HERO_INTRO_CLASSES: Record<HeroIntroVariant, string> = {
  "navy-tinted": "border-white bg-[#1E3E74]/80",
  "white-tinted": "border-faect-blue bg-white/20",
  blue: "border-white bg-faect-blue/95",
  dark: "border-white bg-black/60",
};

export const HERO_HEADING_CLASSES: Record<HeroHeadingColor, string> = {
  "white-to-blue": "text-white md:text-faect-blue",
  white: "text-white",
  blue: "text-faect-blue",
};

export const HERO_SUBHEADING_CLASSES: Record<HeroSubheadingColor, string> = {
  "white-faded": "text-white/90",
  white: "text-white",
  blue: "text-faect-blue",
};

export const HERO_FONT_CLASSES: Record<HeroFont, string> = {
  sans: "font-sans",
  heading: "font-heading",
  ui: "font-ui",
};

export const HERO_HEADING_WIDTH_CLASSES: Record<HeroHeadingWidth, string> = {
  default: "md:mr-[35%] xl:mr-[45%]",
  narrow: "md:mr-[45%] xl:mr-[55%]",
  wide: "md:mr-[20%] xl:mr-[25%]",
  full: "",
};

export const HERO_HEADING_WEIGHT_CLASSES: Record<HeroHeadingWeight, string> = {
  semibold: "font-semibold",
  bold: "font-bold",
  normal: "font-normal",
};

export const HERO_HEADING_SIZE_CLASSES: Record<HeroHeadingSize, string> = {
  default: "text-4xl md:text-5xl xl:text-[52px]",
  sm: "text-3xl md:text-4xl xl:text-[44px]",
  lg: "text-5xl md:text-6xl xl:text-[64px]",
};

export const HERO_HEADING_SPACING_CLASSES: Record<HeroHeadingSpacing, string> =
  {
    default: "pb-3",
    tight: "pb-1",
    loose: "pb-6",
  };

export const HERO_SUBHEADING_SIZE_CLASSES: Record<HeroSubheadingSize, string> =
  {
    default: "text-2xl md:text-[1.5rem]/8 xl:text-[1.7rem]/9",
    sm: "text-lg md:text-xl xl:text-2xl",
    lg: "text-3xl md:text-[1.8rem]/9 xl:text-[2rem]/10",
    xl: "text-4xl md:text-[2.7rem]/10 xl:text-[3rem]/12  font-semibold -mb-5",
  };

export const HERO_SPACING_CLASSES: Record<HeroSpacing, string> = {
  default: "my-18 pt-16 md:my-24 md:pt-20 lg:my-28 lg:pt-20 xl:my-34",
  compact: "my-10 pt-12 md:my-16 md:pt-16 lg:my-20",
  tall: "my-24 pt-20 md:my-32 md:pt-24 lg:my-40 lg:pt-28",
};

export const HERO_PADDING_TOP_CLASSES: Record<HeroPadding, string> = {
  none: "pt-0 mt-0",
  compact: "pt-8 mt-8 md:pt-12 md:mt-10",
  default: "pt-16 mt-18 md:pt-20 md:mt-24",
  large: "pt-24 mt-24 md:pt-32 md:mt-32",
};

export const HERO_PADDING_BOTTOM_CLASSES: Record<HeroPadding, string> = {
  none: "pb-0 mb-0",
  compact: "pb-8 mb-8 md:pb-12 md:mb-10",
  default: "pb-16 mb-18 md:pb-20 md:mb-24",
  large: "pb-24 mb-24 md:pb-32 md:mb-32",
};

export const HERO_INTRO_POSITION_CLASSES: Record<HeroIntroPosition, string> = {
  default: "bottom-2 md:bottom-8",
  low: "bottom-0",
  high: "bottom-12 md:bottom-16",
};

export function resolveHeroClasses(config?: HeroConfig) {
  return {
    intro:
      config?.introClass ??
      HERO_INTRO_CLASSES[config?.introVariant ?? "navy-tinted"],
    introPosition:
      HERO_INTRO_POSITION_CLASSES[config?.introPosition ?? "default"],
    headingFont: HERO_FONT_CLASSES[config?.headingFont ?? "sans"],
    headingSize:
      config?.headingSizeClass ??
      HERO_HEADING_SIZE_CLASSES[config?.headingSize ?? "default"],
    headingWeight:
      HERO_HEADING_WEIGHT_CLASSES[config?.headingWeight ?? "semibold"],
    headingWidth:
      config?.headingWidthClass ??
      HERO_HEADING_WIDTH_CLASSES[config?.headingWidth ?? "default"],
    headingSpacing:
      HERO_HEADING_SPACING_CLASSES[config?.headingSpacing ?? "default"],
    headingColor: HERO_HEADING_CLASSES[config?.headingColor ?? "white-to-blue"],
    subheadingFont: HERO_FONT_CLASSES[config?.subheadingFont ?? "sans"],
    subheadingSize:
      config?.subheadingSizeClass ??
      HERO_SUBHEADING_SIZE_CLASSES[config?.subheadingSize ?? "default"],
    subheadingColor:
      HERO_SUBHEADING_CLASSES[config?.subheadingColor ?? "white-faded"],
    spacing: HERO_SPACING_CLASSES[config?.spacing ?? "default"],
    paddingTop: config?.paddingTop
      ? HERO_PADDING_TOP_CLASSES[config.paddingTop]
      : undefined,
    paddingBottom: config?.paddingBottom
      ? HERO_PADDING_BOTTOM_CLASSES[config.paddingBottom]
      : undefined,
    headingClass: config?.headingClass,
    subheadingClass: config?.subheadingSizeClass,
  };
}

export function getSectionStyles(
  settings?: SectionSettings,
  options: { noOverlay?: boolean } = {},
) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    dither: "section-dither",
    navy: "bg-faect-navy text-white",
    none: "bg-transparent",
  };

  const paddingTopClasses = {
    default: "pt-20 lg:pt-24",
    compact: "pt-10 lg:pt-12",
    none: "pt-0",
  };

  const paddingBottomClasses = {
    default: "pb-16 lg:pb-20",
    compact: "pb-8 lg:pb-10",
    none: "pb-0",
  };

  return cn(
    bgClasses[settings?.backgroundColor || "white"],
    paddingTopClasses[settings?.paddingTop || "default"],
    paddingBottomClasses[settings?.paddingBottom || "default"],
    !options.noOverlay && "block-background-overlay",
  );
}
