import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { heroConfigs } from "@/config/heroConfigs";
import { BlockRenderer } from "@/components/BlockRenderer";
import {
  BlockHero,
  BlockFeatureGrid,
  BlockTextWithImage,
  BlockCTA,
  BlockAppShowcase,
  BlockPartnerLogos,
} from "@/components/blocks";

export const revalidate = 60; // ISR

export default async function Home() {
  const data = await client.fetch(PAGE_QUERY, { slug: "home" });

  // If we have Sanity page data with blocks, render them
  if (data?.pageBuilder && data.pageBuilder.length > 0) {
    return (
      <main className="flex flex-col">
        <BlockRenderer
          blocks={data.pageBuilder}
          heroConfig={heroConfigs["home"]}
        />
      </main>
    );
  }

  // Fallback / Hardcoded content for initial view before CMS input
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <BlockHero
        heading="Transformeer en professionaliseer jouw bedrijf met Faect"
        subheading="Specialisten in standaard Microsoft business software, op maat voor jou geconfigureerd!"
        backgroundImage={{ asset: { url: "/home/Faect-Header-Home01-1.jpg" } }}
        infoBlocks={[
          "Faect is gespecialiseerd in het leveren van standaard software geconfigureerd op maat van de klant.",
          "Met onze expertise ondersteunen wij bedrijven in diverse sectoren om hun processen te verbeteren en hun efficiëntie te verhogen.",
        ]}
      />

      <div>
        <h1 className="text-center text-5xl">MY big Text</h1>
      </div>
      {/* Partner Logos */}
      <BlockPartnerLogos
        heading="Onze Partners & Koppelingen"
        displayMode="slider"
        settings={{
          backgroundColor: "white",
          paddingTop: "compact",
          paddingBottom: "compact",
        }}
        partners={[
          { _id: "p1", name: "Microsoft", logo: null },
          { _id: "p2", name: "Auto-ID", logo: null },
          { _id: "p3", name: "Continia", logo: null },
          { _id: "p4", name: "Tasklet Factory", logo: null },
          { _id: "p5", name: "Exflow", logo: null },
        ]}
      />
      <div>
        <h1 className="text-center text-5xl">MY big Text 02</h1>
      </div>

      {/* About Section - Text with Image */}
      <BlockTextWithImage
        heading="Professionaliseer met Business Central"
        content={[
          {
            _type: "block",
            _key: "b1",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Faect is gespecialiseerd in het leveren van standaard software geconfigureerd op maat van de klant. Met onze expertise ondersteunen wij bedrijven in diverse sectoren om hun processen te verbeteren en hun efficiëntie te verhogen.",
              },
            ],
          },
        ]}
        image={{ asset: { url: "/home/Firefly01.jpg" } }}
        imagePosition="left"
        settings={{ backgroundColor: "gray" }}
      />

      <div>
        <h1 className="text-center text-5xl">MY big Text 03</h1>
      </div>

      {/* Functonality Grid - Faect Apps */}
      <BlockAppShowcase
        apps={[
          {
            _id: "app1",
            title: "Finance & Banking",
            excerpt:
              "Automatiseer bankafschriften en verbeter je cashflow beheer.",
          },
          {
            _id: "app2",
            title: "WMS Solution",
            excerpt: "Optimaliseer je magazijnprocessen met real-time data.",
          },
          {
            _id: "app3",
            title: "Data Management",
            excerpt: "Beheer je stamgegevens centraal en voorkom fouten.",
          },
        ]}
        settings={{ backgroundColor: "navy" }}
      />

      {/* Features Section - Waarom Faect */}
      <BlockFeatureGrid
        title="Waarom kiezen voor Faect?"
        features={[
          {
            _key: "1",
            title: "Efficiëntie en Innovatie",
            description:
              "Onze oplossingen zijn ontwikkeld om organisaties slimmer te laten werken met hogere efficiëntie.",
          },
          {
            _key: "2",
            title: "Geïntegreerde processen",
            description:
              "Handmatig werk verminderen door standaardisatie en automatisering.",
          },
          {
            _key: "3",
            title: "Gebruiksvriendelijkheid",
            description:
              "Een platform dat naadloos aansluit op je processen en meegroeit.",
          },
        ]}
        settings={{ backgroundColor: "white" }}
      />

      {/* CTA Section */}
      <BlockCTA
        heading="Klaar om te groeien met Faect?"
        text="Neem contact met ons op voor een vrijblijvend gesprek over de mogelijkheden voor jouw organisatie."
        ctaText="Neem contact op"
        ctaLink="/contact"
      />
    </main>
  );
}
