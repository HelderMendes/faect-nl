import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface Service {
  title: string;
  description?: string;
  icon?: SanityImage;
  image?: SanityImage;
  link?: string;
}

interface BlockServiceCardsProps {
  heading?: string;
  subheading?: string;
  services?: Service[];
  columns?: number;
  settings?: SectionSettings;
}

export function BlockServiceCards({
  heading,
  subheading,
  services,
  columns = 3,
  settings,
}: BlockServiceCardsProps) {
  const displayServices = services || [];

  if (displayServices.length === 0) return null;

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-16 text-center">
            {heading && (
              <h2 className="font-heading text-faect-navy mb-4 text-3xl font-bold md:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-faect-gray mx-auto max-w-2xl text-lg">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]} gap-8`}
        >
          {displayServices.map((service, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {service.image?.asset && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(service.image).width(600).height(400).url()}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 flex items-center gap-4">
                  {service.icon?.asset && (
                    <div className="relative h-8 w-8 shrink-0">
                      <Image
                        src={urlFor(service.icon).width(32).height(32).url()}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="font-heading text-faect-navy text-xl font-bold">
                    {service.title}
                  </h3>
                </div>
                {service.description && (
                  <p className="text-faect-gray mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                )}
                {service.link && (
                  <Link
                    href={service.link}
                    className="text-faect-blue mt-auto inline-flex items-center text-sm font-bold transition-all hover:gap-2"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
