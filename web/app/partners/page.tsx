import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { heroConfigs } from "@/config/heroConfigs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Partners — Faect",
  description:
    "Ontdek de strategische partners waarmee Faect samenwerkt om de beste Microsoft Dynamics 365 Business Central oplossingen te leveren.",
};

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
