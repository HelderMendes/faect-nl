import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface Partner {
  _id: string
  name: string
  logo: any
  website?: string
  description?: string
}

interface BlockPartnerLogosProps {
  heading?: string
  subheading?: string
  partners?: Partner[]
  showAll?: boolean
  displayMode?: 'grid' | 'slider' | 'cards'
  showDescription?: boolean
  settings?: SectionSettings
}

export function BlockPartnerLogos({
  heading,
  subheading,
  partners,
  displayMode = 'grid',
  showDescription,
  settings,
}: BlockPartnerLogosProps) {
  const displayPartners = partners || []

  if (displayPartners.length === 0) return null

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

        {displayMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {displayPartners.map((partner) => (
              <div
                key={partner._id}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                {partner.logo?.asset && (
                  <div className="relative w-full h-12">
                    <Image
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {displayMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPartners.map((partner) => (
              <div
                key={partner._id}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                {partner.logo?.asset && (
                  <div className="relative w-40 h-12 mb-6">
                    <Image
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                )}
                {showDescription && partner.description && (
                  <p className="text-faect-gray leading-relaxed text-sm">{partner.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {displayMode === 'slider' && (
          <div className="overflow-hidden bg-white/5 py-10 rounded-2xl">
            <div className="flex animate-marquee space-x-12 whitespace-nowrap">
              {[...displayPartners, ...displayPartners].map((partner, idx) => (
                <div
                  key={`${partner._id}-${idx}`}
                  className="shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 px-8"
                >
                  {partner.logo?.asset && (
                    <div className="relative w-32 h-10">
                      <Image
                        src={urlFor(partner.logo).url()}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
