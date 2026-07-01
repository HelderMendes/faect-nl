import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import Image from "next/image";

type RichTextBlock = {
  _key?: string;
  _type: "blockRichText";
  heading?: string;
  content?: PortableTextBlock[];
};

export const metadata: Metadata = {
  title: "Help & Ondersteuning — Faect",
  description: "Support en hulp van Faect voor Business Central klanten.",
};

export default async function HelpEnOndersteuningPage() {
  const page = await client.fetch(PAGE_QUERY, {
    slug: "help-en-ondersteuning",
  });

  const richTextBlocks =
    page?.pageBuilder?.filter(
      (block: { _type?: string }): block is RichTextBlock =>
        block._type === "blockRichText",
    ) ?? [];

  const mid = Math.ceil(richTextBlocks.length / 2);
  const leftColumn = richTextBlocks.slice(0, mid);
  const rightColumn = richTextBlocks.slice(mid);

  const otherBlocks =
    page?.pageBuilder?.filter(
      (block: { _type?: string }) => block._type !== "blockRichText",
    ) ?? [];

  if (page?.pageBuilder?.length) {
    return (
      <main className="block-background-overlay flex flex-col pt-20 pb-16 lg:pt-24 lg:pb-20">
        <h1 className="text-faect-blue font-heading mb-40 text-center text-[2.4rem]/16 font-semibold md:text-5xl/20">
          {page.title ?? "Help & Ondersteuning"}
        </h1>

        {richTextBlocks.length > 0 && (
          <section className="pt-8 pb-8 lg:pt-10 lg:pb-10">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
                <div className="space-y-10">
                  {leftColumn.map((block: RichTextBlock) => (
                    <article
                      key={block._key ?? block.heading}
                      className="text-center lg:text-left"
                    >
                      {block.heading && (
                        <h2 className="text-faect-navy font-heading mb-4 text-2xl font-semibold md:text-3xl">
                          {block.heading}
                        </h2>
                      )}
                      {block.content && (
                        <div className="prose prose-lg max-w-none text-gray-700 lg:text-left">
                          <PortableText value={block.content} />
                        </div>
                      )}
                    </article>
                  ))}
                </div>

                <div className="space-y-10">
                  {rightColumn.map((block: RichTextBlock) => (
                    <article
                      key={block._key ?? block.heading}
                      className="text-center lg:text-left"
                    >
                      {block.heading && (
                        <h2 className="text-faect-navy font-heading mb-4 text-2xl font-semibold md:text-3xl">
                          {block.heading}
                        </h2>
                      )}
                      {block.content && (
                        <div className="prose prose-lg max-w-none text-gray-700 lg:text-left">
                          <PortableText value={block.content} />
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {otherBlocks.length > 0 && <BlockRenderer blocks={otherBlocks} />}

        <section className="pt-0 pb-20 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto flex max-w-4xl justify-center">
              <Link
                href="/contact"
                className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
              >
                Neem contact op
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="block-background-overlay flex flex-col pt-20 pb-16 lg:pt-24 lg:pb-20">
      <h1 className="text-faect-blue font-heading text-center text-[2.4rem]/16 font-semibold md:text-5xl/20">
        Help & Ondersteuning
      </h1>

      <section className="pt-8 pb-20 lg:pt-10 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <article className="text-center lg:text-left">
              <h2 className="text-faect-navy font-heading mb-4 text-2xl font-semibold md:text-3xl">
                Help & Ondersteuning
              </h2>
              <p className="text-faect-gray text-[1.05rem]/8 md:text-[1.1rem]/8">
                Bij Faect staan we altijd voor jou klaar! Je kunt onze Support
                Service Desk van maandag tot en met vrijdag bereiken van 9:00
                tot 17:00, zowel telefonisch als per e-mail. Heb je vragen of
                behoefte aan ondersteuning? Neem gerust contact met ons op, we
                helpen je graag verder!
              </p>
              <p className="text-faect-gray mt-4 text-[1.05rem]/8 md:text-[1.1rem]/8">
                <Image
                  src="/regels/help-en_ondersteuning.gif"
                  alt="Support Team"
                  height={300}
                  width={600}
                  className="mx-auto object-cover object-bottom lg:mx-0"
                  priority
                />
              </p>
            </article>

            <article className="text-center lg:text-left">
              <h2 className="text-faect-navy font-heading mb-4 text-2xl font-semibold md:text-3xl">
                Help & Support
              </h2>
              <p className="text-faect-gray text-[1.05rem]/8 md:text-[1.1rem]/8">
                Would you like support in English? No problem. All our staff are
                happy to help!
              </p>
              <h2 className="text-faect-navy font-heading mb-4 pt-8 text-2xl font-semibold md:text-3xl">
                Meer zekerheid met een Service Contract
              </h2>
              <p className="text-faect-gray text-[1.05rem]/8 md:text-[1.1rem]/8">
                Bij Faect bieden we onze klanten de zekerheid van uitstekende
                service, ondersteund door duidelijke Service Level Afspraken,
                wanneer zij kiezen voor een Service Contract.
              </p>
              <p className="text-faect-gray text-[1.05rem]/8 md:text-[1.1rem]/8">
                Onze experts staan altijd klaar om snel en efficiënt te reageren
                op jouw behoeften, zodat je nooit voor verrassingen komt te
                staan.
              </p>
              <p className="text-faect-gray text-[1.05rem]/8 md:text-[1.1rem]/8">
                Met een Service Contract kun je rekenen op betrouwbaarheid,
                kwaliteit en de hoogste prioriteit bij het oplossen van
                eventuele vraagstukken.
              </p>
              <p className="text-faect-gray text-[1.05rem]/8 md:text-[1.1rem]/8">
                Vraag ons naar de Service Contract mogelijkheden, jouw
                tevredenheid is onze prioriteit!
              </p>
            </article>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/contact"
              className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
