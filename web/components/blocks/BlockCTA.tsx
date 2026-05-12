import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface BlockCTAProps {
  heading: string;
  text?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: { asset?: { _ref?: string; url?: string } };
}

export function BlockCTA({
  heading,
  text,
  ctaText,
  ctaLink,
  backgroundImage,
}: BlockCTAProps) {
  return (
    <section className="section-dither relative overflow-visible pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-34 lg:pb-24">
      <>
        {/* Zero-size SVG — only carries the clip path definition */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <clipPath id="cta-clip" clipPathUnits="objectBoundingBox">
              {/* Arch top only — no bottom crop */}
              <path d="M0,0.1 Q0.5,0 1,0.1 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Image container — clip path applied here, not on the SVG */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "url(#cta-clip)" }}
        >
          {backgroundImage?.asset && (
            <Image
              src={
                backgroundImage.asset.url ||
                urlFor(backgroundImage).width(1920).height(500).url()
              }
              alt={heading}
              fill
              className="object-cover object-bottom"
              priority
            />
          )}
        </div>
      </>

      <div className="relative z-10 container mx-auto px-8 pb-7 text-center lg:px-0">
        <h2 className="font-cairo text-faect-blue mb-4 text-4xl font-bold md:text-6xl">
          {heading}
        </h2>
        {text && (
          <p className="mx-auto mb-10 max-w-4xl text-[1.25rem]/9 font-semibold text-white/90 sm:text-[1.3rem]/10 lg:text-[1.4rem]/11">
            {text}
          </p>
        )}
        <Link
          href={ctaLink}
          className="font-ui nav-item-sweep -mt-4 inline-block rounded-[8px] border border-white bg-transparent px-10 py-3 text-[1.2rem] font-semibold text-white/90 transition-all duration-300 hover:ml-2 hover:scale-105 hover:text-white lg:mt-0"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
