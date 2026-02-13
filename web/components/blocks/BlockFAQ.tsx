'use client'

import {useState} from 'react'
import {PortableText} from '@portabletext/react'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface FAQItem {
  _key: string
  question: string
  answer?: any[]
}

interface BlockFAQProps {
  heading?: string
  subheading?: string
  items?: FAQItem[]
  sourceType?: 'manual' | 'reference'
  faqReferences?: any[]
  settings?: SectionSettings
}

export function BlockFAQ({
  heading,
  subheading,
  items,
  sourceType = 'manual',
  settings,
}: BlockFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = items || []

  if (faqItems.length === 0) return null

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {(heading || subheading) && (
            <div className="text-center mb-12">
              {heading && <h2 className="text-3xl font-bold text-faect-navy mb-4">{heading}</h2>}
              {subheading && <p className="text-lg text-gray-600">{subheading}</p>}
            </div>
          )}

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={item._key} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-faect-navy pr-4">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-faect-blue transition-transform duration-200 shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && item.answer && (
                  <div className="px-6 pb-4 text-gray-600">
                    <div className="prose prose-sm max-w-none">
                      <PortableText value={item.answer} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
