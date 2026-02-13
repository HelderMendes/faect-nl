import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import {getSectionStyles, type SectionSettings} from './sectionUtils'

interface Step {
  title: string
  description?: string
  icon?: any
}

interface BlockProcessStepsProps {
  heading?: string
  subheading?: string
  steps?: Step[]
  layout?: 'horizontal' | 'vertical' | 'numbered'
  settings?: SectionSettings
}

export function BlockProcessSteps({
  heading,
  subheading,
  steps,
  layout = 'horizontal',
  settings,
}: BlockProcessStepsProps) {
  const displaySteps = steps || []

  if (displaySteps.length === 0) return null

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

        {layout === 'horizontal' && (
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 -z-1" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {displaySteps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-faect-blue group-hover:shadow-md transition-all relative z-10">
                    {step.icon?.asset ? (
                      <div className="relative w-10 h-10">
                        <Image
                          src={urlFor(step.icon).width(40).height(40).url()}
                          alt={step.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-2xl font-heading font-bold text-faect-blue">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-faect-navy mb-3">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-faect-gray text-sm leading-relaxed">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {layout === 'vertical' && (
          <div className="max-w-4xl mx-auto space-y-12">
            {displaySteps.map((step, index) => (
              <div key={index} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-faect-navy rounded-full flex items-center justify-center text-white font-bold shrink-0 relative z-10 group-hover:bg-faect-blue transition-colors">
                    {index + 1}
                  </div>
                  {index < displaySteps.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-100 -mt-2 my-2" />
                  )}
                </div>
                <div className="pb-12">
                  <h3 className="text-2xl font-heading font-bold text-faect-navy mb-4">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-faect-gray leading-relaxed text-lg">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
