import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface Step {
  title: string;
  description?: string;
  icon?: SanityImage;
}

interface BlockProcessStepsProps {
  label?: string;
  heading?: string;
  subheading?: string;
  steps?: Step[];
  layout?: "horizontal" | "vertical" | "numbered" | "cards";
  settings?: SectionSettings;
}

export function BlockProcessSteps({
  label,
  heading,
  subheading,
  steps,
  layout = "horizontal",
  settings,
}: BlockProcessStepsProps) {
  const displaySteps = steps || [];

  if (displaySteps.length === 0) return null;

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header — shared across all layouts */}
        {(label || heading || subheading) && (
          <div className="mb-14 flex flex-col items-center text-center">
            {label && (
              <p className="text-faect-navy mb-5 inline-block border-b-2 border-gray-400 pb-1 text-sm font-semibold tracking-wide">
                {label}
              </p>
            )}
            {heading && (
              <h2 className="text-faect-blue font-heading mb-5 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-faect-gray mx-auto max-w-3xl text-lg leading-8 font-medium">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Cards layout */}
        {layout === "cards" && (
          <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {displaySteps.map((step, index) => (
              <div
                key={index}
                className="border-faect-blue group relative flex flex-col border-t-2 py-8 transition-all duration-300"
              >
                {/* Large decorative step number */}
                <span className="text-faect-blue/10 font-heading absolute top-6 right-0 text-[6rem] leading-none font-bold select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Step number badge */}
                <div className="bg-faect-blue mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <span className="font-heading text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {step.icon?.asset && (
                  <div className="mb-4 h-12 w-12 shrink-0">
                    <Image
                      src={urlFor(step.icon).width(48).height(48).url()}
                      alt={step.title}
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                <h3 className="text-faect-navy mb-3 text-xl leading-snug font-bold">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-faect-gray text-base leading-7">
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Horizontal layout */}
        {layout === "horizontal" && (
          <div className="relative">
            <div className="absolute top-10 left-0 -z-1 hidden h-0.5 w-full bg-gray-100 lg:block" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {displaySteps.map((step, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center text-center"
                >
                  <div className="group-hover:border-faect-blue relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-100 bg-white shadow-sm transition-all group-hover:shadow-md">
                    {step.icon?.asset ? (
                      <div className="relative h-10 w-10">
                        <Image
                          src={urlFor(step.icon).width(40).height(40).url()}
                          alt={step.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="font-heading text-faect-blue text-2xl font-bold">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-faect-navy mb-3 text-xl font-bold">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-faect-gray text-sm leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vertical layout */}
        {layout === "vertical" && (
          <div className="mx-auto max-w-4xl space-y-12">
            {displaySteps.map((step, index) => (
              <div key={index} className="group flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="bg-faect-navy group-hover:bg-faect-blue relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-white transition-colors">
                    {index + 1}
                  </div>
                  {index < displaySteps.length - 1 && (
                    <div className="my-2 -mt-2 h-full w-0.5 bg-gray-100" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="font-heading text-faect-navy mb-4 text-2xl font-bold">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-faect-gray text-lg leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
