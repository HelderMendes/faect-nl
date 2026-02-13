import Link from 'next/link'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import {PortableText} from '@portabletext/react'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface BlockTextWithImageProps {
  heading?: string
  content?: any[]
  image?: any
  imagePosition?: 'left' | 'right'
  ctaText?: string
  ctaLink?: string
  settings?: SectionSettings
}

export function BlockTextWithImage({
  heading,
  content,
  image,
  imagePosition = 'right',
  ctaText,
  ctaLink,
  settings,
}: BlockTextWithImageProps) {
  const isImageLeft = imagePosition === 'left'

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            isImageLeft ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div className={isImageLeft ? 'lg:order-2' : ''}>
            {heading && <h2 className="text-3xl font-bold text-faect-navy mb-6">{heading}</h2>}
            {content && (
              <div className="prose prose-lg text-gray-600 mb-8">
                <PortableText value={content} />
              </div>
            )}
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center rounded-md bg-faect-blue px-6 py-3 text-base font-semibold text-white transition-all hover:bg-blue-600"
              >
                {ctaText}
              </Link>
            )}
          </div>

          {/* Image */}
          <div
            className={`relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl ${isImageLeft ? 'lg:order-1' : ''}`}
          >
            {image?.asset ? (
              <Image
                src={image.asset.url || urlFor(image).width(800).height(600).url()}
                alt={heading || ''}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
