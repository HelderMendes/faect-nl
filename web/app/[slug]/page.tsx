import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { heroConfigs } from "@/config/heroConfigs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

type DynamicPageData = {
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: { asset?: { url?: string } };
  pageFolder?: string;
  pageBuilder?: Array<{
    _type: string;
    _key: string;
    [key: string]: unknown;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch<DynamicPageData | null>(PAGE_QUERY, { slug });

  const fallbackTitle = slug === "home" ? "Home" : slug.replace(/-/g, " ");
  const title = data?.seoTitle || data?.title || `${fallbackTitle} — Faect`;
  const description =
    data?.seoDescription ||
    `Lees meer over ${data?.title || fallbackTitle} bij Faect.`;
  const image = data?.seoImage?.asset?.url;

  return buildMetadata({
    title,
    description,
    path: slug === "home" ? "/" : `/${slug}`,
    image,
  });
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await client.fetch<DynamicPageData | null>(PAGE_QUERY, { slug });

  if (!data) {
    notFound();
  }

  const heroConfig =
    heroConfigs[slug] ??
    (data.pageFolder ? heroConfigs[data.pageFolder] : undefined);

  return (
    <main className="flex flex-col">
      {data.pageBuilder && (
        <BlockRenderer blocks={data.pageBuilder} heroConfig={heroConfig} />
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}
