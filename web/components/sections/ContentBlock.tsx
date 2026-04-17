import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import clsx from "clsx";

interface ContentBlockProps {
  heading: string;
  body: any; // Portable Text or string for now
  image?: any;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaLink?: string;
}

export function ContentBlock({
  heading,
  body,
  image,
  imagePosition = "right",
  ctaText,
  ctaLink,
}: ContentBlockProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div
          className={clsx(
            "flex flex-col items-center gap-12",
            imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row",
          )}
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-faect-navy text-3xl font-bold">{heading}</h2>
            <div className="prose text-gray-600">
              {typeof body === "string" ? (
                <p>{body}</p>
              ) : (
                <p>Rich text content here</p>
              )}
            </div>
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="text-faect-blue inline-flex items-center font-semibold transition-colors hover:text-blue-700"
              >
                {ctaText} →
              </Link>
            )}
          </div>

          {image && (
            <div className="relative aspect-video w-full flex-1 overflow-hidden rounded-xl shadow-xl">
              <Image
                src={urlFor(image).width(800).height(600).url()}
                alt={heading}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
