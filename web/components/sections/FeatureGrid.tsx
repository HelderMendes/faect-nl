interface Feature {
  title: string;
  description: string;
  icon?: any; // Placeholder for now
}

interface FeatureGridProps {
  title?: string;
  features: Feature[];
}

export function FeatureGrid({ title, features }: FeatureGridProps) {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-faect-navy mb-12 text-center text-3xl font-bold">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-100 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-faect-navy mb-4 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
