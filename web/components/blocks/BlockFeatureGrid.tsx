import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { getSectionStyles, cn, type SectionSettings } from "./sectionUtils";
import type { PortableTextBlock } from "@portabletext/react";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type Feature = {
  _key: string;
  title: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  description?: string;
  icon?: SanityImage;
};

const GRID_COLS: Record<string, string> = {
  "3": "md:grid-cols-2 lg:grid-cols-3",
  "4": "md:grid-cols-2 lg:grid-cols-4",
};

type BlockFeatureGridProps = {
  layout?: "grid" | "numbered-cards" | "icon-list-2col";
  title?: string;
  subtitle?: string;
  gridCols?: "3" | "4";
  features?: Feature[];
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
};

function NumberedFeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <article className="group hover:border-faect-blue/20 bg-faect-light-blue/10 relative mt-10 flex flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Watermark number */}
      <span className="font-cairo pointer-events-none absolute top-3 right-4 text-[7rem] leading-none font-extrabold text-white/35 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Card header */}
      <div className="border-faect-blue relative border-t-4 px-6 pt-6 pb-2">
        <h3 className="text-faect-navy text-2xl/7 font-semibold font-stretch-95%">
          {feature.title}
        </h3>
        {feature.subtitle && (
          <p className="text-faect-blue -mb-1 text-[1.1rem]/6 font-semibold">
            {feature.subtitle}
          </p>
        )}
      </div>

      {/* Rich body */}
      {feature.body && feature.body.length > 0 ? (
        <div className="space-y-2 px-6 pb-5 text-[1rem]/7 text-gray-700">
          <PortableText
            value={feature.body}
            components={{
              block: {
                normal: ({ children }) => <p>{children}</p>,
              },
              marks: {
                strong: ({ children }) => (
                  <strong className="font-semibold opacity-70">
                    {children}
                  </strong>
                ),
              },
            }}
          />
        </div>
      ) : feature.description ? (
        <p className="text-faect-gray px-6 py-4 text-[1rem]/7">
          {feature.description}
        </p>
      ) : null}
    </article>
  );
}

export function BlockFeatureGrid({
  layout = "grid",
  title,
  subtitle,
  gridCols = "3",
  features,
  ctaText,
  ctaLink,
  settings,
}: BlockFeatureGridProps) {
  if (!features || features.length === 0) return null;

  if (layout === "icon-list-2col") {
    return (
      <section className={getSectionStyles(settings) + ""}>
        <div className="container mx-auto px-8">
          {title && (
            <h2 className="text-faect-blue m-auto mb-3 max-w-4xl text-center text-3xl font-medium md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-faect-gray mx-auto mb-8 max-w-4xl text-center leading-relaxed lg:mb-10">
              {subtitle}
            </p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2 lg:mt-16">
            {features.map((feature) => (
              <article key={feature._key} className="text-center md:text-left">
                <div className="flex flex-col items-center md:flex-row md:items-end md:gap-3">
                  {feature.icon?.asset && (
                    <div className="h-12 w-12 shrink-0 md:mt-1">
                      <Image
                        src={urlFor(feature.icon).width(96).height(96).url()}
                        alt={feature.title}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-faect-navy mb-[.4rem] text-[1.4rem] font-medium tracking-tight md:text-[1.6rem]/8">
                    {feature.title}
                  </h3>
                </div>

                {feature.body && feature.body.length > 0 ? (
                  <div className="text-faect-gray text-[1.05rem]/8 font-normal lg:text-[1.1rem]/8">
                    <PortableText
                      value={feature.body}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                        },
                      }}
                    />
                  </div>
                ) : feature.description ? (
                  <p className="text-faect-gray text-[1.05rem]/8 font-normal lg:text-[1.1rem]/8">
                    {feature.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          {ctaText && ctaLink && (
            <div className="mt-12 flex justify-center">
              <Link
                href={ctaLink}
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-10 py-1 text-center text-[1.15rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (layout === "numbered-cards") {
    return (
      <section
        className={cn(getSectionStyles(settings), "section-dither-flipped")}
      >
        <div className="container mx-auto -mt-6 px-4 pb-16 lg:px-8">
          {title && (
            <h2 className="text-faect-blue mx-2 mb-2 max-w-4xl text-center text-3xl font-semibold lg:mx-auto lg:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-faect-gray mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mx-0 my-2 lg:mx-2 lg:mb-16 xl:mx-4">
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <NumberedFeatureCard
                  key={feature._key}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
            {ctaText && ctaLink && (
              <div className="mt-12 flex justify-center">
                <Link
                  href={ctaLink}
                  className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-10 py-1 text-center text-[1.15rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
                >
                  {ctaText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── Default grid layout ────────────────────────────────────────────────────
  return (
    <section className={getSectionStyles(settings) + " -mt-10 py-0"}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-faect-blue m-auto mb-2 max-w-4xl text-center text-3xl font-medium md:text-4xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-faect-gray mx-auto mb-4 max-w-4xl text-center leading-relaxed">
            {subtitle}
          </p>
        )}
        <div
          className={cn(
            "grid grid-cols-1 gap-8 text-center",
            GRID_COLS[gridCols] ?? GRID_COLS["3"],
          )}
        >
          {features.map((feature) => (
            <div
              key={feature._key}
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {feature.icon?.asset && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(feature.icon).width(400).height(232).url()}
                    alt={feature.title}
                    width={400}
                    height={232}
                    className="h-auto w-full object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className="text-faect-blue mb-2 text-xl font-semibold tracking-wide">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {ctaText && ctaLink && (
          <div className="mt-12 flex justify-center">
            <Link
              href={ctaLink}
              className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-10 py-1 text-center text-[1.15rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
