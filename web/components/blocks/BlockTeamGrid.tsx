import { getSectionStyles, type SectionSettings } from "./sectionUtils";
import { TeamCardsWithModal, type TeamMemberData } from "./TeamCardsWithModal";

interface BlockTeamGridProps {
  heading?: string;
  subheading?: string;
  members?: TeamMemberData[];
  showAll?: boolean;
  columns?: 2 | 3 | 4;
  showBio?: boolean;
  showContact?: boolean;
  settings?: SectionSettings;
}

export function BlockTeamGrid({
  heading,
  subheading,
  members,
  columns = 3,
  showBio = true,
  settings,
}: BlockTeamGridProps) {
  if (!members || members.length === 0) return null;

  return (
    <section
      className={
        (getSectionStyles(settings, { noOverlay: true }),
        "section-dither-flipped py-22")
      }
    >
      <div className="container mx-auto px-4 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="font-cairo text-faect-navy mb-4 text-4xl font-bold">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                {subheading}
              </p>
            )}
          </div>
        )}

        <TeamCardsWithModal
          members={members}
          showBio={showBio}
          columns={columns}
        />
      </div>
    </section>
  );
}
