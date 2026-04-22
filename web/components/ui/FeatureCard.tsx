import Image from "next/image";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface FeatureCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: SanityImage;
}

export function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="from-faect-navy/80 absolute inset-0 bg-linear-to-t to-transparent" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-faect-navy mb-3 text-xl font-bold">{title}</h3>
        <p className="leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}
