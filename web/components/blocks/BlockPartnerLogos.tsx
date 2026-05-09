import Image from "next/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";
import { getLogoSrc } from "./PartnerCardsWithModal";
import { PartnerCardsWithModal } from "./PartnerCardsWithModal";

interface Partner {
  _id: string;
  name: string;
  logo?: { asset?: { _ref?: string; url?: string } } | null;
  type?: string | null;
  website?: string | null;
  description?: string | null;
}

interface BlockPartnerLogosProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  partners?: Partner[];
  showAll?: boolean;
  displayMode?: "grid" | "slider" | "cards";
  showDescription?: boolean;
  settings?: SectionSettings;
}

export function BlockPartnerLogos({
  eyebrow,
  heading,
  subheading,
  partners,
  displayMode = "grid",
  showDescription,
  settings,
}: BlockPartnerLogosProps) {
  const displayPartners = partners ?? [];
  if (displayPartners.length === 0) return null;

  return (
    <section
      className={(getSectionStyles(settings), "section-dither pt-22 pb-12")}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {(eyebrow || heading || subheading) && (
          <div className="-mt-5 mb-14 min-w-full text-center">
            {eyebrow && (
              <span className="font-ui bg-faect-blue/10 text-faect-blue mb-5 inline-block rounded-full px-5 py-1.5 text-sm font-semibold tracking-[0.15em] uppercase">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="font-cairo text-faect-navy mt-5 mb-5 text-6xl font-bold md:text-5xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-faect-gray mx-auto max-w-4xl text-[1.2rem]/9 font-medium">
                {subheading}
              </p>
            )}
          </div>
        )}

        {displayMode === "grid" && (
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-6">
            {displayPartners.map((partner) => {
              const src = getLogoSrc(partner.logo);
              return (
                <div
                  key={partner._id}
                  className="flex items-center justify-center p-4 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  {src && (
                    <div className="relative h-12 w-full">
                      <Image
                        src={src}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {displayMode === "cards" && (
          <PartnerCardsWithModal
            partners={displayPartners}
            showDescription={showDescription}
          />
        )}

        {displayMode === "slider" && (
          <div className="overflow-hidden rounded-2xl bg-white/5 py-10">
            <div className="animate-marquee flex space-x-12 whitespace-nowrap">
              {[...displayPartners, ...displayPartners].map((partner, idx) => {
                const src = getLogoSrc(partner.logo);
                return (
                  <div
                    key={`${partner._id}-${idx}`}
                    className="flex shrink-0 items-center justify-center px-8 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  >
                    {src && (
                      <div className="relative h-10 w-32">
                        <Image
                          src={src}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
