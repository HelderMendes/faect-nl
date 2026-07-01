import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { SimpleContentPage } from "@/components/layout/SimpleContentPage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Faect",
  description:
    "Het privacybeleid van Faect en de manier waarop persoonsgegevens worden verwerkt.",
};

export default async function PrivacyPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "privacy" });

  if (page?.pageBuilder?.length) {
    return (
      <main className="block-background-overlay flex flex-col pt-20 pb-16 lg:pt-24 lg:pb-20">
        <h1 className="text-faect-blue font-heading 0 text-center text-[2.4rem]/16 font-semibold md:text-5xl/20">
          {page.title ?? "Privacy Policy"}
        </h1>

        <BlockRenderer blocks={page.pageBuilder} />

        <section className="pt-0 pb-20 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/contact"
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <SimpleContentPage
      title="Privacy Policy"
      intro="Faect behandelt persoonsgegevens zorgvuldig en verwerkt gegevens alleen voor duidelijke, gerechtvaardigde doelen. Op deze pagina lees je hoe we omgaan met websitebezoek, contactaanvragen, nieuwsbrieven en analytische gegevens."
      sections={[
        {
          title: "Toepassingsbereik",
          body: [
            "Dit privacybeleid geldt voor alle websites en elektronische nieuwsbrieven van Faect.",
            "Wanneer je de website bezoekt, kunnen technische gegevens worden verwerkt zoals IP-adres, browserinformatie en de pagina die je bezocht.",
          ],
        },
        {
          title: "Verwerking van persoonsgegevens",
          body: [
            "Persoonsgegevens die je actief verstrekt, zoals naam, contactgegevens en voorkeuren, worden gebruikt om contact op te nemen, informatie te delen over producten of aanbiedingen, de dienstverlening te verbeteren en marktonderzoek uit te voeren.",
            "Andere vormen van verwerking vinden alleen plaats als je daar ondubbelzinnig toestemming voor hebt gegeven.",
          ],
        },
        {
          title: "Nieuwsbrieven en cookies",
          body: [
            "Aanmelden voor een nieuwsbrief verloopt via een double opt-in proces. Onder aan elke nieuwsbrief vind je een link waarmee je je eenvoudig kunt uitschrijven.",
            "Faect maakt daarnaast gebruik van Google Analytics om het gebruik van de website te analyseren en te verbeteren.",
          ],
        },
        {
          title: "Vragen en inzage",
          body: [
            "Heb je vragen over de verwerking van je gegevens of wil je inzage of correctie van persoonsgegevens aanvragen, neem dan contact op met Faect via info@faect.nl of 088 – 707 7000.",
          ],
        },
      ]}
      cta={{ label: "Contact opnemen", href: "/contact" }}
    />
  );
}
