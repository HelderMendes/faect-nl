import Image from 'next/image'

interface FeatureCardProps {
  title: string
  description: string
  image?: string
  icon?: any
}

export function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-faect-navy/80 to-transparent" />
        </div>
      )}
      <div className="p-6">
        <h3 className="mb-3 text-xl font-bold text-faect-navy">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
