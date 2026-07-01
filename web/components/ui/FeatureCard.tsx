import Image from "next/image";
import { cn } from "@/components/blocks/sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

interface FeatureCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: SanityImage;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
}

export function FeatureCard({
  title,
  description,
  image,
  cardClassName,
  titleClassName,
  descriptionClassName,
  imageWrapperClassName,
  imageClassName,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        cardClassName,
      )}
    >
      {image && (
        <div
          className={cn(
            "relative h-48 w-full overflow-hidden",
            imageWrapperClassName,
          )}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-110",
              imageClassName,
            )}
          />
          <div className="from-faect-navy/80 absolute inset-0 bg-linear-to-t to-transparent" />
        </div>
      )}
      <div className="p-6">
        <h3
          className={cn(
            "text-faect-navy mb-3 text-xl font-bold",
            titleClassName,
          )}
        >
          {title}
        </h3>
        <p
          className={cn("leading-relaxed text-gray-600", descriptionClassName)}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
