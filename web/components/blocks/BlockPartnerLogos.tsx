import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

interface Partner {
  _id: string;
  name: string;
  logo: any;
  website?: string;
  description?: string;
}

interface BlockPartnerLogosProps {
  heading?: string;
  subheading?: string;
  partners?: Partner[];
  showAll?: boolean;
  displayMode?: "grid" | "slider" | "cards";
  showDescription?: boolean;
  settings?: SectionSettings;
}

export function BlockPartnerLogos({
  heading,
  subheading,
  partners,
  displayMode = "grid",
  showDescription,
  settings,
}: BlockPartnerLogosProps) {
  const displayPartners = partners || [];

  if (displayPartners.length === 0) return null;

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

        {displayMode === "grid" && (
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-6">
            {displayPartners.map((partner) => (
              <div
                key={partner._id}
                className="flex items-center justify-center p-4 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                {partner.logo?.asset && (
                  <div className="relative h-12 w-full">
                    <Image
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {displayMode === "cards" && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayPartners.map((partner) => (
              <div
                key={partner._id}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                {partner.logo?.asset && (
                  <div className="relative mb-6 h-12 w-40">
                    <Image
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                )}
                {showDescription && partner.description && (
                  <p className="text-faect-gray text-sm leading-relaxed">
                    {partner.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {displayMode === "slider" && (
          <div className="overflow-hidden rounded-2xl bg-white/5 py-10">
            <div className="animate-marquee flex space-x-12 whitespace-nowrap">
              {[...displayPartners, ...displayPartners].map((partner, idx) => (
                <div
                  key={`${partner._id}-${idx}`}
                  className="flex shrink-0 items-center justify-center px-8 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                >
                  {partner.logo?.asset && (
                    <div className="relative h-10 w-32">
                      <Image
                        src={urlFor(partner.logo).url()}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
