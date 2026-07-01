import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { heroConfigs } from "@/config/heroConfigs";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

type TeamSeoData = {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: { asset?: { url?: string } };
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<TeamSeoData | null>(PAGE_QUERY, {
    slug: "team",
  });

  return buildMetadata({
    title: page?.seoTitle || "Ons Team — Faect",
    description:
      page?.seoDescription ||
      "Maak kennis met het team van Microsoft Dynamics 365 Business Central specialisten bij Faect.",
    path: "/ons-team",
    image: page?.seoImage?.asset?.url,
  });
}

export default async function OnsTeamPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "team" });

  return (
    <main className="flex flex-col">
      <BlockRenderer
        blocks={page?.pageBuilder ?? []}
        heroConfig={heroConfigs["team"]}
      />
    </main>
  );
}
