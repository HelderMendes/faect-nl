import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { heroConfigs } from "@/config/heroConfigs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ons Team — Faect",
  description:
    "Maak kennis met het team van Microsoft Dynamics 365 Business Central specialisten bij Faect.",
};

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
