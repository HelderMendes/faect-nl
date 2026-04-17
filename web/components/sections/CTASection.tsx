import Link from "next/link";
import Image from "next/image";

interface CTASectionProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export function CTASection({
  title,
  description,
  ctaText,
  ctaLink,
  backgroundImage,
}: CTASectionProps) {
  return (
    <section className="bg-faect-navy relative overflow-hidden py-20">
      {backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            {description}
          </p>
        )}
        <Link
          href={ctaLink}
          className="bg-faect-blue inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
