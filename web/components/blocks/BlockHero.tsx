"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings, cn } from "./sectionUtils";

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
}

export function BlockHero({
  heading,
  subheading,
  backgroundImage,
  intro01,
  intro02,
  infoBlocks, // Used for Intro 01 and Intro 02
  settings,
}: BlockHeroProps) {
  const activeIntroBlocks = [intro01, intro02, ...(infoBlocks || [])].filter(
    Boolean,
  ) as string[];
  // Hero always uses navy background as a fallback
  const baseClasses =
    settings?.backgroundColor === "navy" || !settings?.backgroundColor
      ? "flex items-center"
      : cn(
          getSectionStyles(settings, { noOverlay: true }),
          "flex items-center",
        );

  return (
    <section className={cn("relative w-full", baseClasses)}>
      {/* Background Image - Photoshop worked for text visibility, no extra filters or overflow needed */}
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
        <div className="my-18 flex flex-col justify-start pt-16 md:my-24 md:pt-20 lg:my-28 lg:pt-20 xl:my-34">
          <div className="flex flex-col items-start gap-0">
            {/* Title Container */}
            <div className="animate-fade-in md:mr-[35%] xl:mr-[45%]">
              <h1 className="md:text-faect-blue pb-3 text-center text-4xl leading-14 font-semibold text-white text-shadow-lg md:text-left md:text-5xl md:text-shadow-none xl:text-[52px]">
                {heading}
              </h1>
            </div>

            {/* Subtitle/Text Container */}
            {subheading && (
              <div className="animate-fade-in px-4 pb-52 md:mr-[38%] md:px-0 xl:mr-[45%]">
                <p className="text-center text-2xl tracking-wide text-white/90 text-shadow-lg md:text-left md:text-[1.5rem]/8 md:text-white xl:text-[1.7rem]/9">
                  {subheading}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Intro Blocks 01 & 02 (Positioned 40px from absolute bottom of section) */}
        {activeIntroBlocks.length > 0 && (
          <div className="animate-slide-up pointer-events-none absolute bottom-2 left-0 z-20 my-auto ml-4 flex flex-col gap-2 md:right-3 md:bottom-8 md:ml-[45%] md:gap-4 xl:right-7 xl:ml-[51.5%]">
            {activeIntroBlocks.map((block, idx) => (
              <div
                key={idx}
                className="pointer-events-auto mr-4 border-l-[6px] border-white bg-[#1E3E74]/80 py-0.5 pr-4 pl-3 shadow-2xl"
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
