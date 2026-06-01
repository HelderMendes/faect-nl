"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { getSectionStyles, type SectionSettings, cn } from "./sectionUtils";
import { usePathname } from "next/navigation";

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

type InsightCard = {
  title: string;
  body: string;
};

function plainTextFromPortableText(blocks?: PortableTextBlock[]) {
  if (!blocks || blocks.length === 0) return [];

  return blocks
    .map((block) => {
      if (!("children" in block) || !Array.isArray(block.children)) return "";

      return block.children
        .map((child) => {
          if (typeof child !== "object" || child === null) return "";
          if (!("text" in child)) return "";
          return typeof child.text === "string" ? child.text : "";
        })
        .join("")
        .trim();
    })
    .filter(Boolean);
}

function extractCapabilityChips(paragraph: string) {
  const normalized = paragraph
    .replace(/^.*omvatten\s*/i, "")
    .replace(/^.*waaronder\s*/i, "")
    .replace(/\.$/, "")
    .trim();

  if (!normalized) return [];

  return normalized
    .replace(/\sen\s/gi, ", ")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function extractInsightCards(paragraph: string): InsightCard[] {
  const sentenceMatches = paragraph.match(/[^.!?]+[.!?]?/g) ?? [];
  const cleaned = sentenceMatches
    .map((sentence) => sentence.replace(/\s+/g, " ").trim())
    .filter((sentence) => sentence.length > 18);

  return cleaned.slice(0, 3).map((sentence) => {
    const withoutPunctuation = sentence.replace(/[.!?]+$/, "");
    const words = withoutPunctuation.split(" ").filter(Boolean);
    const title = words.slice(0, 3).join(" ");
    const body = words.slice(3).join(" ") || withoutPunctuation;
    return { title, body };
  });
}

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
  _key?: string;

  sectionId?: string;
  secttionId?: string;
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
  _key,
  sectionId,
  secttionId,
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
  const pathname = usePathname();
  const resolvedSectionId = sectionId ?? secttionId;
  const isVerschilTussenPage =
    pathname ===
    "/wat-is-het-verschil-tussen-navision-en-microsoft-dynamics-365-business-central";
  const isColExtraSpaceSection = resolvedSectionId === "colExtraSpace";
  const isBcPowerSection =
    isVerschilTussenPage &&
    (_key === "54a4baa57db0" || resolvedSectionId === "bc-power-redesign");

  const hClass =
    HEADING_SIZE_CLASSES[headingSize] ?? HEADING_SIZE_CLASSES.default;

  const resolvedImageSrc =
    image?.asset?.url ||
    (image?.asset?._ref ? urlFor(image).width(800).url() : null) ||
    imageUrl ||
    null;

  const contentParagraphs = plainTextFromPortableText(content);
  const capabilityChips = extractCapabilityChips(contentParagraphs[0] ?? "");
  const insightCards = extractInsightCards(contentParagraphs[1] ?? "");

  // ── Centered layout ────────────────────────────────────────────────────────
  if (layout === "centered" || imagePosition === "center") {
    return (
      <section className={cn(getSectionStyles(settings))} data-block-key={_key}>
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

  if (layout === "side" && isBcPowerSection) {
    return (
      <section
        className={cn(
          getSectionStyles(settings),
          "relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(45,126,197,0.14),rgba(255,255,255,0.96)_46%,rgba(255,255,255,1)_100%)]",
        )}
        data-block-key={_key}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(31,98,171,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,98,171,0.08)_1px,transparent_1px)] bg-size-[48px_48px] opacity-30" />

        <div className="relative container mx-auto px-4 pb-14 lg:px-10">
          <div className="mx-auto max-w-6xl text-center">
            {headerTitle && (
              <p className="text-faect-blue/85 border-faect-blue/20 mb-4 inline-block rounded-full border bg-white/70 px-5 py-2 text-sm font-semibold tracking-wide uppercase">
                {headerTitle}
              </p>
            )}

            {heading && (
              <h2
                className={cn(
                  "text-faect-blue font-heading mx-auto mb-6 max-w-5xl leading-tight font-semibold",
                  hClass,
                )}
              >
                {heading}
              </h2>
            )}

            {contentParagraphs[0] && (
              <p className="text-faect-gray mx-auto max-w-5xl text-lg leading-8 md:text-xl">
                {contentParagraphs[0]}
              </p>
            )}

            {capabilityChips.length > 0 && (
              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {capabilityChips.map((chip) => (
                  <li
                    key={chip}
                    className="text-faect-navy flex items-center gap-2 text-lg font-medium md:text-xl"
                  >
                    <span className="text-faect-blue text-base" aria-hidden>
                      ●
                    </span>
                    {chip}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr]">
            {resolvedImageSrc && (
              <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-2 shadow-[0_18px_44px_rgba(23,64,111,0.16)]">
                <Image
                  src={resolvedImageSrc}
                  alt={heading || ""}
                  width={900}
                  height={620}
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-5">
              {insightCards.length > 0 ? (
                insightCards.map((card) => (
                  <article
                    key={card.title + card.body}
                    className="border-faect-blue/10 rounded-2xl border bg-white/85 p-6 text-left shadow-[0_12px_28px_rgba(23,64,111,0.10)]"
                  >
                    <h3 className="text-faect-blue mb-2 text-2xl font-semibold">
                      {card.title}
                    </h3>
                    <p className="text-faect-gray text-lg leading-8">
                      {card.body}
                    </p>
                  </article>
                ))
              ) : content ? (
                <article className="border-faect-blue/10 rounded-2xl border bg-white/85 p-6 text-left shadow-[0_12px_28px_rgba(23,64,111,0.10)]">
                  <div className="font-work-sans text-faect-gray text-[1.1rem]/8">
                    <PortableText
                      value={content}
                      components={richTextComponents}
                    />
                  </div>
                </article>
              ) : null}

              {ctaText && ctaLink && (
                <Link
                  href={ctaLink}
                  className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center rounded-[10px] border bg-white px-10 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
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

  return (
    <section className={getSectionStyles(settings)} data-block-key={_key}>
      {headerTitle && (
        <div
          className={cn(
            "text-faect-blue my-6 px-6 text-center text-3xl md:text-4xl lg:-my-4",
            isColExtraSpaceSection &&
              "mx-auto max-w-5xl text-xl font-semibold text-gray-700 sm:text-2xl md:text-3xl",
          )}
        >
          {isColExtraSpaceSection && isVerschilTussenPage ? (
            <p className="-mb-6 pt-12 text-left md:mb-0 lg:text-center">
              {headerTitle}
            </p>
          ) : (
            headerTitle
          )}
        </div>
      )}

      {/* Container */}
      <div className="container mx-auto px-4 pb-12 lg:px-12">
        <div
          className={cn(
            "grid grid-cols-1 gap-8 lg:gap-10",
            isColExtraSpaceSection && isVerschilTussenPage
              ? "lg:grid-cols-[1fr_2fr]"
              : "lg:grid-cols-2",
          )}
        >
          {/* Image */}
          <div
            className={cn(
              "animate-fade-in mx-0 my-2 py-0 sm:mx-28 md:mx-40 lg:mx-2 lg:my-16 xl:mx-4",
              isImageFirst ? "lg:order-first" : "lg:order-last",
            )}
          >
            {resolvedImageSrc && (
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={resolvedImageSrc}
                  alt={heading || ""}
                  width={800}
                  height={560}
                  className={cn(
                    "h-auto w-full object-cover",
                    isColExtraSpaceSection &&
                      isVerschilTussenPage &&
                      "mx-auto max-w-sm lg:mx-0 lg:max-w-lg",
                  )}
                />
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center gap-3 px-4 sm:px-8 sm:pt-6 md:pt-8 lg:items-start lg:px-0 lg:pt-10">
            {heading && (
              <h2
                className={cn(
                  "font-heading text-faect-blue pt-4 text-center font-semibold lg:text-left",
                  hClass,
                  isVerschilTussenPage && "text-left",
                )}
              >
                {heading}
              </h2>
            )}

            {content && (
              <div
                className={cn(
                  "font-work-sans text-faect-gray my-4 space-y-2 text-center text-[1.2rem] font-medium lg:text-left",
                  isVerschilTussenPage && "text-left",
                )}
              >
                <PortableText value={content} components={richTextComponents} />
              </div>
            )}

            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className={cn(
                  "border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-10 py-1 text-[1.15rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white",
                  isVerschilTussenPage && "text-left",
                  isVerschilTussenPage && "text-left",
                )}
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
