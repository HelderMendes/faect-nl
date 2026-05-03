import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSectionStyles, cn, type SectionSettings } from "./sectionUtils";

type SanityImage = {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
};

type AppFactsheet = {
  asset?: { url?: string };
};

type App = {
  _id: string;
  title: string;
  slug?: { current: string };
  tagline?: string;
  description?: string;
  excerpt?: string;
  features?: string[];
  factsheet?: AppFactsheet;
  icon?: SanityImage;
};

type BlockAppShowcaseProps = {
  apps?: App[];
  ctaText?: string;
  ctaLink?: string;
  settings?: SectionSettings;
};

function AppCard({ app, index }: { app: App; index: number }) {
  const description = app.description || app.excerpt;
  const features = app.features?.slice(0, 3) ?? [];

  return (
    <article className="group hover:border-faect-blue/20 bg-faect-light-blue/10 relative mt-10 flex flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Decorative number watermark */}
      <span className="font-cairo pointer-events-none absolute top-3 right-4 text-[7rem] leading-none font-extrabold text-white/35 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* Card header */}
      <div className="border-faect-blue relative flex items-start gap-4 border-t-4 px-6 pt-6 pb-2">
        <div className="flex shrink-0 items-center justify-center">
          {app.icon?.asset ? (
            <Image
              src={urlFor(app.icon).width(90).height(90).url()}
              alt={app.title}
              width={56}
              height={56}
              className="size-22 rounded-full object-cover"
            />
          ) : (
            <div className="bg-faect-blue/20 h-14 w-14 rounded-lg" />
          )}
        </div>
        <div className="flex h-20 flex-col justify-end pt-1">
          <h3 className="font-cairo text-faect-blue group-hover:text-faect-blue text-2xl/7 font-bold transition-colors duration-200">
            {app.title}
          </h3>
        </div>
      </div>
      {/* Description */}
      {description && (
        <p className="text-faect-gray px-6 pb-4 text-[1.1rem]/7">
          <span className="text-faect-navy font-medium">{app.tagline} </span>
          {description}
        </p>
      )}
      {/* Features */}
      {features.length > 0 && (
        <ul className="mx-6 mb-3 space-y-1.5 pt-0">
          {features.map((feat, i) => (
            <li
              key={i}
              className="text-faect-gray flex items-start gap-2 text-[1rem]/6 font-medium"
            >
              <span className="text-faect-blue mt-0.5 shrink-0 text-base leading-none">
                ✓
              </span>
              {feat}
            </li>
          ))}
        </ul>
      )}
      {/* Footer CTAs */}
      <div
        className={cn(
          "mt-auto flex items-center justify-between gap-3 border-t border-white/85 px-6 py-2",
          !features.length && "mt-auto",
        )}
      >
        {app.slug?.current ? (
          <Link
            href={`/faect-apps/${app.slug.current.split("/").filter(Boolean).pop()}`}
            className="text-faect-blue hover:text-faect-navy inline-flex items-center gap-1 font-semibold transition-all duration-200 hover:gap-2"
          >
            Meer informatie
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <span />
        )}

        {app.factsheet?.asset?.url && (
          <a
            href={app.factsheet.asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-faect-gray hover:text-faect-navy inline-flex items-center gap-1.5 font-medium transition-colors duration-200"
          >
            <svg
              className="h-4.5 w-4.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Factsheet
          </a>
        )}
      </div>
    </article>
  );
}

export function BlockAppShowcase({
  apps,
  settings,
}: BlockAppShowcaseProps) {
  const displayApps = apps ?? [];
  if (displayApps.length === 0) return null;

  return (
    <section
      className={cn(getSectionStyles(settings), "section-dither-flipped p-4")}
    >
      <div className="p container mx-auto px-4 pb-16 lg:px-8">

        <div className="-mt-22 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayApps.map((app, index) => (
            <AppCard key={app._id} app={app} index={index} />
          ))}
        </div>

        {/* {ctaText && ctaLink && (
          <div className="mt-16 text-center">
            <Link
              href={ctaLink}
              className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-block rounded-[8px] border bg-white px-10 py-1.5 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-110 hover:border-white hover:text-white"
            >
              {ctaText}
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
}
