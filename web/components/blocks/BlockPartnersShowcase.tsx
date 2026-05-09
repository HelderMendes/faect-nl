import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

type Partner = {
  _id: string;
  name: string;
  logo?: { asset?: { _ref?: string; url?: string } } | null;
  description?: string | null;
  website?: string | null;
};

function PartnerMonogram({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  const initials =
    words.length >= 2
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

  return (
    <div className="bg-faect-navy flex h-14 w-24 items-center justify-center rounded-xl">
      <span className="font-cairo text-2xl font-bold tracking-tight text-white">
        {initials}
      </span>
    </div>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const logoUrl =
    partner.logo?.asset?.url ??
    (partner.logo?.asset?._ref
      ? urlFor(partner.logo).width(240).height(96).url()
      : null);

  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="group hover:border-faect-blue/30 hover:shadow-faect-blue/8 flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {/* Logo zone */}
      <div className="group-hover:bg-faect-blue/5 relative flex h-36 items-center justify-center bg-gray-50/70 px-8 transition-colors duration-300">
        <span className="font-ui group-hover:text-faect-blue/50 absolute top-3.5 right-4 text-xs font-medium tracking-widest text-gray-300 transition-colors duration-300">
          {number}
        </span>

        {logoUrl ? (
          <div className="relative h-14 w-40">
            <Image
              src={logoUrl}
              alt={partner.name}
              fill
              className="object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </div>
        ) : (
          <PartnerMonogram name={partner.name} />
        )}
      </div>

      {/* Separator line — reveals blue on hover */}
      <div className="group-hover:bg-faect-blue/25 h-px bg-gray-100 transition-colors duration-300" />

      {/* Content zone */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="font-cairo text-faect-navy text-xl leading-tight font-bold">
            {partner.name}
          </h3>
          <span className="font-ui bg-faect-blue/8 text-faect-blue mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wider uppercase">
            Partner
          </span>
        </div>

        {partner.description && (
          <p className="text-faect-gray line-clamp-3 flex-1 text-sm leading-relaxed">
            {partner.description}
          </p>
        )}

        {partner.website && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-faect-blue mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:gap-3"
          >
            Meer informatie
            <ExternalLink className="size-3.5 shrink-0" />
          </a>
        )}
      </div>
    </div>
  );
}

export function BlockPartnersShowcase({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;

  return (
    <>
      {/* ── Partners grid ─────────────────────────────────────── */}
      <section className="section-dither pt-20 pb-24 lg:pt-24 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section header */}
          <div className="mb-16 text-center">
            <span className="font-ui bg-faect-blue/10 text-faect-blue mb-5 inline-block rounded-full px-5 py-1.5 text-sm font-semibold tracking-[0.15em] uppercase">
              Ons ecosysteem
            </span>
            <h2 className="font-cairo text-faect-navy mt-5 mb-5 text-4xl font-bold md:text-5xl">
              Strategische partners
            </h2>
            <p className="text-faect-gray mx-auto max-w-2xl text-lg leading-relaxed">
              Wij werken nauw samen met toonaangevende partners in het Microsoft
              Business Central ecosysteem — zodat onze klanten altijd kunnen
              rekenen op de beste expertise en technologie.
            </p>
          </div>

          {/* 4-column card grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <PartnerCard key={partner._id} partner={partner} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-faect-navy block-background-overlay py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <p className="font-ui text-faect-blue/70 mb-4 text-sm font-semibold tracking-[0.15em] uppercase">
            Samenwerken
          </p>
          <h2 className="font-cairo mb-5 text-3xl font-bold text-white md:text-4xl">
            Word ook partner van Faect
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/70">
            Wij zijn altijd op zoek naar gelijkgestemde partners die onze missie
            delen: innovatieve Business Central oplossingen voor ambitieuze
            organisaties.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="nav-item-sweep font-ui hover:text-faect-blue inline-block rounded-[8px] border border-white px-8 py-3 text-[1.05rem] font-semibold text-white transition-all duration-300 hover:ml-2 hover:scale-105"
            >
              Neem contact op
            </Link>
            <Link
              href="/oplossingen"
              className="font-ui border-faect-blue/35 text-faect-light-blue hover:border-faect-blue hover:text-faect-blue inline-flex items-center gap-2 rounded-[8px] border px-8 py-3 text-[1.05rem] font-semibold transition-all duration-300"
            >
              Onze oplossingen
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
