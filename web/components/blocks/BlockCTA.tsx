import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface BlockCTAProps {
  heading: string;
  text?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: any;
  variant?: "primary" | "secondary" | "accent";
}

export function BlockCTA({
  heading,
  text,
  ctaText,
  ctaLink,
  backgroundImage,
  variant = "primary",
}: BlockCTAProps) {
  const bgClasses = {
    primary: "bg-faect-navy",
    secondary: "bg-gray-100",
    accent: "bg-faect-blue",
  };

  const textClasses = {
    primary: "text-white",
    secondary: "text-faect-navy",
    accent: "text-white",
  };

  const subtextClasses = {
    primary: "text-white/80",
    secondary: "text-gray-600",
    accent: "text-white/90",
  };

  const buttonClasses = {
    primary: "bg-faect-blue hover:bg-blue-600",
    secondary: "bg-faect-navy hover:bg-faect-navy/90",
    accent: "bg-white text-faect-blue hover:bg-gray-100",
  };

  return (
    <section className={`relative overflow-hidden ${bgClasses[variant]} py-20`}>
      {backgroundImage?.asset && (
        <div className="absolute inset-0 opacity-10">
          <Image
            src={urlFor(backgroundImage).width(1920).height(600).url()}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2
          className={`mb-4 text-3xl font-bold ${textClasses[variant]} md:text-4xl`}
        >
          {heading}
        </h2>
        {text && (
          <p
            className={`mb-8 text-lg ${subtextClasses[variant]} mx-auto max-w-2xl`}
          >
            {text}
          </p>
        )}
        <Link
          href={ctaLink}
          className={`inline-flex items-center justify-center rounded-md ${buttonClasses[variant]} px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg`}
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
