import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

interface Feature {
  _key: string;
  title: string;
  description: string;
  icon?: any;
}

interface BlockFeatureGridProps {
  title?: string;
  features?: Feature[];
  settings?: SectionSettings;
}

export function BlockFeatureGrid({
  title,
  features,
  settings,
}: BlockFeatureGridProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-faect-navy mb-12 text-center text-3xl font-bold">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature._key}
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {feature.icon?.asset && (
                <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(feature.icon).width(400).height(300).url()}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className="text-faect-navy mb-3 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
