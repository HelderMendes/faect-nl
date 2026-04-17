import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { getSectionStyles, type SectionSettings, cn } from "./sectionUtils";

interface BlockTextWithImageProps {
  heading?: string;
  content?: any[];
  image?: any;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
}

export function BlockTextWithImage({
  heading,
  content,
  image,
  imagePosition = "left",
  ctaText,
  ctaLink,
  settings,
}: BlockTextWithImageProps) {
  const isImageFirst = imagePosition === "left";

  return (
    <section
      className={cn("bg-white py-20 lg:py-32", getSectionStyles(settings))}
    >
      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-4">
          {/* Image */}
          <div
            className={cn(
              "animate-fade-in relative h-80 lg:h-[450px]",
              isImageFirst
                ? "order-last lg:order-first"
                : "order-first lg:order-last",
            )}
          >
            {image?.asset ? (
              <Image
                src={image.asset.url || urlFor(image).width(500).url()}
                alt={heading || ""}
                fill
                className="object-contain" // Use object-contain for illustrations
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-50">
                <span className="text-gray-300">Afbeelding</span>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div>
            {heading && (
              <h2 className="font-heading text-faect-blue mb-8 text-[2.2rem] leading-[1.2] font-bold">
                {heading}
              </h2>
            )}
            {content && (
              <div className="font-work-sans text-faect-gray mb-10 space-y-4 text-[1.2rem] leading-relaxed font-medium">
                <PortableText value={content} />
              </div>
            )}
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="border-faect-blue text-faect-blue font-ui hover:bg-faect-blue inline-block rounded-[8px] border px-10 py-2 text-[1.15rem] font-medium transition-all duration-300 hover:text-white"
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
