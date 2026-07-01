import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import {
  DownloadIcon,
  SimpleContentPage,
} from "@/components/layout/SimpleContentPage";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type VoorwaardenSeoData = {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: { asset?: { url?: string } };
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<VoorwaardenSeoData | null>(PAGE_QUERY, {
    slug: "voorwaarden",
  });

  return buildMetadata({
    title: page?.seoTitle || "Algemene Voorwaarden — Faect",
    description:
      page?.seoDescription ||
      "De algemene voorwaarden van Faect en de NLdigital downloads.",
    path: "/voorwaarden",
    image: page?.seoImage?.asset?.url,
  });
}

export default async function VoorwaardenPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "voorwaarden" });

  if (page?.pageBuilder?.length) {
    return (
      <main className="block-background-overlay flex flex-col pt-20 pb-16 lg:pt-24 lg:pb-20">
        <h1 className="text-faect-blue font-heading 0 text-center text-[2.4rem]/16 font-semibold md:text-5xl/20">
          {page.title ?? "Algemene Voorwaarden"}
        </h1>

        <BlockRenderer blocks={page.pageBuilder} />

        <section className="pt-0 pb-20 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
              <a
                href="/pdfs/voorwaarden.pdf"
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center gap-4 rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
              >
                <DownloadIcon />
                Download Algemene Voorwaarden
              </a>
              <a
                href="/pdfs/conditions.pdf"
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center gap-4 rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
              >
                <DownloadIcon />
                Download General Terms and Conditions
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <SimpleContentPage
      title="Algemene Voorwaarden"
      intro="Faect hanteert de NLdigital voorwaarden als basis voor haar dienstverlening. Deze voorwaarden vormen de standaard voor de ICT-branche en dekken de belangrijkste zakelijke afspraken en dienstverlening af."
      sections={[
        {
          title: "Downloads",
          body: [
            "Download de actuele voorwaarden in de taal die je nodig hebt.",
          ],
        },
        {
          title: "Wat je kunt verwachten",
          body: [
            "De voorwaarden beschrijven onder andere de manier waarop Faect diensten levert, welke afspraken gelden rondom samenwerking en hoe verantwoordelijkheden zijn verdeeld.",
          ],
        },
      ]}
      actions={[
        {
          label: "Download Algemene Voorwaarden",
          href: "https://faect.nl/wp-content/uploads/2025/12/NLdigital-Voorwaarden-2025-NL.pdf",
          external: true,
        },
        {
          label: "Download General Terms and Conditions",
          href: "https://faect.nl/wp-content/uploads/2025/12/NLdigital-Terms-2025-EN.pdf",
          external: true,
        },
      ]}
      cta={{ label: "Neem contact op", href: "/contact" }}
    />
  );
}
