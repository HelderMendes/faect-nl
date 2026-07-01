import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/BlockRenderer";
import { heroConfigs } from "@/config/heroConfigs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Vacatures — Faect",
  description:
    "Bekijk de vacatures van Faect en ontdek werken bij een specialist in Microsoft Dynamics 365 Business Central.",
};

function paragraph(text: string) {
  return {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  };
}

const vacaturesFallbackBlocks = [
  {
    _type: "blockHero",
    _key: "vacatures-hero",
    heading: "Kom werken bij Faect: Jouw Bijdrage Telt!",
    subheading: "Samen Maken We Het Verschil",
    backgroundImage: { asset: { url: "/team/team_hero.jpg" } },
    intro01:
      "Bij Faect werk je samen met een gedreven team aan innovatieve oplossingen. Of je nu een ervaren professional bent of net begint, jouw talent maakt bij ons écht impact.",
    intro02:
      "Faect is het bedrijf waar jouw ideeën en talent centraal staan. We verwelkomen mensen met ervaring, maar ook nieuw talent dat klaar is om te groeien.",
  },
  {
    _type: "blockTextWithImage",
    _key: "vacatures-intro",
    layout: "side",
    imagePosition: "right",
    headerTitle: "Werken bij Faect",
    heading: "Jouw ideeën en talent krijgen hier ruimte om te groeien",
    headingSize: "lg",
    image: { asset: { url: "/team/team_jij-en_ik02.jpg" } },
    content: [
      paragraph(
        "Faect is een plek waar jouw ideeën en talent centraal staan. We verwelkomen mensen met jarenlange ervaring én nieuw talent dat klaar is om te groeien. Samen creëren we oplossingen die een verschil maken in de wereld.",
      ),
      paragraph(
        "We combineren ondernemerschap, Microsoft Dynamics 365 Business Central expertise en een hecht team met veel ruimte voor initiatief. Daardoor kun je hier snel leren, verantwoordelijkheid nemen en zichtbaar impact maken.",
      ),
    ],
  },
  {
    _type: "blockRichText",
    _key: "vacatures-open-positions",
    heading: "Open vacatures",
    maxWidth: "default",
    alignment: "left",
    content: [
      paragraph(
        "Op dit moment hebben wij geen openstaande vacatures, maar inspirerende kandidaten nodigen wij van harte uit een open sollicitatie bij ons te doen.",
      ),
      paragraph(
        "Wij waarderen de inspanning die arbeidsbemiddelaars willen doen, maar wij werven graag onze eigen kandidaten.",
      ),
    ],
  },
  {
    _type: "blockFeatureGrid",
    _key: "vacatures-why-faect",
    layout: "icon-list-2col",
    title: "Waarom Faect",
    subtitle:
      "Of je nu aan het begin van je carrière staat of juist veel ervaring meebrengt: bij Faect krijg je de ruimte om bij te dragen op een manier die bij jou past.",
    features: [
      {
        _key: "vacatures-starters",
        title: "Voor starters",
        description:
          "Begin je carrière in een omgeving waar je kunt leren, groeien en impact maken.",
      },
      {
        _key: "vacatures-experienced",
        title: "Voor ervaren professionals",
        description:
          "Zet je expertise in en werk mee aan uitdagende projecten die ertoe doen.",
      },
    ],
  },
  {
    _type: "blockFeatureGrid",
    _key: "vacatures-benefits",
    layout: "numbered-cards",
    title: "Wat Wij Bieden",
    features: [
      {
        _key: "vacatures-benefit-culture",
        title: "Inspirerende en inclusieve werkomgeving",
        description:
          "Je werkt in een team waar samenwerking, eigenaarschap en een open sfeer centraal staan.",
      },
      {
        _key: "vacatures-benefit-growth",
        title: "Opleidings- en doorgroeimogelijkheden",
        description:
          "We investeren actief in jouw ontwikkeling, zowel inhoudelijk als in je volgende stap.",
      },
      {
        _key: "vacatures-benefit-balance",
        title: "Flexibiliteit en werk-privébalans",
        description:
          "We geloven in duurzaam presteren met voldoende ruimte voor flexibiliteit en balans.",
      },
    ],
    ctaText: "Wil je meer weten over werken bij Faect",
    ctaLink: "/contact",
  },
  {
    _type: "blockCTA",
    _key: "vacatures-open-application",
    heading: "Open sollicitatie",
    text: "Wil je bij ons komen werken, maar zie je op dit moment geen vacature die bij je past? Stuur ons een open sollicitatie. We zijn altijd op zoek naar gedreven en talentvolle mensen om ons team te versterken.",
    ctaText: "Neem contact op",
    ctaLink: "/contact",
    backgroundImage: { asset: { url: "/contact/bkg_banner.jpg" } },
  },
];

export default async function VacaturesPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: "vacatures" });
  const blocks = page?.pageBuilder?.length
    ? page.pageBuilder
    : vacaturesFallbackBlocks;
  const heroConfig = heroConfigs.vacatures;

  return (
    <main className="flex flex-col">
      <BlockRenderer blocks={blocks} heroConfig={heroConfig} />
    </main>
  );
}
