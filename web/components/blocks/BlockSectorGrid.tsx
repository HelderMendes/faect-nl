import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

interface Sector {
  title: string;
  description?: string;
  icon?: any;
  link?: string;
}

interface BlockSectorGridProps {
  heading?: string;
  subheading?: string;
  sectors?: Sector[];
  columns?: number;
  settings?: SectionSettings;
}

export function BlockSectorGrid({
  heading,
  subheading,
  sectors,
  columns = 4,
  settings,
}: BlockSectorGridProps) {
  const displaySectors = sectors || [];

  if (displaySectors.length === 0) return null;

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
          className={`grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]} gap-6`}
        >
          {displaySectors.map((sector, index) => {
            const content = (
              <div className="group flex h-full flex-col items-center rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {sector.icon?.asset && (
                  <div className="bg-faect-blue/5 group-hover:bg-faect-blue/10 relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                    <Image
                      src={urlFor(sector.icon).width(64).height(64).url()}
                      alt={sector.title}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                )}
                <h3 className="font-heading text-faect-navy mb-3 text-xl font-bold">
                  {sector.title}
                </h3>
                {sector.description && (
                  <p className="text-faect-gray text-sm leading-relaxed">
                    {sector.description}
                  </p>
                )}

                {sector.link && (
                  <span className="text-faect-blue mt-6 inline-flex items-center text-sm font-bold tracking-wider uppercase transition-all group-hover:gap-2">
                    Ontdek meer
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
                  </span>
                )}
              </div>
            );

            if (sector.link) {
              return (
                <Link key={index} href={sector.link} className="block h-full">
                  {content}
                </Link>
              );
            }

            return <div key={index}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
