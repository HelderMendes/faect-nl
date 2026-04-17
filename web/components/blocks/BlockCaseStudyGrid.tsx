import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface CaseStudy {
  _id: string;
  title: string;
  slug?: { current: string };
  clientName?: string;
  clientLogo?: any;
  mainImage?: any;
  summary?: string;
  industry?: string;
}

interface BlockCaseStudyGridProps {
  heading?: string;
  subheading?: string;
  caseStudies?: CaseStudy[];
  showAll?: boolean;
  filterByIndustry?: string;
  limit?: number;
  columns?: 2 | 3;
  ctaText?: string;
  ctaLink?: string;
}

export function BlockCaseStudyGrid({
  heading,
  subheading,
  caseStudies,
  columns = 3,
  ctaText,
  ctaLink,
}: BlockCaseStudyGridProps) {
  if (!caseStudies || caseStudies.length === 0) return null;

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className="block-background-overlay bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-faect-navy mb-4 text-3xl font-bold">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy._id}
              href={`/klanten-cases/${caseStudy.slug?.current || caseStudy._id}`}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {(caseStudy.mainImage?.asset || caseStudy.clientLogo?.asset) && (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {caseStudy.mainImage?.asset ? (
                    <Image
                      src={urlFor(caseStudy.mainImage)
                        .width(600)
                        .height(400)
                        .url()}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : caseStudy.clientLogo?.asset ? (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <Image
                        src={urlFor(caseStudy.clientLogo).width(300).url()}
                        alt={caseStudy.clientName || caseStudy.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                </div>
              )}
              <div className="p-6">
                {caseStudy.industry && (
                  <span className="text-faect-blue bg-faect-blue/10 mb-3 inline-block rounded px-2 py-1 text-xs font-medium">
                    {caseStudy.industry}
                  </span>
                )}
                <h3 className="text-faect-navy group-hover:text-faect-blue mb-2 text-xl font-bold transition-colors">
                  {caseStudy.title}
                </h3>
                {caseStudy.clientName && (
                  <p className="mb-3 text-sm text-gray-500">
                    {caseStudy.clientName}
                  </p>
                )}
                {caseStudy.summary && (
                  <p className="line-clamp-3 text-sm text-gray-600">
                    {caseStudy.summary}
                  </p>
                )}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <span className="text-faect-blue text-sm font-medium group-hover:underline">
                    Lees meer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {ctaText && ctaLink && (
          <div className="mt-12 text-center">
            <Link
              href={ctaLink}
              className="bg-faect-blue inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-semibold text-white transition-all hover:bg-blue-600"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
