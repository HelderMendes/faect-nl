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
  headerTitle?: string;
  heading?: string;
  content?: PortableTextBlock[];
  image?: SanityImage;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
}

export function BlockTextWithImage({
  headerTitle,
  heading,
  content,
  image,
  imagePosition = "left",
  ctaText,
  ctaLink,
  settings,
}: BlockTextWithImageProps) {
  const isImageFirst = imagePosition === "left";

  return (
    <section className={cn("pt-100", getSectionStyles(settings))}>
      {headerTitle && (
        <div className="text-faect-blue my-2 px-6 text-center text-3xl md:text-4xl lg:-my-4">
          {headerTitle}
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Image */}
          <div
            className={cn(
              "animate-fade-in relative m-4 h-80 md:mx-36 md:h-110 lg:mx-2 xl:mx-4",
              isImageFirst
                ? "order-last lg:order-first"
                : "order-first lg:order-last",
            )}
          >
            {image?.asset ? (
              <Image
                src={image.asset.url || urlFor(image).width(500).url()}
                alt={heading || ""}
                fill
                className="object-contain" // Use object-contain for illustrations
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-50">
                <span className="text-gray-300">Image</span>
              </div>
            )}
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
