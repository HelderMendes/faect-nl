"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, cn, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type AccordionDetail = {
  _key: string;
  label: string;
  text: string;
};

type AccordionItem = {
  _key: string;
  title: string;
  description?: string;
  details?: AccordionDetail[];
};

type BlockTextWithAccordionProps = {
  label?: string;
  heading?: string;
  body?: string;
  image?: SanityImage;
  items?: AccordionItem[];
  settings?: SectionSettings;
};

export function BlockTextWithAccordion({
  label,
  heading,
  body,
  image,
  items,
  settings,
}: BlockTextWithAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  const toggle = (index: number) =>
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });

  const allOpen =
    (items?.length ?? 0) > 0 && openItems.size === (items?.length ?? 0);

  const toggleAll = () =>
    setOpenItems(allOpen ? new Set() : new Set(items?.map((_, i) => i)));

  return (
    <section
      className={cn(
        getSectionStyles(settings),
        "section-dither bg-[url(/home/Faect-bkg_logo.png)] bg-bottom-right py-22 contain-content",
      )}
    >
      <div className="pb00 container mx-auto px-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-8">
        {/* Left column */}
        <div className="pb-4 text-center lg:text-left">
          {label && (
            <div className="mb-6 flex items-center justify-center lg:justify-end">
              <span className="group hover:text-faect-blue relative text-2xl font-medium text-gray-500 underline decoration-2 underline-offset-8 transition-all duration-200">
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{label} */}
              </span>{" "}
            </div>
          )}
          {heading && (
            <h2 className="text-faect-blue mb-6 text-5xl leading-tight font-bold lg:text-right lg:text-6xl">
              <ItalicFirstWords text={heading} count={3} />
            </h2>
          )}
          {body && (
            <p className="font-work-sans text-faect-gray mt-4 mb-6 space-y-2 text-[1.2rem]/8 font-medium">
              {body}
            </p>
          )}
          {image?.asset && (
            <div className="mx-auto mb-0 max-w-2xl sm:w-full md:w-[70%] lg:w-full">
              <Image
                src={image.asset.url || urlFor(image).width(700).url()}
                alt={heading ?? ""}
                width={700}
                height={480}
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          )}
        </div>
        {/* Right column: accordion */}
        {items && items.length > 0 && (
          <div className="bg-contain bg-no-repeat pb-4 lg:bg-[url(/home/Faect-bkg_logo.png)]">
            <div className="mb-2 flex justify-end">
              <button
                onClick={toggleAll}
                className="bg-faect-blue/80 hover:bg-faect-blue hover:border-faect-navy rounded-lg border-2 border-white px-6 py-1.5 text-sm font-medium text-white transition-opacity"
              >
                Alles {allOpen ? " sluiten" : " openen"}
                {/* {allOpen ? "Collapse all" : "Expand all"}  */}
              </button>
            </div>
            <div className="divide-faect-blue divide-y">
              {items.map((item, index) => {
                const isOpen = openItems.has(index);
                return (
                  <div key={item._key}>
                    <button
                      onClick={() => toggle(index)}
                      className="flex w-full items-center gap-3 py-4 text-left transition-colors duration-200"
                    >
                      <span
                        className={`transition-transform duration-200 ${isOpen ? "text-faect-blue rotate-90" : "text-faect-navy"}`}
                      >
                        ▶
                      </span>
                      <span
                        className={`text-xl font-medium transition-colors duration-200 ${isOpen ? "text-faect-blue" : "text-gray-700"}`}
                      >
                        {item.title}
                      </span>
                    </button>

                    {/* Expandable content */}
                    <div
                      className={`mb-2 overflow-hidden font-sans text-[1.07rem]/7 font-medium transition-all duration-300 ${isOpen ? "pb-2" : "max-h-0"}`}
                    >
                      {item.description && (
                        <p className="text-gray-500">{item.description}</p>
                      )}
                      {item.details?.map((detail) => (
                        <p key={detail._key} className="mb-1 text-gray-600">
                          <span className="text-faect-blue">
                            {detail.label}
                          </span>{" "}
                          {detail.text}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ItalicFirstWords({
  text,
  count = 3,
}: {
  text: string;
  count?: number;
}) {
  const words = text.trim().split(/\s+/);
  const italicPart = words.slice(0, count).join(" ");
  const normalPart = words.slice(count).join(" ");

  return (
    <>
      <span className="italic">{italicPart}</span>
      {normalPart && <> {normalPart}</>}
    </>
  );
}
