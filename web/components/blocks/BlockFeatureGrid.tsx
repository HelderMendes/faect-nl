import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface Feature {
  _key: string;
  title: string;
  description: string;
  icon?: SanityImage;
}

interface BlockFeatureGridProps {
  title?: string;
  features?: Feature[];
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
}

export function BlockFeatureGrid({
  title,
  features,
  ctaText,
  ctaLink,
  settings,
}: BlockFeatureGridProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className={getSectionStyles(settings) + " -mt-10 py-0"}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-faect-blue tracking- mb-12 text-center text-3xl font-medium">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature._key}
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {feature.icon?.asset && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(feature.icon).width(400).height(232).url()}
                    alt={feature.title}
                    width={400}
                    height={232}
                    className="h-auto w-full object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className="text-faect-blue mb-2 text-xl font-semibold tracking-wide">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {ctaText && ctaLink && (
          <div className="mt-12 flex justify-center">
            <Link
              href={ctaLink}
              className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-10 py-1 text-center text-[1.15rem] font-medium transition-all duration-900 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
