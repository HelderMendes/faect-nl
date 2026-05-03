import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface HeroProps {
  heading: string;
  subheading?: string;
  backgroundImage?: SanityImage | string;
  ctaText?: string;
  ctaLink?: string;
}

export function Hero({
  heading,
  subheading,
  backgroundImage,
  ctaText,
  ctaLink,
}: HeroProps) {
  return (
    <section className="bg-faect-navy relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      {backgroundImage && (
        <div className="absolute inset-0 z-0 min-h-150 opacity-20">
          <Image
            src={
              typeof backgroundImage === "string"
                ? backgroundImage
                : urlFor(backgroundImage).width(1920).height(1080).url()
            }
            alt={heading}
            fill
            className="object-cover object-[center_bottom]"
            priority
          />
          <div className="from-faect-navy via-faect-navy/80 absolute inset-0 bg-linear-to-r to-transparent" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {heading}
          </h1>
          {subheading && (
            <p className="text-faect-blue max-w-xl text-lg md:text-xl">
              {subheading}
            </p>
          )}
          {ctaText && ctaLink && (
            <div className="pt-4">
              <Link
                href={ctaLink}
                className="bg-faect-blue inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
