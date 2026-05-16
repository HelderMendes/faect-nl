import { BlockHero } from "./blocks/BlockHero";
import { BlockCTA } from "./blocks/BlockCTA";
import { BlockTextWithImage } from "./blocks/BlockTextWithImage";
import { BlockFeatureGrid } from "./blocks/BlockFeatureGrid";
import { BlockRichText } from "./blocks/BlockRichText";
import { BlockSectorGrid } from "./blocks/BlockSectorGrid";
import { BlockServiceCards } from "./blocks/BlockServiceCards";
import { BlockFAQ } from "./blocks/BlockFAQ";
import { BlockProcessSteps } from "./blocks/BlockProcessSteps";
import { BlockStats } from "./blocks/BlockStats";
import { BlockContactForm } from "./blocks/BlockContactForm";
import { BlockContactInfo } from "./blocks/BlockContactInfo";
import { BlockAppShowcase } from "./blocks/BlockAppShowcase";
import { BlockTeamGrid } from "./blocks/BlockTeamGrid";
import { BlockPartnerLogos } from "./blocks/BlockPartnerLogos";
import { BlockTextWithServiceGrid } from "./blocks/BlockTextWithServiceGrid";
import { BlockTextWithAccordion } from "./blocks/BlockTextWithAccordion";
import { BlockTwoColumnCTA } from "./blocks/BlockTwoColumnCTA";
import { BlockContactSplit } from "./blocks/BlockContactSplit";
import type { HeroConfig } from "./blocks/sectionUtils";

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
  blockContactSplit: BlockContactSplit,
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
