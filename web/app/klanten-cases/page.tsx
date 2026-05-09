import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY, CASE_STUDIES_PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { CaseAccordion } from "@/components/klanten/CaseAccordion";
import { heroConfigs } from "@/config/heroConfigs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Klanten & Cases — Faect",
  description:
    "Ontdek hoe Faect organisaties helpt groeien met Microsoft Dynamics 365 Business Central.",
};

type CaseStudy = {
  _id: string;
  title: string;
  clientName: string;
  industry: string;
  clientWebsite?: string | null;
  summary?: string | null;
  solution?: string | null;
  clientLogo?: { asset?: { url?: string } } | null;
};

export default async function KlantenCasesPage() {
  const [page, cases] = await Promise.all([
    client.fetch(PAGE_QUERY, { slug: "klanten-cases" }),
    client.fetch<CaseStudy[]>(CASE_STUDIES_PAGE_QUERY),
  ]);

  const normalised = cases.map((c) => ({
    ...c,
    logo: c.clientLogo ?? null,
  }));

  return (
    <main className="section-dither-flipped">
      <BlockRenderer
        blocks={page?.pageBuilder?.filter(
          (b: { _type: string }) => b._type === "blockHero",
        )}
        heroConfig={heroConfigs["klanten-cases"]}
      />

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <CaseAccordion cases={normalised} />
        </div>
      </section>

      <BlockRenderer
        blocks={page?.pageBuilder?.filter(
          (b: { _type: string }) => b._type !== "blockHero",
        )}
      />
    </main>
  );
}
