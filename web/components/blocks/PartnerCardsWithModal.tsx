"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "./sectionUtils";

const PARTNER_TYPE_LABELS: Record<string, string> = {
  technology: "Technology Partner",
  implementation: "Implementation Partner",
  isv: "ISV Partner",
  platform: "Platform Partner",
};

type PartnerLogo =
  | { asset?: { _ref?: string; url?: string } }
  | null
  | undefined;

export type PartnerCardData = {
  _id: string;
  name: string;
  logo?: PartnerLogo;
  type?: string | null;
  website?: string | null;
  description?: string | null;
};

export function getLogoSrc(
  logo: PartnerLogo,
  width = 480,
  height = 192,
): string | null {
  if (logo?.asset?.url) return logo.asset.url;
  if (logo?.asset?._ref) return urlFor(logo).width(width).height(height).url();
  return null;
}

function Monogram({ name, large }: { name: string; large?: boolean }) {
  const words = name.trim().split(/\s+/);
  const initials =
    words.length >= 2
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "bg-faect-navy flex items-center justify-center rounded-xl",
        large ? "h-20 w-32" : "h-14 w-24",
      )}
    >
      <span
        className={cn(
          "font-cairo font-bold tracking-tight text-white",
          large ? "text-4xl" : "text-2xl",
        )}
      >
        {initials}
      </span>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────
function PartnerModal({
  partners,
  activeIndex,
  onClose,
  onSelect,
}: {
  partners: PartnerCardData[];
  activeIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const partner = partners[activeIndex];
  const mainSrc = getLogoSrc(partner.logo, 640, 320);
  const typeLabel = (partner.type && PARTNER_TYPE_LABELS[partner.type]) ?? null;
  const paragraphs = (partner.description ?? "").split("\n\n").filter(Boolean);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown")
        onSelect(Math.min(activeIndex + 1, partners.length - 1));
      if (e.key === "ArrowUp") onSelect(Math.max(activeIndex - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onSelect, activeIndex, partners.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar — partner navigation */}
        <aside className="bg-faect-blue/8 hidden w-48 shrink-0 flex-col overflow-y-auto border-r border-gray-100 md:flex">
          <div className="border-b border-gray-100 px-4 pt-3 text-center">
            <p className="font-ui text-faect-navy my-2 text-[0.8rem] font-semibold tracking-[0.05em] uppercase">
              Onze Partners
            </p>
          </div>
          <nav className="flex flex-col gap-4 p-3">
            {partners.map((p, idx) => {
              const thumbSrc = getLogoSrc(p.logo, 240, 96);
              const isActive = idx === activeIndex;
              if (isActive) return null;
              return (
                <button
                  key={p._id}
                  onClick={() => onSelect(idx)}
                  className="flex h-16 w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-gray-300 hover:p-1"
                >
                  {thumbSrc ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={thumbSrc}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="font-cairo text-faect-navy text-xs font-bold">
                      {p.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
          >
            <X className="size-4" />
          </button>

          {/* Scrollable area */}
          <div className="flex-1 overflow-y-auto">
            {/* Logo hero */}
            <div className="flex min-h-[12rem] items-center justify-center bg-gray-50/70 px-12 py-10">
              {mainSrc ? (
                <div className="relative h-40 w-full max-w-[32rem]">
                  <Image
                    src={mainSrc}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <Monogram name={partner.name} large />
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Details */}
            <div className="flex flex-col gap-5 p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="font-cairo text-faect-navy text-4xl font-bold">
                  {partner.name}
                </h2>
                {typeLabel && (
                  <span className="font-ui bg-faect-blue/60 shrink-0 rounded-md px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                    {typeLabel}
                  </span>
                )}
              </div>

              {paragraphs.length > 0 && (
                <div className="text-faect-gray space-y-3 text-[1.2rem]/8 font-medium">
                  {paragraphs.map((para, i) => (
                    <p
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: para.replace(/\n/g, "<br/>"),
                      }}
                    />
                  ))}
                </div>
              )}

              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-faect-blue hover:text-faect-navy text-md mt-2 inline-flex items-center gap-2 pb-2 font-semibold transition-all duration-200 hover:gap-3"
                >
                  Bezoek website
                  <ExternalLink className="size-4.5 shrink-0" />
                </a>
              )}
            </div>
          </div>

          {/* Mobile partner navigation strip — always visible, outside scroll */}
          <div className="bg-faect-blue/8 shrink-0 overflow-x-auto border-t border-gray-100 px-4 py-3 md:hidden">
            <div className="flex gap-2">
              {partners.map((p, idx) => {
                const thumbSrc = getLogoSrc(p.logo, 80, 40);
                if (idx === activeIndex) return null;
                return (
                  <button
                    key={p._id}
                    onClick={() => onSelect(idx)}
                    className="flex h-12 w-20 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 transition-all duration-200 hover:border-gray-300 hover:p-0.5"
                  >
                    {thumbSrc ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={thumbSrc}
                          alt={p.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="font-cairo text-faect-navy text-xs font-bold">
                        {p.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cards grid ─────────────────────────────────────────────────────────────
export function PartnerCardsWithModal({
  partners,
  showDescription,
}: {
  partners: PartnerCardData[];
  showDescription?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner, index) => {
          const src = getLogoSrc(partner.logo, 240, 96);
          const number = String(index + 1).padStart(2, "0");
          const typeLabel =
            (partner.type && PARTNER_TYPE_LABELS[partner.type]) ?? "Partner";

          return (
            <button
              key={partner._id}
              onClick={() => setActiveIndex(index)}
              className="group hover:border-faect-blue/30 hover:shadow-faect-blue/8 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="group-hover:bg-faect-blue/5 relative flex h-36 items-center justify-center bg-gray-50/70 px-8 transition-colors duration-300">
                <span className="font-varela text-faect-blue/5 absolute -top-3.5 right-2 text-[5rem] font-black tracking-tighter transition-colors duration-300 group-hover:text-white">
                  {number}
                </span>
                {src ? (
                  <div className="relative h-22 w-60">
                    <Image
                      src={src}
                      alt={partner.name}
                      fill
                      className="object-contain transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <Monogram name={partner.name} />
                )}
              </div>

              <div className="group-hover:bg-faect-blue/25 h-px bg-gray-100 transition-colors duration-300" />

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="font-cairo text-faect-navy text-2xl leading-tight font-bold">
                    {partner.name}
                  </h3>
                  <span className="font-ui bg-faect-blue/8 text-faect-blue mt-0.5 shrink-0 rounded-md px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wider uppercase">
                    {typeLabel}
                  </span>
                </div>
                {showDescription && partner.description && (
                  <p className="text-faect-gray line-clamp-3 flex-1 text-[1.1rem]/7">
                    {partner.description.replace(/<[^>]+>/g, "")}
                  </p>
                )}
                <span className="text-faect-blue mt-4 inline-flex items-center gap-1.5 text-[.95rem] font-medium transition-all duration-200 group-hover:gap-3">
                  Meer informatie
                  <ChevronRight className="size-4 shrink-0" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <PartnerModal
          partners={partners}
          activeIndex={activeIndex}
          onClose={close}
          onSelect={setActiveIndex}
        />
      )}
    </>
  );
}
