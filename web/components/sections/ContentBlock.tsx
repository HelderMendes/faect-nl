import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import clsx from 'clsx'

interface ContentBlockProps {
  heading: string
  body: any // Portable Text or string for now
  image?: any
  imagePosition?: 'left' | 'right'
  ctaText?: string
  ctaLink?: string
}

export function ContentBlock({ heading, body, image, imagePosition = 'right', ctaText, ctaLink }: ContentBlockProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={clsx(
          "flex flex-col gap-12 items-center",
          imagePosition === 'left' ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
           <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-faect-navy">{heading}</h2>
              <div className="prose text-gray-600">
                {typeof body === 'string' ? <p>{body}</p> : <p>Rich text content here</p>}
              </div>
              {ctaText && ctaLink && (
                <Link 
                  href={ctaLink}
                  className="inline-flex items-center text-faect-blue font-semibold hover:text-blue-700 transition-colors"
                >
                  {ctaText} →
                </Link>
              )}
           </div>
           
           {image && (
             <div className="flex-1 w-full relative aspect-video rounded-xl overflow-hidden shadow-xl">
               <Image
                 src={urlFor(image).width(800).height(600).url()}
                 alt={heading}
                 fill
                 className="object-cover"
               />
             </div>
           )}
        </div>
      </div>
    </section>
  )
}
