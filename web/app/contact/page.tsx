import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

type ContactSeoData = {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: { asset?: { url?: string } };
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<ContactSeoData | null>(PAGE_QUERY, {
    slug: "contact",
  });

  return buildMetadata({
    title: page?.seoTitle || "Contact — Faect",
    description:
      page?.seoDescription ||
      "Neem contact op met het team van Faect — Microsoft Dynamics 365 Business Central specialisten. Stel je vraag of plan een kennismaking.",
    path: "/contact",
    image: page?.seoImage?.asset?.url,
  });
}

export default async function ContactPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "contact" });

  return (
    <main>
      <BlockRenderer blocks={page?.pageBuilder ?? []} />
    </main>
  );
}
