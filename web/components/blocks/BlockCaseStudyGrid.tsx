import Link from 'next/link'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

interface CaseStudy {
  _id: string
  title: string
  slug?: {current: string}
  clientName?: string
  clientLogo?: any
  mainImage?: any
  summary?: string
  industry?: string
}

interface BlockCaseStudyGridProps {
  heading?: string
  subheading?: string
  caseStudies?: CaseStudy[]
  showAll?: boolean
  filterByIndustry?: string
  limit?: number
  columns?: 2 | 3
  ctaText?: string
  ctaLink?: string
}

export function BlockCaseStudyGrid({
  heading,
  subheading,
  caseStudies,
  columns = 3,
  ctaText,
  ctaLink,
}: BlockCaseStudyGridProps) {
  if (!caseStudies || caseStudies.length === 0) return null

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl font-bold text-faect-navy mb-4">{heading}</h2>
            )}
            {subheading && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subheading}</p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy._id}
              href={`/klanten-cases/${caseStudy.slug?.current || caseStudy._id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {(caseStudy.mainImage?.asset || caseStudy.clientLogo?.asset) && (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {caseStudy.mainImage?.asset ? (
                    <Image
                      src={urlFor(caseStudy.mainImage).width(600).height(400).url()}
                      alt={caseStudy.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <span className="inline-block text-xs font-medium text-faect-blue bg-faect-blue/10 px-2 py-1 rounded mb-3">
                    {caseStudy.industry}
                  </span>
                )}
                <h3 className="text-xl font-bold text-faect-navy mb-2 group-hover:text-faect-blue transition-colors">
                  {caseStudy.title}
                </h3>
                {caseStudy.clientName && (
                  <p className="text-sm text-gray-500 mb-3">{caseStudy.clientName}</p>
                )}
                {caseStudy.summary && (
                  <p className="text-gray-600 text-sm line-clamp-3">{caseStudy.summary}</p>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-faect-blue font-medium text-sm group-hover:underline">
                    Lees meer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {ctaText && ctaLink && (
          <div className="text-center mt-12">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center rounded-md bg-faect-blue px-8 py-3 text-base font-semibold text-white transition-all hover:bg-blue-600"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
