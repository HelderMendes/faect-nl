import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { getSectionStyles, type SectionSettings, cn } from "./sectionUtils";

import type { PortableTextBlock } from "@portabletext/react";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface BlockTextWithImageProps {
  layout?: "side" | "centered";
  headerTitle?: string;
  heading?: string;
  content?: PortableTextBlock[];
  image?: SanityImage;
  imagePosition?: "left" | "right" | "center";
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
}

export function BlockTextWithImage({
  layout = "side",
  headerTitle,
  heading,
  content,
  image,
  imagePosition = "left",
  ctaText,
  ctaLink,
  settings,
}: BlockTextWithImageProps) {
  // ── Centered layout ────────────────────────────────────────────────────────
  if (layout === "centered" || imagePosition === "center") {
    return (
      <section
        className={(getSectionStyles(settings), "section-dither -mb-8 pt-16")}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {headerTitle && (
              <p className="hover:text-faect-blue relative mb-6 border-b-3 border-gray-400 pb-1 text-2xl font-medium text-gray-500 transition-all duration-200">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {headerTitle}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            )}

            {heading && (
              <h2 className="text-faect-blue font-heading mb-6 max-w-4xl text-4xl leading-tight font-bold md:text-5xl lg:text-6xl/16">
                {heading}
              </h2>
            )}

            {content && (
              <div className="text-faect-gray mx-auto mb-8 max-w-4xl text-lg leading-8 font-medium">
                <PortableText
                  value={content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="mb-4">{children}</p>
                      ),
                    },
                  }}
                />
              </div>
            )}

            {image?.asset && (
              <div className="mb-32 w-full max-w-2xl overflow-hidden rounded-xl">
                <Image
                  src={image.asset.url || urlFor(image).width(900).url()}
                  alt={heading ?? ""}
                  width={900}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="border-faect-blue text-faect-blue hover:bg-faect-blue mt-8 inline-block rounded-lg border-2 px-10 py-3 font-semibold transition-colors hover:text-white"
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── Side layout (default) ──────────────────────────────────────────────────
  const isImageFirst = imagePosition === "left";

  return (
    <section className={getSectionStyles(settings)}>
      {headerTitle && (
        <div className="text-faect-blue my-2 px-6 text-center text-3xl md:text-4xl lg:-my-4">
          {headerTitle}
        </div>
      )}

      <div className="container mx-auto px-4 pb-1 lg:px-12">
        <div className="flex grid-cols-1 flex-col space-y-1 lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Image */}
          <div
            className={cn(
              "animate-fade-in mx-0 my-2 py-0 md:mx-8 md:my-6 md:py-4 lg:mx-2 xl:mx-4",
              isImageFirst
                ? "order-last lg:order-first"
                : "order-last lg:order-last",
            )}
          >
            {image?.asset ? (
              <Image
                src={image.asset.url || urlFor(image).width(800).url()}
                alt={heading || ""}
                width={800}
                height={560}
                className="mx-auto h-auto max-h-[280px] max-w-full object-contain sm:max-h-[360px] lg:max-h-none lg:max-w-full"
              />
            ) : null}
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center gap-3 px-4 sm:px-8 sm:pt-6 md:pt-8 lg:items-start lg:px-0 lg:pt-10">
            {heading && (
              <h2 className="font-heading text-faect-blue pt-4 text-center text-2xl font-semibold lg:text-left">
                {heading}
              </h2>
            )}
            {content && (
              <div className="font-work-sans text-faect-gray my-4 space-y-2 text-center text-[1.2rem] font-medium lg:text-left">
                <PortableText
                  value={content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="leading-8">{children}</p>
                      ),
                    },
                  }}
                />
              </div>
            )}
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep lg:align-middle-left inline-block rounded-[8px] border bg-white px-10 py-1 text-[1.15rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
