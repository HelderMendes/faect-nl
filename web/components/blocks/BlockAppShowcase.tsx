import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface App {
  _id: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  icon?: SanityImage;
  category?: string;
}

interface BlockAppShowcaseProps {
  heading?: string;
  subheading?: string;
  apps?: App[];
  showAll?: boolean;
  columns?: number;
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
}

export function BlockAppShowcase({
  heading,
  subheading,
  apps,
  showAll,
  columns = 3,
  ctaText,
  ctaLink,
  settings,
}: BlockAppShowcaseProps) {
  const displayApps = apps || [];

  if (displayApps.length === 0) return null;

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-16 max-w-3xl">
            {heading && (
              <h2 className="font-heading text-faect-navy mb-6 text-3xl font-bold md:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-faect-gray text-xl leading-relaxed">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]} gap-8`}
        >
          {displayApps.map((app) => (
            <div
              key={app._id}
              className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                {app.icon?.asset ? (
                  <Image
                    src={urlFor(app.icon).width(64).height(64).url()}
                    alt={app.title}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="bg-faect-blue/20 h-8 w-8 rounded-full" />
                )}
              </div>

              <h3 className="font-heading text-faect-navy group-hover:text-faect-blue mb-3 text-xl font-bold transition-colors">
                {app.title}
              </h3>

              {app.excerpt && (
                <p className="text-faect-gray mb-8 line-clamp-3">
                  {app.excerpt}
                </p>
              )}

              {app.slug?.current && (
                <Link
                  href={`/faect-apps/${app.slug.current}`}
                  className="text-faect-blue mt-auto inline-flex items-center font-bold transition-all hover:gap-2"
                >
                  Meer informatie
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>

        {ctaText && ctaLink && (
          <div className="mt-16 text-center">
            <Link
              href={ctaLink}
              className="bg-faect-navy font-ui inline-flex items-center justify-center rounded-lg px-10 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all hover:bg-neutral-800"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
