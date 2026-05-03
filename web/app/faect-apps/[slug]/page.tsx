import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {
  Star,
  KeyRound,
  TrendingUp,
  Monitor,
  Zap,
  LayoutGrid,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { APP_QUERY, APPS_SIDEBAR_QUERY } from "@/sanity/lib/queries";
import { AppNavModal } from "@/components/ui/AppNavModal";
import styles from "./singleApp.module.css";

export const revalidate = 60;

type AppSidebar = {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  icon?: { asset?: { url?: string } };
  factsheet?: { asset?: { url?: string } };
};

type App = {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  description?: string;
  body?: PortableTextBlock[];
  features?: string[];
  appStoreUrl?: string;
  factsheet?: { asset?: { url?: string } };
  icon?: { asset?: { url?: string } };
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await client.fetch<App>(APP_QUERY, { slug });
  if (!app) return {};

  return {
    title: `${app.title} — Faect App voor Business Central`,
    description: app.tagline || app.description || "",
    openGraph: {
      title: `${app.title} — Faect`,
      description: app.tagline || app.description || "",
      images: app.icon?.asset?.url ? [app.icon.asset.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "app" && defined(slug.current) && !("/" in slug.current)].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}

// Groups consecutive ✔ normal blocks into a single voordelen_group entry
// so the PortableText renderer can wrap them in one <div>.
function groupVoordelenBlocks(body: PortableTextBlock[]) {
  type Group = {
    _type: "voordelen_group";
    _key: string;
    items: PortableTextBlock[];
  };
  const result: (PortableTextBlock | Group)[] = [];
  let group: PortableTextBlock[] | null = null;

  const flush = () => {
    if (group?.length) {
      result.push({
        _type: "voordelen_group",
        _key: `vg_${group[0]._key}`,
        items: group,
      });
      group = null;
    }
  };

  for (const block of body) {
    const isVoordeel =
      (block as { style?: string }).style === "normal" &&
      (
        block as { children?: { text?: string }[] }
      ).children?.[0]?.text?.startsWith("✔");

    if (isVoordeel) {
      if (!group) group = [];
      group.push(block);
    } else {
      flush();
      result.push(block);
    }
  }
  flush();
  return result;
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [app, allAppsRaw] = await Promise.all([
    client.fetch<App>(APP_QUERY, { slug }),
    client.fetch<AppSidebar[]>(APPS_SIDEBAR_QUERY),
  ]);

  if (!app) notFound();

  // Filter to clean single-segment slugs only — done in JS for reliable string matching
  const allApps = allAppsRaw.filter((a) => !a.slug.current.includes("/"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.title,
    description: app.description || app.tagline,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Microsoft Dynamics 365 Business Central",
    offers: app.appStoreUrl
      ? { "@type": "Offer", url: app.appStoreUrl }
      : undefined,
    provider: {
      "@type": "Organization",
      name: "Faect BV",
      url: "https://faect.nl",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-faect-navy pb- relative flex min-h-95 w-full overflow-hidden px-4 pt-8 md:min-h-100 lg:min-h-120">
          {/* Background image — shared across all app detail pages */}
          <div className="animate-fade-in absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/apps/apps-DDP.jpg"
              alt={app.title}
              fill
              className="object-cover object-bottom"
              priority
            />
          </div>

          <div className="w relative z-10 container mb-2 flex-col justify-between sm:mx-4 xl:mx-12">
            <div className="flex-col justify-between gap-10 md:gap-16 lg:mb-20 lg:flex-row lg:py-16 xl:mb-40">
              {/* ── Left: heading + tagline + CTA ── */}
              <div className="animate-fade-in sm:my-18-18 mt-0 mb-48 flex flex-1 flex-col text-center md:mt-12 md:mr-[30%] md:mb-46 md:text-left lg:mr-[40%] xl:mb-28">
                <h1 className="font-cairo text-faect-blue text-3xl font-extrabold tracking-tight text-shadow-lg sm:text-4xl md:text-[2.8rem] lg:text-[4rem] xl:text-[4.5rem]">
                  {app.title}
                </h1>
                {app.tagline && (
                  <p className="pt-2 leading-tight font-semibold tracking-wide text-white text-shadow-lg md:text-[1.5rem] lg:text-4xl xl:mt-3 xl:text-3xl">
                    {app.tagline}
                  </p>
                )}
                {app.appStoreUrl && (
                  <div className="pt-2">
                    <a
                      href={app.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-faect-blue hover:bg-faect-blue/80 inline-flex items-center gap-2.5 rounded-lg px-6 py-6.5 text-sm font-semibold text-white transition-colors"
                    >
                      <MicrosoftIcon />
                      Bekijk in AppSource
                    </a>
                  </div>
                )}
              </div>

              {/* ── Right: description intro block ── */}
              {app.description && (
                <div className="animate-slide-up absolute bottom-2 lg:ml-[50%] lg:shrink-0 xl:ml-[55%]">
                  <div className="bg-faect-blue/90 mt-16 border-l-[6px] border-white px-4 py-1 shadow-2xl">
                    <p className="font-heading text-[1.2rem] leading-snug font-normal tracking-wide text-white xl:text-[1.4rem]">
                      {app.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Content + Sidebar ────────────────────────────────────────────── */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-start">
            {/* ── Main content ───────────────────────────────────────────────── */}
            <article className="min-w-0 flex-1">
              {/* App icon */}
              {app.icon?.asset && (
                <div className="mb-10 flex justify-center lg:-mt-38 lg:justify-start">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-xl lg:h-51 lg:w-51">
                    <Image
                      src={
                        app.icon.asset.url || urlFor(app.icon).width(120).url()
                      }
                      alt={app.title}
                      width={96}
                      height={96}
                      className="h-32 w-32 rounded-full object-contain lg:size-51"
                    />
                  </div>
                </div>
              )}

              {/* Rich body */}
              {app.body && app.body.length > 0 && (
                <div
                  className={`${styles.articleContent} text-faect-gray prose prose-lg max-w-none`}
                >
                  <PortableText
                    value={
                      groupVoordelenBlocks(app.body) as PortableTextBlock[]
                    }
                    components={{
                      types: {
                        voordelen_group: ({
                          value,
                        }: {
                          value: {
                            items: {
                              _key: string;
                              children: { text: string }[];
                            }[];
                          };
                        }) => (
                          <div className="voordelen-list">
                            {value.items.map((item) => {
                              const text = item.children?.[0]?.text ?? "";
                              return (
                                <p key={item._key}>
                                  <span className="text-faect-blue mr-4 ml-[3.4rem] shrink-0 font-bold">
                                    ✔
                                  </span>
                                  <span>{text.slice(1).trim()}</span>
                                </p>
                              );
                            })}
                          </div>
                        ),
                      },
                      block: {
                        normal: ({ children }) => <p>{children}</p>,
                        h2: ({ children }) => (
                          <>
                            <h2 className="text-faect-navy mt-10 mb-3 flex items-center gap-3">
                              <span className="bg-faect-blue/10 text-faect-blue mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                                <SectionIcon heading={String(children)} />
                              </span>
                              {children}
                            </h2>
                          </>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-faect-blue font-heading bg-amber flex items-start gap-2 text-lg font-semibold">
                            <svg
                              className="mt-2 inline-block h-2 w-2 fill-current"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="4" />
                            </svg>
                            {children}
                          </h3>
                        ),
                      },
                    }}
                  />
                </div>
              )}

              {/* Features */}
              {app.features && app.features.length > 0 && (
                <div className={styles.featuresBox}>
                  <h2>Belangrijkste functies</h2>
                  <ul
                    className={`${styles.featureList} grid gap-3 sm:grid-cols-2`}
                  >
                    {app.features.map((feature, i) => (
                      <li key={i}>
                        <span className={styles.checkmark}>✓</span>
                        <span className="text-faect-gray text-[1.05rem] leading-6">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-9 mb-12 hidden max-w-xs lg:block">
                <Link
                  href="/faect-apps"
                  className="border-faect-blue/60 text-faect-blue hover:bg-faect-blue nav-item-sweep font-ui flex w-full items-center justify-center gap-2 rounded-lg border bg-white px-12 py-2 font-semibold shadow-sm transition-colors hover:text-white"
                >
                  <LayoutGrid className="h-4 w-4 shrink-0" />
                  Alle Faect Apps
                </Link>
              </div>
            </article>

            {/* ── Sidebar — desktop only (lg+) ───────────────────────────────── */}
            <aside className="hidden w-full shrink-0 lg:block lg:w-72 xl:w-88">
              <div
                className="sticky top-8 w-72 space-y-10 xl:w-88"
                style={{ maxHeight: "calc(100vh - 6rem)", overflowY: "auto" }}
              >
                {/* Factsheet button — just before the nav card */}
                {app.factsheet?.asset?.url && (
                  <a
                    href={app.factsheet.asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-faect-blue/60 text-faect-blue hover:bg-faect-blue nav- nav-item-sweep font-ui flex w-full items-center justify-center gap-2 rounded-lg border bg-white py-2 font-semibold shadow-sm transition-colors hover:text-white"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Factsheet downloaden
                  </a>
                )}

                <div className="bg-faect-blue/10 rounded-lg p-4 shadow-sm">
                  {/* Header */}
                  <p className="text-faect-navy mb-2 font-semibold">
                    De andere Faect Apps
                  </p>

                  {/* Nav links — current app excluded */}
                  <nav>
                    <ul className="space-y-0.5">
                      {allApps
                        .filter((sideApp) => sideApp.slug.current !== slug)
                        .map((sideApp) => (
                          <li key={sideApp._id}>
                            <Link
                              href={`/faect-apps/${sideApp.slug.current}`}
                              className="text-faect-gray hover:bg-faect-navy/50 flex items-center rounded-md px-3 py-2 font-medium transition-colors hover:text-white"
                            >
                              <span className="leading-tight">
                                {sideApp.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </nav>

                  {/* AppSource CTA */}
                  {app.appStoreUrl && (
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <a
                        href={app.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-faect-blue/30 text-faect-blue hover:bg-faect-blue flex w-full items-center justify-center gap-1.5 rounded-md border py-2 text-xs font-semibold transition-colors hover:text-white"
                      >
                        <MicrosoftIcon className="h-3.5 w-3.5" />
                        Bekijk in AppSource
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* ── 3-button nav — all sizes ────────────────────────────────────── */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:hidden">
            <Link
              href="/faect-apps"
              className="border-faect-blue/60 text-faect-blue hover:bg-faect-blue nav-item-sweep font-ui flex w-full items-center justify-center gap-2 rounded-lg border bg-white py-2.5 font-semibold shadow-sm transition-colors hover:text-white"
            >
              <LayoutGrid className="h-4 w-4 shrink-0" />
              Alle Faect Apps
            </Link>

            {app.factsheet?.asset?.url && (
              <a
                href={app.factsheet.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-faect-blue/60 text-faect-blue hover:bg-faect-blue nav-item-sweep font-ui flex w-full items-center justify-center gap-2 rounded-lg border bg-white py-2.5 font-semibold shadow-sm transition-colors hover:text-white"
              >
                <DownloadIcon className="h-4 w-4 shrink-0" />
                Factsheet
              </a>
            )}

            <AppNavModal apps={allApps} currentSlug={slug} />
          </div>
        </div>
      </main>
    </>
  );
}

function SectionIcon({ heading }: { heading: string }) {
  const h = heading.toLowerCase();
  if (h.includes("waarom")) return <Star className="h-4.5 w-4.5" />;
  if (h.includes("functionaliteit"))
    return <KeyRound className="h-4.5 w-4.5" />;
  if (h.includes("voordelen")) return <TrendingUp className="h-4.5 w-4.5" />;
  if (h.includes("beschikbaarheid")) return <Monitor className="h-4.5 w-4.5" />;
  if (h.includes("call")) return <Zap className="h-4.5 w-4.5" />;
  return <Star className="h-4.5 w-4.5" />;
}

function MicrosoftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 21 21" fill="none">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}
