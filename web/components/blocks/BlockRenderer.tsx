import {
  BlockHero,
  BlockCTA,
  BlockTextWithImage,
  BlockFeatureGrid,
  BlockRichText,
  BlockSectorGrid,
  BlockServiceCards,
  BlockFAQ,
  BlockProcessSteps,
  BlockStats,
  BlockContactForm,
  BlockContactInfo,
  BlockAppShowcase,
  BlockTeamGrid,
  BlockPartnerLogos,
  BlockTextWithServiceGrid,
  BlockTextWithAccordion,
  BlockTwoColumnCTA,
  type HeroConfig,
} from "@/components/blocks";

// Component props are heterogeneous and checked at the Sanity schema level, not here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<string, React.ComponentType<any>> = {
  blockHero: BlockHero,
  blockCTA: BlockCTA,
  blockTextWithImage: BlockTextWithImage,
  blockFeatureGrid: BlockFeatureGrid,
  blockRichText: BlockRichText,
  blockSectorGrid: BlockSectorGrid,
  blockServiceCards: BlockServiceCards,
  blockFAQ: BlockFAQ,
  blockProcessSteps: BlockProcessSteps,
  blockStats: BlockStats,
  blockContactForm: BlockContactForm,
  blockContactInfo: BlockContactInfo,
  blockAppShowcase: BlockAppShowcase,
  blockTeamGrid: BlockTeamGrid,
  blockPartnerLogos: BlockPartnerLogos,
  blockTextWithServiceGrid: BlockTextWithServiceGrid,
  blockTextWithAccordion: BlockTextWithAccordion,
  blockTwoColumnCTA: BlockTwoColumnCTA,
};

interface Block {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

interface BlockRendererProps {
  blocks?: Block[];
  heroConfig?: HeroConfig;
}

export function BlockRenderer({ blocks, heroConfig }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block._type];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Unknown block type: ${block._type}`);
            return (
              <div
                key={block._key}
                className="my-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
              >
                Unknown block type: <code>{block._type}</code>
              </div>
            );
          }
          return null;
        }

        const extraProps =
          block._type === "blockHero" && heroConfig ? { heroConfig } : {};

        return <Component key={block._key} {...block} {...extraProps} />;
      })}
    </>
  );
}
