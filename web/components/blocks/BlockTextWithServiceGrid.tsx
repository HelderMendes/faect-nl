import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type ServiceItem = {
  _key: string;
  title: string;
  description?: string;
  icon?: SanityImage;
};

type BlockTextWithServiceGridProps = {
  heading?: string;
  body?: string;
  image?: SanityImage;
  services?: ServiceItem[];
  settings?: SectionSettings;
};

export function BlockTextWithServiceGrid({
  heading,
  body,
  image,
  services,
  settings,
}: BlockTextWithServiceGridProps) {
  if (!heading && !services?.length) return null;

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45%_55%] lg:gap-16">
          {/* Left column: heading + body + image */}
          <div className="flex flex-col justify-start">
            {heading && (
              <h2 className="text-faect-navy mb-6 text-3xl font-bold leading-tight lg:text-4xl">
                {heading}
              </h2>
            )}
            {body && (
              <p className="mb-8 leading-7 text-gray-600">{body}</p>
            )}
            {image?.asset && (
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={urlFor(image).width(700).height(480).url()}
                  alt={heading ?? ""}
                  width={700}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Right column: 2×2 service grid with dividers */}
          {services && services.length > 0 && (
            <div className="grid grid-cols-2">
              {services.slice(0, 4).map((service, index) => {
                const isLeftCol = index % 2 === 0;
                const isTopRow = index < 2;
                return (
                  <div
                    key={service._key}
                    className={[
                      "flex flex-col items-center px-6 py-8 text-center",
                      isLeftCol ? "border-r border-gray-200" : "",
                      isTopRow ? "border-b border-gray-200" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {service.icon?.asset && (
                      <div className="mb-4 h-16 w-16 flex-shrink-0">
                        <Image
                          src={urlFor(service.icon).width(64).height(64).url()}
                          alt={service.title}
                          width={64}
                          height={64}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-faect-blue mb-3 text-lg font-semibold">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="leading-6 text-gray-600 text-sm">
                        {service.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
