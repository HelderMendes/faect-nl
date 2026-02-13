import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/sanity/lib/image'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface Service {
  title: string
  description?: string
  icon?: any
  image?: any
  link?: string
}

interface BlockServiceCardsProps {
  heading?: string
  subheading?: string
  services?: Service[]
  columns?: number
  settings?: SectionSettings
}

export function BlockServiceCards({
  heading,
  subheading,
  services,
  columns = 3,
  settings,
}: BlockServiceCardsProps) {
  const displayServices = services || []

  if (displayServices.length === 0) return null

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

        <div className={`grid grid-cols-1 ${gridCols[columns as keyof typeof gridCols]} gap-8`}>
          {displayServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {service.image?.asset && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(service.image).width(600).height(400).url()}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  {service.icon?.asset && (
                    <div className="relative w-8 h-8 shrink-0">
                      <Image
                        src={urlFor(service.icon).width(32).height(32).url()}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-heading font-bold text-faect-navy">
                    {service.title}
                  </h3>
                </div>
                {service.description && (
                  <p className="text-faect-gray text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                )}
                {service.link && (
                  <Link
                    href={service.link}
                    className="mt-auto text-faect-blue font-bold text-sm inline-flex items-center hover:gap-2 transition-all"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
