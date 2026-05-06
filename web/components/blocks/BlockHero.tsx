"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  getSectionStyles,
  resolveHeroClasses,
  type SectionSettings,
  type HeroConfig,
  cn,
} from "./sectionUtils";

type SanityImageAsset = {
  _ref?: string;
  url?: string;
};

type SanityImage = {
  asset?: SanityImageAsset;
  [key: string]: unknown;
};

interface BlockHeroProps {
  heading: string;
  subheading?: string;
  backgroundImage?: SanityImage;
  intro01?: string;
  intro02?: string;
  infoBlocks?: string[]; // For backwards compatibility
  settings?: SectionSettings;
  heroConfig?: HeroConfig;
}

export function BlockHero({
  heading,
  subheading,
  backgroundImage,
  intro01,
  intro02,
  infoBlocks,
  settings,
  heroConfig,
}: BlockHeroProps) {
  const activeIntroBlocks = [intro01, intro02, ...(infoBlocks || [])].filter(
    Boolean,
  ) as string[];

  const cx = resolveHeroClasses(heroConfig);

  const baseClasses =
    settings?.backgroundColor === "navy" || !settings?.backgroundColor
      ? "flex items-center"
      : cn(
          getSectionStyles(settings, { noOverlay: true }),
          "flex items-center",
        );

  const mobileIntroBelow = heroConfig?.mobileIntroBelow ?? false;

  return (
    <>
      <section className={cn("relative w-full", baseClasses)}>
        {backgroundImage?.asset && (
          <div className="animate-fade-in absolute inset-0 z-0 overflow-hidden">
            <Image
              src={
                backgroundImage.asset.url ||
                urlFor(backgroundImage).width(1920).height(1080).url()
              }
              alt={heading}
              fill
              className="lg:object-bottom-center object-cover xl:object-bottom-right"
              priority
            />
          </div>
        )}

        {/* Main content — same container as header */}
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div
            className={cn(
              "flex flex-col justify-start",
              cx.spacing,
              cx.paddingTop,
              cx.paddingBottom,
            )}
          >
            <div className="mb-5 flex flex-col items-start md:mb-0">
              {/* Title */}
              <div className={cn("animate-fade-in", cx.headingWidth)}>
                <h1
                  className={cn(
                    "text-center leading-14 text-shadow-lg md:text-left md:text-shadow-none",
                    cx.headingFont,
                    cx.headingWeight,
                    cx.headingSize,
                    cx.headingSpacing,
                    cx.headingColor,
                    cx.headingClass,
                  )}
                >
                  {heading}
                </h1>
              </div>

              {/* Subheading */}
              {subheading && (
                <div
                  className={cn(
                    "animate-fade-in m-0 min-w-full",
                    mobileIntroBelow ? "pb-4 md:pb-52" : "pb-52",
                    heroConfig?.subheadingWrapperClass,
                  )}
                >
                  <p
                    className={cn(
                      "text-center tracking-wide text-shadow-lg md:text-left",
                      cx.subheadingFont,
                      cx.subheadingSize,
                      cx.subheadingColor,
                    )}
                  >
                    {subheading}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Intro blocks — absolute, full section width, container-aligned (matches header) */}
        {activeIntroBlocks.length > 0 && (
          <div
            className={cn(
              "animate-slide-up pointer-events-none absolute right-0 left-0 z-20",
              mobileIntroBelow && "hidden md:block",
              cx.introPosition,
            )}
          >
            <div className="container mx-auto flex flex-col gap-3 px-4 md:px-8">
              {activeIntroBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "pointer-events-auto border-l-[6px] py-0.5 pr-4 pl-3 shadow-2xl",
                    cx.intro,
                  )}
                >
                  <p className="font-heading text-lg leading-6 font-normal tracking-wide text-white xl:text-[1.2rem] xl:leading-6.5">
                    {block}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Mobile-only continuation strip — no border, no shadow, no card, just text */}
      {mobileIntroBelow && activeIntroBlocks.length > 0 && (
        <div className="bg-faect-blue md:hidden">
          <div className="container mx-auto space-y-3 px-4 pt-2 pb-3 md:px-8">
            {activeIntroBlocks.map((block, idx) => (
              <p
                key={idx}
                className="font-heading text-[1.1rem]/6 leading-6 font-normal tracking-wide text-white/90"
              >
                {block}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
