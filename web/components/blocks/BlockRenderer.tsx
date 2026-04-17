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
  BlockCaseStudyGrid,
} from "@/components/blocks";

// Map block types to components
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
  blockCaseStudyGrid: BlockCaseStudyGrid,
};

interface Block {
  _type: string;
  _key: string;
  [key: string]: any;
}

interface BlockRendererProps {
  blocks?: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block._type];

        if (!Component) {
          // In development, show a warning for unknown block types
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

        return <Component key={block._key} {...block} />;
      })}
    </>
  );
}
