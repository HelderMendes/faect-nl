"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { getSectionStyles, cn, type SectionSettings } from "./sectionUtils";
import { ContactModal } from "@/components/ui/ContactModal";
import type {
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";

type FAQItem = {
  _key: string;
  question: string;
  answer?: PortableTextBlock[];
};

type BlockFAQProps = {
  label?: string;
  heading?: string;
  content?: PortableTextBlock[];
  intro?: string;
  items?: FAQItem[];
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
};

const faqRichTextComponents: PortableTextComponents = {
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
      <ul className="mb-4 list-disc space-y-1 pl-5 text-left">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5 text-left">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
    h1: ({ children }) => (
      <h1 className="mb-3 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="prose text-faect-blue mb-4 border-gray-200 text-2xl font-semibold [:not(:first-child)]:mt-10">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 text-xl font-semibold">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-faect-blue/30 mb-3 border-l-2 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
};

export function BlockFAQ({
  label,
  heading,
  content,
  intro,
  items,
  ctaText,
  settings,
}: BlockFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);

  const faqItems = items ?? [];
  if (faqItems.length === 0) return null;

  return (
    <section className={cn(getSectionStyles(settings), "section-dither py-16")}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Constrained width — intentionally not full-width at xl */}
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          {(label || heading || (content && content.length > 0) || intro) && (
            <div className="mb-12 text-center">
              {label && (
                <p className="hover:text-faect-blue relative mb-6 inline-block border-b-2 border-gray-400 pb-1 text-2xl font-medium text-gray-500 transition-all duration-200">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{label}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              )}
              {heading && (
                <h2 className="font-cairo text-faect-navy mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl/14">
                  {heading}
                </h2>
              )}
              {content && content.length > 0 ? (
                <div className="text-faect-gray mx-auto mt-4 text-[1.2rem]/9 font-medium">
                  <PortableText
                    value={content}
                    components={faqRichTextComponents}
                  />
                </div>
              ) : intro ? (
                <p className="text-faect-gray mx-auto mt-4 text-[1.2rem]/9 font-medium">
                  {intro}
                </p>
              ) : null}
            </div>
          )}

          {/* Accordion */}
          <div className="divide-faect-blue/20 divide-y border-t border-b border-gray-200">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item._key}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center gap-4 py-5 text-left transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    {/* +/− icon */}
                    <span
                      className={cn(
                        "text-faect-blue flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-lg font-light transition-all duration-300",
                        isOpen
                          ? "border-faect-blue bg-faect-blue text-white"
                          : "border-faect-blue/40 group-hover:border-faect-blue",
                      )}
                    >
                      {isOpen ? "−" : "+"}
                    </span>

                    <span
                      className={cn(
                        "flex-1 text-[1.15rem] font-semibold transition-colors duration-200",
                        isOpen
                          ? "text-faect-blue"
                          : "text-faect-navy group-hover:text-faect-blue",
                      )}
                    >
                      {item.question}
                    </span>
                  </button>

                  {/* Answer — height transition via grid rows trick */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      {item.answer && (
                        <div className="border-faect-blue/30 text-faect-gray mb-5 border-l-2 pl-11 text-[1.05rem]/7 font-medium">
                          <PortableText
                            value={item.answer}
                            components={faqRichTextComponents}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA — opens modal instead of navigating */}
          {ctaText && (
            <div className="mt-12 mb-8 flex justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-10 py-2.5 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
              >
                {ctaText}
              </button>
            </div>
          )}

          <ContactModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Stel je vraag"
            description="Staat jouw vraag er niet bij? We beantwoorden hem zo snel mogelijk."
            subject="FAQ vraag via faect.nl"
          />
        </div>
      </div>
    </section>
  );
}
