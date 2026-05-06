"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Plus } from "lucide-react";
import Image from "next/image";

type CaseStudy = {
  _id: string;
  title: string;
  clientName: string;
  industry: string;
  clientWebsite?: string | null;
  summary?: string | null;
  solution?: string | null;
  logo?: { asset?: { url?: string } } | null;
};

const INDUSTRY_LABELS: Record<string, string> = {
  lease: "Lease",
  productie: "Productie",
  vastgoed: "Vastgoed",
  "supply-chain": "Supply Chain",
  handel: "Handel",
  retail: "Retail",
  dienstverlening: "Dienstverlening",
  bouw: "Bouw",
  overig: "Overig",
};

export function CaseAccordion({ cases }: { cases: CaseStudy[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen((p) => (p === id ? null : id));

  return (
    <div className="flex flex-col gap-3">
      {cases.map((c) => {
        const isOpen = open === c._id;

        return (
          <div
            key={c._id}
            className={[
              "overflow-hidden rounded-2xl bg-white/80 transition-all duration-300",
              isOpen
                ? "border-l-faect-blue border border-l-4 border-gray-100 shadow-lg"
                : "border border-gray-100 shadow-sm hover:shadow-md",
            ].join(" ")}
          >
            {/* ── Trigger ───────────────────────────────────────────── */}
            <button
              onClick={() => toggle(c._id)}
              className="relative flex w-full items-start justify-center gap-4 px-5 py-5 pr-14 text-left sm:justify-start sm:gap-5 sm:px-6 sm:py-6 sm:pr-18"
            >
              {/* Logo */}
              <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 sm:h-28 sm:w-[14rem]">
                {c.logo?.asset?.url ? (
                  <Image
                    src={c.logo.asset.url}
                    alt={c.clientName}
                    width={200}
                    height={120}
                    className="h-10 w-auto object-contain sm:h-24"
                  />
                ) : (
                  <span className="font-heading text-faect-navy text-sm font-bold">
                    {c.clientName.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Name + industry + summary */}
              <div className="min-w-0 sm:flex-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <p className="font-heading text-faect-navy text-xl leading-tight font-bold">
                    {c.clientName}
                  </p>
                  <span className="bg-faect-blue/10 text-faect-blue rounded-md px-4 py-0.75 text-[0.7rem] font-semibold tracking-wider uppercase">
                    {INDUSTRY_LABELS[c.industry] ?? c.industry}
                  </span>
                </div>
                {c.summary && (
                  <p className="mt-1 hidden text-base leading-7 text-gray-600 sm:block">
                    {c.summary}
                  </p>
                )}
              </div>

              {/* Toggle — absolute top-right */}
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={[
                  "absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 sm:top-6 sm:right-6",
                  isOpen
                    ? "bg-faect-blue text-white"
                    : "bg-gray-100 text-gray-500",
                ].join(" ")}
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </motion.div>
            </button>

            {/* ── Panel ─────────────────────────────────────────────── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-100 px-5 pt-7 pb-8 sm:pr-10 sm:pl-[16.5rem]">
                    <h2 className="font-heading text-faect-blue mb-4 text-xl leading-snug font-bold sm:text-2xl">
                      {c.title}
                    </h2>
                    {c.solution && (
                      <p className="text-base leading-7 text-gray-600">
                        {c.solution}
                      </p>
                    )}
                    {c.clientWebsite && (
                      <a
                        href={c.clientWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-faect-blue text-faect-blue nav-item-sweep mt-6 inline-flex gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors duration-200 hover:text-white"
                      >
                        Bezoek {c.clientName}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
