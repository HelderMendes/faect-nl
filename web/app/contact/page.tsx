import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact — Faect",
  description:
    "Neem contact op met het team van Faect — Microsoft Dynamics 365 Business Central specialisten. Stel je vraag of plan een kennismaking.",
};

export default async function ContactPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "contact" });

  return (
    <main>
      <BlockRenderer blocks={page?.pageBuilder ?? []} />
    </main>
  );
}
