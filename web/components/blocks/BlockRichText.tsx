import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'

interface BlockRichTextProps {
  heading?: string
  content?: any[]
  alignment?: 'left' | 'center'
  maxWidth?: 'default' | 'narrow' | 'wide'
}

const portableTextComponents = {
  types: {
    image: ({value}: any) => {
      if (!value?.asset) return null
      return (
        <div className="my-8 relative">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            width={1200}
            height={800}
            className="rounded-lg shadow-lg"
          />
        </div>
      )
    },
  },
}

export function BlockRichText({
  heading,
  content,
  alignment = 'left',
  maxWidth = 'default',
}: BlockRichTextProps) {
  const maxWidthClasses = {
    narrow: 'max-w-2xl',
    default: 'max-w-4xl',
    wide: 'max-w-6xl',
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`${maxWidthClasses[maxWidth]} ${alignmentClasses[alignment]}`}>
          {heading && (
            <h2 className="text-3xl font-bold text-faect-navy mb-8">{heading}</h2>
          )}
          {content && (
            <div className="prose prose-lg max-w-none text-gray-600">
              <PortableText value={content} components={portableTextComponents} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
