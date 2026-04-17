import { getSectionStyles, type SectionSettings } from "./sectionUtils";

interface Stat {
  _key: string;
  value: string;
  label: string;
  description?: string;
}

interface BlockStatsProps {
  heading?: string;
  stats?: Stat[];
  layout?: "row" | "grid";
  backgroundVariant?: "light" | "dark" | "accent";
  settings?: SectionSettings;
}

export function BlockStats({
  heading,
  stats,
  layout = "row",
  backgroundVariant = "light",
  settings,
}: BlockStatsProps) {
  const displayStats = stats || [];

  if (displayStats.length === 0) return null;

  const variantStyles = {
    light: "bg-white text-faect-navy",
    dark: "bg-faect-navy text-white",
    accent: "bg-faect-blue text-white",
  };

  return (
    <section
      className={getSectionStyles(
        settings || {
          backgroundColor: backgroundVariant === "dark" ? "navy" : "white",
        },
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {heading && (
          <h2 className="font-heading mb-16 text-center text-3xl font-bold md:text-4xl">
            {heading}
          </h2>
        )}

        <div
          className={`grid grid-cols-2 ${layout === "row" ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-12`}
        >
          {displayStats.map((stat) => (
            <div key={stat._key} className="group text-center">
              <div className="font-heading text-faect-blue mb-4 text-4xl font-bold transition-transform group-hover:scale-110 md:text-6xl">
                {stat.value}
              </div>
              <div className="mb-2 text-lg font-bold">{stat.label}</div>
              {stat.description && (
                <p className="text-faect-gray text-sm">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
