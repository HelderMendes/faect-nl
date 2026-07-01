import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { heroConfigs } from "@/config/heroConfigs";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

type PartnersSeoData = {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: { asset?: { url?: string } };
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<PartnersSeoData | null>(PAGE_QUERY, {
    slug: "partners",
  });

  return buildMetadata({
    title: page?.seoTitle || "Partners — Faect",
    description:
      page?.seoDescription ||
      "Ontdek de strategische partners waarmee Faect samenwerkt om de beste Microsoft Dynamics 365 Business Central oplossingen te leveren.",
    path: "/partners",
    image: page?.seoImage?.asset?.url,
  });
}

export default async function PartnersPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "partners" });

  return (
    <main>
      <BlockRenderer
        blocks={page?.pageBuilder ?? []}
        heroConfig={heroConfigs["partners"]}
      />
    </main>
  );
}
