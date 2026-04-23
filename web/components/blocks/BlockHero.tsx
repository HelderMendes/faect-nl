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

  return (
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
            className="object object-cover"
            priority
          />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div
          className={cn(
            "flex flex-col justify-start",
            cx.spacing,
            cx.paddingTop,
            cx.paddingBottom,
          )}
        >
          <div className="flex flex-col items-start gap-0">
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
              <div className="animate-fade-in m-0 min-w-full px-4 pb-52 md:mr-[38%] md:px-0 xl:mr-[45%]">
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

        {/* Intro Blocks 01 & 02 */}
        {activeIntroBlocks.length > 0 && (
          <div
            className={cn(
              "animate-slide-up pointer-events-none absolute left-0 z-20 my-auto ml-4 flex flex-col gap-2 md:right-3 md:ml-[45%] md:gap-4 xl:right-7 xl:ml-[51.5%]",
              cx.introPosition,
            )}
          >
            {activeIntroBlocks.map((block, idx) => (
              <div
                key={idx}
                className={cn(
                  "pointer-events-auto mr-4 border-l-[6px] py-0.5 pr-4 pl-3 shadow-2xl",
                  cx.intro,
                )}
              >
                <p className="font-heading text-lg leading-6 font-normal tracking-wide text-white xl:text-[1.2rem] xl:leading-6.5">
                  {block}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
