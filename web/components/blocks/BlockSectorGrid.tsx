import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/sanity/lib/image'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface Sector {
  title: string
  description?: string
  icon?: any
  link?: string
}

interface BlockSectorGridProps {
  heading?: string
  subheading?: string
  sectors?: Sector[]
  columns?: number
  settings?: SectionSettings
}

export function BlockSectorGrid({
  heading,
  subheading,
  sectors,
  columns = 4,
  settings,
}: BlockSectorGridProps) {
  const displaySectors = sectors || []

  if (displaySectors.length === 0) return null

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        {(heading || subheading) && (
          <div className="text-center mb-16">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-faect-navy mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg text-faect-gray max-w-2xl mx-auto">{subheading}</p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]} gap-6`}>
          {displaySectors.map((sector, index) => {
            const content = (
              <div className="group h-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
                {sector.icon?.asset && (
                  <div className="relative w-16 h-16 mb-6 bg-faect-blue/5 rounded-2xl flex items-center justify-center group-hover:bg-faect-blue/10 transition-colors">
                    <Image
                      src={urlFor(sector.icon).width(64).height(64).url()}
                      alt={sector.title}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                )}
                <h3 className="text-xl font-heading font-bold text-faect-navy mb-3">
                  {sector.title}
                </h3>
                {sector.description && (
                  <p className="text-faect-gray text-sm leading-relaxed">{sector.description}</p>
                )}

                {sector.link && (
                  <span className="mt-6 text-faect-blue font-bold text-sm uppercase tracking-wider inline-flex items-center group-hover:gap-2 transition-all">
                    Ontdek meer
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
                  </span>
                )}
              </div>
            )

            if (sector.link) {
              return (
                <Link key={index} href={sector.link} className="block h-full">
                  {content}
                </Link>
              )
            }

            return <div key={index}>{content}</div>
          })}
        </div>
      </div>
    </section>
  )
}
