"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

interface FAQItem {
  _key: string;
  question: string;
  answer?: any[];
}

interface BlockFAQProps {
  heading?: string;
  subheading?: string;
  items?: FAQItem[];
  sourceType?: "manual" | "reference";
  faqReferences?: any[];
  settings?: SectionSettings;
}

export function BlockFAQ({
  heading,
  subheading,
  items,
  sourceType = "manual",
  settings,
}: BlockFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = items || [];

  if (faqItems.length === 0) return null;

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {(heading || subheading) && (
            <div className="mb-12 text-center">
              {heading && (
                <h2 className="text-faect-navy mb-4 text-3xl font-bold">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-lg text-gray-600">{subheading}</p>
              )}
            </div>
          )}

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={item._key}
                className="overflow-hidden rounded-lg border border-gray-200"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between bg-white px-6 py-4 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="text-faect-navy pr-4 font-semibold">
                    {item.question}
                  </span>
                  <svg
                    className={`text-faect-blue h-5 w-5 shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && item.answer && (
                  <div className="px-6 pb-4 text-gray-600">
                    <div className="prose prose-sm max-w-none">
                      <PortableText value={item.answer} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
