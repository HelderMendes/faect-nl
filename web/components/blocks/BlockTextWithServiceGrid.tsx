import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type ServiceItem = {
  _key: string;
  title: string;
  description?: string;
  icon?: SanityImage;
  link?: string;
  linkLabel?: string;
};

type CtaLink = {
  _key: string;
  label: string;
  href: string;
};

type BlockTextWithServiceGridProps = {
  label?: string;
  heading?: string;
  body?: string;
  image?: SanityImage;
  links?: CtaLink[];
  services?: ServiceItem[];
  settings?: SectionSettings;
};

export function BlockTextWithServiceGrid({
  label,
  heading,
  body,
  image,
  links,
  services,
  settings,
}: BlockTextWithServiceGridProps) {
  if (!heading && !services?.length) return null;

  return (
    <section className={getSectionStyles(settings)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 xl:grid-cols-[44%_1fr]">
          {/* Left column: label + heading + body + image + CTA links */}
          <div className="mx-4 mb-8 flex flex-col items-center justify-center md:px-15 lg:px-30 xl:items-start xl:px-0">
            {label && (
              <p className="hover:text-faect-blue relative mb-6 text-2xl font-medium text-gray-500 underline decoration-2 underline-offset-8 transition-all duration-200">
                <span className="xl:hidden">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                {label}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            )}
            {heading && (
              <h2 className="font-cairo mb-3 text-center text-4xl font-bold tracking-tight text-gray-700 md:text-5xl/14 lg:mb-6 lg:text-6xl/16 xl:text-left">
                {heading}
              </h2>
            )}
            {body && (
              <p className="mb-8 text-center text-[1.2rem]/8 text-gray-700 xl:text-left">
                {body}
              </p>
            )}
            {image?.asset && (
              <div className="mb-22 w-full overflow-hidden rounded-xl">
                <Image
                  src={image.asset.url || urlFor(image).width(700).url()}
                  alt={heading ?? ""}
                  width={700}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
            {links && links.length > 0 && (
              <ul className="flex flex-col gap-6 xl:gap-10">
                {links.map((link) => (
                  <li key={link._key}>
                    <Link
                      href={link.href}
                      className="text-faect-blue border-faect-blue hover:bg-faect-blue focus:bg-faect-blue transition-transform: 0.3s nav-item-sweep block w-full rounded-xl border-2 bg-white px-6 py-4 text-center text-[1.1rem]/6 font-semibold transition-colors duration-400 ease-in-out hover:scale-95 hover:text-white focus:scale-95 focus:text-white xl:py-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Right column: 2-column service grid with dividers */}
          {services && services.length > 0 && (
            <div className="mx-4 grid grid-cols-1 gap-x-12 md:mx-12 md:grid-cols-2 lg:mx-3 lg:grid-cols-3 xl:mx-0 xl:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service._key}
                  className="border-faect-blue mb-9 flex flex-col items-start border-t-3 transition-all duration-300"
                >
                  {service.icon?.asset && (
                    <div className="my-4 size-26 shrink-0">
                      <Image
                        src={
                          (service.icon.asset as { url?: string }).url ||
                          urlFor(service.icon).width(250).height(250).url()
                        }
                        alt={service.title}
                        width={250}
                        height={250}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-faect-navy mb-3 text-2xl/7 font-bold">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-lg/8 font-medium text-gray-600">
                      {service.description}
                    </p>
                  )}
                  {service.link && (
                    <Link
                      href={service.link}
                      className="text-faect-blue border-faect-blue/60 hover:bg-faect-blue transition-transform: 0.3s nav-item-sweep mt-4 inline-flex w-full justify-center gap-1 rounded-[1.25rem] border-[0.75rem] bg-white/60 px-5 py-1 text-[1.03rem]/5 font-semibold font-stretch-90% transition-colors duration-400 ease-in-out hover:gap-2 hover:text-white"
                    >
                      {service.linkLabel ?? "Meer informatie"}
                      <svg
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M13 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
