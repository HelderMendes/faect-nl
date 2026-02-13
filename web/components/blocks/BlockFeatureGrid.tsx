import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface Feature {
  _key: string
  title: string
  description: string
  icon?: any
}

interface BlockFeatureGridProps {
  title?: string
  features?: Feature[]
  settings?: SectionSettings
}

export function BlockFeatureGrid({title, features, settings}: BlockFeatureGridProps) {
  if (!features || features.length === 0) return null

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center text-faect-navy mb-12">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature._key}
              className="group p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
            >
              {feature.icon?.asset && (
                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(feature.icon).width(400).height(300).url()}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-faect-navy mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
