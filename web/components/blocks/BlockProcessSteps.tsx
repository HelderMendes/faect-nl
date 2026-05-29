"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import DownloadPDFButton from "../DownloadPDFButton";
import { usePathname } from "next/navigation";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface Step {
  title: string;
  description?: string;
  icon?: SanityImage;
}

interface BlockProcessStepsProps {
  label?: string;
  heading?: string;
  content?: PortableTextBlock[];
  subheading?: string;
  introImage?: SanityImage;
  steps?: Step[];
  layout?: "horizontal" | "vertical" | "numbered" | "cards";
  settings?: SectionSettings;
}

export function BlockProcessSteps({
  label,
  heading,
  content,
  subheading,
  introImage,
  steps,
  layout = "horizontal",
  settings,
}: BlockProcessStepsProps) {
  const displaySteps = steps || [];
  const pathname = usePathname();

  const showDownloadButton = pathname === "/upgraden-naar-business-central";
  const useSmallTitle =
    pathname === "/overstappen-naar-business-central-de-slimme-keuze";

  if (displaySteps.length === 0) return null;

  return (
    <div className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[33%_1fr]">
          {/* Left column: label + heading + body + image + CTA links */}
          {(label ||
            heading ||
            (content && content.length > 0) ||
            subheading ||
            introImage?.asset) && (
            <section className="mx-4 mb-8 flex flex-col items-center justify-start md:px-15 lg:px-30 xl:items-start xl:px-0">
              {label && (
                <p className="hover:text-faect-blue relative mb-6 border-b-2 border-gray-400 pb-1 text-2xl font-medium text-gray-500 transition-all duration-200">
                  <span className="xl:hidden">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  {label}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              )}
              {useSmallTitle
                ? heading && (
                    <h2 className="font-cairo text-faect-blue mb-3 text-center text-3xl font-extrabold tracking-tight md:text-4xl/11 xl:text-left">
                      {heading}
                    </h2>
                  )
                : heading && (
                    <h2 className="font-cairo text-faect-blue mb-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl/14 lg:mb-6 lg:text-6xl/16 xl:text-left">
                      {heading}
                    </h2>
                  )}

              {content && content.length > 0 ? (
                <div className="text-center text-[1.3rem]/8 font-medium text-gray-700 xl:text-left">
                  <PortableText
                    value={content}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="mb-3 last:mb-0">{children}</p>
                        ),
                      },
                    }}
                  />
                </div>
              ) : subheading ? (
                <p className="text-center text-[1.3rem]/8 font-medium text-gray-700 xl:text-left">
                  {subheading}
                </p>
              ) : null}
              {introImage?.asset && (
                <div className="mx-auto mt-8 w-full max-w-xs overflow-hidden rounded-xl xl:mt-10">
                  <Image
                    src={urlFor(introImage).width(700).height(1120).url()}
                    alt={heading || label || "Process illustration"}
                    width={700}
                    height={1120}
                    className="h-auto w-full object-cover"
                  />
                  {showDownloadButton && (
                    <div className="mt-10">
                      <DownloadPDFButton
                        pdfUrl="/pdfs/NAV%20upgrade%2010%20stappenplan.pdf"
                        fileName="Microsoft-Cloud-Voordelen.pdf"
                      >
                        Download Brochure
                      </DownloadPDFButton>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Right column: 2 3 2 1-column – Cards layout */}
          {layout === "cards" && (
            <section className="mx-4 grid grid-cols-1 gap-x-12 md:mx-12 md:grid-cols-2 lg:mx-3 lg:grid-cols-3 xl:mx-0 xl:grid-cols-2">
              {displaySteps.map((step, index) => (
                <div
                  key={index}
                  className="border-faect-blue group relative flex flex-col border-t-2 py-8 transition-all duration-300"
                >
                  {/* Large decorative step number */}
                  <span className="text-faect-blue/10 font-heading absolute top-6 right-0 text-[6rem] leading-none font-bold select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Step number badge */}
                  <div className="bg-faect-blue mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                    <span className="font-heading text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {step.icon?.asset && (
                    <div className="mb-4 h-12 w-12 shrink-0">
                      <Image
                        src={urlFor(step.icon).width(48).height(48).url()}
                        alt={step.title}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}

                  <h3 className="text-faect-navy mb-3 text-xl leading-snug font-bold">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-faect-gray text-base leading-7">
                      {step.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Horizontal layout */}
          {layout === "horizontal" && (
            <div className="mx-2 -mt-6 grid grid-cols-1 gap-8 gap-x-12 px-0 md:mx-4 md:grid-cols-2 lg:mx-3 lg:grid-cols-3 lg:gap-14 xl:mx-0 xl:mt-4 xl:grid-cols-2">
              {displaySteps.map((step, index) => (
                <div
                  key={index}
                  className="group text-center-center border-faect-blue relative flex flex-col border-t-2 xl:text-left"
                >
                  <span className="font-heading bg-faect-blue/20 border-faect-blue/20 absolute top-2 right-2 z-20 ml-auto inline-block rounded-full border-4 px-4 py-2 text-right text-[1.3rem]/7 font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="group-hover:border-faect-blue relative z-10 my-3 flex h-20 w-20 items-center justify-center transition-all xl:justify-start">
                    {step.icon?.asset ? (
                      <div className="h-30 w-30">
                        <Image
                          src={urlFor(step.icon).width(120).height(120).url()}
                          alt={step.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="font-heading text-faect-blue text-2xl font-bold">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-faect-navy mb-2 text-2xl/7 font-bold">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-faect-gray text-medium text-lg/7">
                      {step.description}
                      {step.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Vertical layout */}
          {layout === "vertical" && (
            <div className="mx-auto max-w-4xl space-y-12">
              {displaySteps.map((step, index) => (
                <div key={index} className="group flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-faect-navy group-hover:bg-faect-blue relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-white transition-colors">
                      {index + 1}
                    </div>
                    {index < displaySteps.length - 1 && (
                      <div className="my-2 -mt-2 h-full w-0.5 bg-gray-100" />
                    )}
                  </div>
                  <div className="pb-12">
                    <h3 className="font-heading text-faect-navy mb-4 text-2xl font-bold">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-faect-gray text-lg leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
