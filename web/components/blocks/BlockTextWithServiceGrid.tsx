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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45%_55%] lg:items-stretch lg:gap-16">
          {/* Left column: heading + body + image */}
          <div className="flex flex-col justify-start">
            {heading && (
              <h2 className="text-faect-navy mb-6 text-3xl leading-tight font-bold lg:text-4xl">
                {/* {heading} */}
              </h2>
            )}
            {body && <p className="mb-8 leading-7 text-gray-600">{body}</p>}
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
          <div className="grid h-full grid-cols-2 grid-rows-2 divide-x divide-y divide-gray-200 overflow-hidden rounded-2xl">
            {services && services.length > 0 && (
              <div className="grid h-full grid-cols-2 grid-rows-2 divide-x divide-y divide-gray-200">
                {services.slice(0, 4).map((service) => (
                  <div
                    key={service._key}
                    className="flex flex-col items-center justify-center px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {service.icon?.asset && (
                      <div className="mb-4 h-16 w-16 shrink-0">
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
                    <div className="bg-amber-800 font-bold text-amber-200">
                      <h1> HHHHHHHHHH HHJHJH jhjhjhjh</h1>
                    </div>
                    {service.description && (
                      <p className="text-sm leading-6 text-gray-600">
                        {service.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
