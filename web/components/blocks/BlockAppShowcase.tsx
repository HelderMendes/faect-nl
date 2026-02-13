import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/sanity/lib/image'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface App {
  _id: string
  title: string
  slug?: {current: string}
  excerpt?: string
  icon?: any
  category?: string
}

interface BlockAppShowcaseProps {
  heading?: string
  subheading?: string
  apps?: App[]
  showAll?: boolean
  columns?: number
  ctaText?: string
  ctaLink?: string
  settings?: SectionSettings
}

export function BlockAppShowcase({
  heading,
  subheading,
  apps,
  showAll,
  columns = 3,
  ctaText,
  ctaLink,
  settings,
}: BlockAppShowcaseProps) {
  const displayApps = apps || []

  if (displayApps.length === 0) return null

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        {(heading || subheading) && (
          <div className="max-w-3xl mb-16">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-faect-navy mb-6">
                {heading}
              </h2>
            )}
            {subheading && <p className="text-xl text-faect-gray leading-relaxed">{subheading}</p>}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]} gap-8`}>
          {displayApps.map((app) => (
            <div
              key={app._id}
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start"
            >
              <div className="mb-6 relative w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                {app.icon?.asset ? (
                  <Image
                    src={urlFor(app.icon).width(64).height(64).url()}
                    alt={app.title}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-faect-blue/20 rounded-full" />
                )}
              </div>

              <h3 className="text-xl font-heading font-bold text-faect-navy mb-3 group-hover:text-faect-blue transition-colors">
                {app.title}
              </h3>

              {app.excerpt && <p className="text-faect-gray mb-8 line-clamp-3">{app.excerpt}</p>}

              {app.slug?.current && (
                <Link
                  href={`/faect-apps/${app.slug.current}`}
                  className="mt-auto inline-flex items-center text-faect-blue font-bold hover:gap-2 transition-all"
                >
                  Meer informatie
                  <svg
                    className="w-4 h-4 ml-1"
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
                </Link>
              )}
            </div>
          ))}
        </div>

        {ctaText && ctaLink && (
          <div className="mt-16 text-center">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center rounded-lg bg-faect-navy text-white px-10 py-4 font-ui font-bold hover:bg-neutral-800 transition-all uppercase tracking-wider text-sm"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
