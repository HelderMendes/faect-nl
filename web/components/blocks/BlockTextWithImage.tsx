import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { getSectionStyles, type SectionSettings, cn } from "./sectionUtils";

import type {
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type HeadingSize = "sm" | "default" | "lg" | "xl";

const HEADING_SIZE_CLASSES: Record<HeadingSize, string> = {
  sm: "text-2xl md:text-3xl",
  default: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
};

const richTextComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <s>{children}</s>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-faect-blue underline hover:opacity-75"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-4 leading-8">{children}</p>,
    h1: ({ children }) => (
      <h1 className="mb-4 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 text-2xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 text-xl font-semibold">{children}</h4>
    ),
  },
};

type BlockTextWithImageProps = {
  layout?: "side" | "centered";
  headerTitle?: string;
  heading?: string;
  headingSize?: HeadingSize;
  content?: PortableTextBlock[];
  image?: SanityImage;
  imageUrl?: string;
  imagePosition?: "left" | "right" | "center";
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
};

export function BlockTextWithImage({
  layout = "side",
  headerTitle,
  heading,
  headingSize = "default",
  content,
  image,
  imageUrl,
  imagePosition = "left",
  ctaText,
  ctaLink,
  settings,
}: BlockTextWithImageProps) {
  const hClass =
    HEADING_SIZE_CLASSES[headingSize] ?? HEADING_SIZE_CLASSES.default;

  const resolvedImageSrc =
    image?.asset?.url ||
    (image?.asset?._ref ? urlFor(image).width(800).url() : null) ||
    imageUrl ||
    null;

  // ── Centered layout ────────────────────────────────────────────────────────
  if (layout === "centered" || imagePosition === "center") {
    return (
      <section className={cn(getSectionStyles(settings))}>
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
              <h2
                className={cn(
                  "text-faect-blue font-heading mb-6 max-w-4xl leading-tight font-bold",
                  hClass,
                )}
              >
                {heading}
              </h2>
            )}

            {content && (
              <div className="text-faect-gray mx-auto mb-8 max-w-4xl text-lg leading-8 font-medium">
                <PortableText value={content} components={richTextComponents} />
              </div>
            )}

            {resolvedImageSrc && (
              <div className="mb-32 w-full max-w-2xl overflow-hidden rounded-2xl">
                <Image
                  src={resolvedImageSrc}
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
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-xl border bg-white px-10 py-2.5 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
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
        <div className="text-faect-blue my-6 px-6 text-center text-3xl md:text-4xl lg:-my-4">
          {headerTitle}
        </div>
      )}

      <div className="pb- container mx-auto px-4 lg:px-12">
        <div className="flex grid-cols-1 flex-col space-y-1 lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Image */}
          <div
            className={cn(
              "animate-fade-in mx-0 my-2 py-0 sm:mx-28 md:mx-40 lg:mx-2 lg:my-16 xl:mx-4",
              isImageFirst
                ? "order-last lg:order-first"
                : "order-last lg:order-last",
            )}
          >
            {resolvedImageSrc ? (
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={resolvedImageSrc}
                  alt={heading || ""}
                  width={800}
                  height={560}
                  className="h-auto w-full"
                />
              </div>
            ) : null}
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center gap-3 px-4 sm:px-8 sm:pt-6 md:pt-8 lg:items-start lg:px-0 lg:pt-10">
            {heading && (
              <h2
                className={cn(
                  "font-heading text-faect-blue pt-4 text-center font-semibold lg:text-left",
                  hClass,
                )}
              >
                {heading}
              </h2>
            )}
            {content && (
              <div className="font-work-sans text-faect-gray my-4 space-y-2 text-center text-[1.2rem] font-medium lg:text-left">
                <PortableText value={content} components={richTextComponents} />
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
