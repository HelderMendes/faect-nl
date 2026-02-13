interface Feature {
  title: string
  description: string
  icon?: any // Placeholder for now
}

interface FeatureGridProps {
  title?: string
  features: Feature[]
}

export function FeatureGrid({ title, features }: FeatureGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center text-faect-navy mb-12">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-faect-navy mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
