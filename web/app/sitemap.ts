import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://faect.nl"
).replace(/\/$/, "");

const STATIC_ROUTES = [
  "",
  "/contact",
  "/privacy",
  "/voorwaarden",
  "/help-en-ondersteuning",
  "/vacatures",
  "/ons-team",
  "/partners",
  "/klanten-cases",
  "/blog-nieuws",
  "/faect-apps",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageSlugs, postSlugs, appSlugs] = await Promise.all([
    client.fetch<string[]>(
      `*[_type == "page" && defined(slug.current)].slug.current`,
    ),
    client.fetch<string[]>(
      `*[_type == "post" && defined(slug.current)].slug.current`,
    ),
    client.fetch<string[]>(
      `*[_type == "app" && defined(slug.current)].slug.current`,
    ),
  ]);

  const pageRoutes = (pageSlugs || [])
    .filter(Boolean)
    .map((slug) => (slug === "home" ? "" : `/${slug}`));

  const postRoutes = (postSlugs || [])
    .filter(Boolean)
    .map((slug) => `/blog-nieuws/${slug}`);

  const appRoutes = (appSlugs || [])
    .filter((slug) => Boolean(slug) && !slug.includes("/"))
    .map((slug) => `/faect-apps/${slug}`);

  const allRoutes = Array.from(
    new Set([...STATIC_ROUTES, ...pageRoutes, ...postRoutes, ...appRoutes]),
  );

  const now = new Date();

  return allRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
