import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface Sector {
  title: string;
  description?: string;
  icon?: SanityImage;
  link?: string;
}

interface BlockSectorGridProps {
  heading?: string;
  subheading?: string;
  image?: SanityImage;
  sectors?: Sector[];
  columns?: number;
  settings?: SectionSettings;
}

export function BlockSectorGrid({
  heading,
  subheading,
  image,
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
    <section className={(getSectionStyles(settings), "section-dither pt-22")}>
      <div className="container mx-auto gap-12 px-4 lg:grid lg:grid-cols-2 lg:items-start lg:px-8">
        {(heading || subheading) && (
          <div className="mx-4 mb-16 space-y-3 text-center lg:mx-1 lg:gap-1 lg:space-y-0 lg:text-left">
            {heading && (
              <h2 className="font-heading mb-4 text-[3.2rem]/14 font-semibold text-gray-700 lg:text-[3.5rem]/15">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-work-sans text-faect-gray mt-4 mb-6 space-y-2 text-[1.2rem]/8 font-medium">
                {subheading}
              </p>
            )}
            <div className="relative mx-auto aspect-2/1 w-full max-w-5xl p-6">
              {image?.asset ? (
                <Image
                  src={image.asset.url || urlFor(image).width(500).url()}
                  alt={heading || ""}
                  fill
                  className="mx-auto h-auto max-w-2xl object-contain lg:max-w-full"
                />
              ) : null}
            </div>
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]}`}
        >
          {displaySectors.map((sector, index) => {
            const total = displaySectors.length;
            const mdCols = 2;
            const lgCols = columns;
            const mdLastRow = Math.floor((total - 1) / mdCols) * mdCols;
            const lgLastRow = Math.floor((total - 1) / lgCols) * lgCols;

            const borderClasses = [
              "border-faect-blue",
              // mobile (1 col): bottom divider except last item
              index < total - 1 ? "border-b" : "",
              // md (2 cols)
              (index + 1) % mdCols !== 0 ? "md:border-r" : "md:border-r-0",
              index < mdLastRow ? "md:border-b" : "md:border-b-0",
              // lg (lgCols cols)
              (index + 1) % lgCols !== 0 ? "lg:border-r" : "lg:border-r-0",
              index < lgLastRow ? "lg:border-b" : "lg:border-b-0",
            ]
              .filter(Boolean)
              .join(" ");

            const content = (
              <div className="flex h-full flex-col items-center justify-start px-4 py-6 text-center transition-all duration-300 hover:bg-white/40 hover:shadow-sm">
                {sector.icon?.asset && (
                  <div className="relative h-32 w-32">
                    <Image
                      src={urlFor(sector.icon).width(80).height(80).url()}
                      alt={sector.title}
                      fill
                      className="object-contain p-5"
                    />
                  </div>
                )}
                <h3 className="font-heading text-faect-blue mb-1 pt-2 text-[1.4rem] font-semibold">
                  {sector.title}
                </h3>
                {sector.description && (
                  <p className="text-faect-gray pb-2 font-sans text-[1.15rem]/7 font-medium">
                    {sector.description}
                  </p>
                )}
                {/* {sector.link && (
                  <span className="text-faect-blue mt-2 inline-flex items-center text-sm font-bold tracking-wider uppercase transition-all group-hover:gap-2">
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
                )} */}
              </div>
            );

            if (sector.link) {
              return (
                <Link key={index} href={sector.link} className={borderClasses}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={index} className={borderClasses}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
