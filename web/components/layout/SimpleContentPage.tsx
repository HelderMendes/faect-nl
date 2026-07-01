import Link from "next/link";

export function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 512 512"
      className="h-5 w-5 shrink-0 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
    </svg>
  );
}

type SimpleContentSection = {
  title: string;
  body: string[];
};

type SimpleContentPageProps = {
  title: string;
  intro?: string;
  sections?: SimpleContentSection[];
  actions?: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  cta?: {
    label: string;
    href: string;
  };
};

export function SimpleContentPage({
  title,
  intro,
  sections = [],
  actions = [],
  cta,
}: SimpleContentPageProps) {
  return (
    <main className="section-dither-flipped">
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_18px_48px_rgba(23,64,111,0.12)] backdrop-blur-sm md:p-10 lg:p-12">
            <h1 className="text-faect-blue font-heading mb-6 text-3xl font-semibold md:text-5xl">
              {title}
            </h1>

            {intro && (
              <p className="text-faect-gray mb-10 text-lg leading-8 md:text-xl">
                {intro}
              </p>
            )}

            <div className="space-y-10">
              {sections.map((section) => (
                <article key={section.title} className="space-y-4">
                  <h2 className="text-faect-navy font-heading text-2xl font-semibold md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-[1.05rem]/8 text-gray-700 md:text-[1.1rem]/8">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {actions.length > 0 && (
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                {actions.map((action) =>
                  action.external ? (
                    <a
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center gap-2 rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
                    >
                      <DownloadIcon />
                      {action.label}
                    </a>
                  ) : (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
                    >
                      {action.label}
                    </Link>
                  ),
                )}
              </div>
            )}

            {cta && (
              <div className="mt-12 flex justify-center">
                <Link
                  href={cta.href}
                  className="border-faect-blue text-faect-blue font-ui nav-item-sweep inline-flex items-center justify-center rounded-[10px] border bg-white px-8 py-2 text-[1.05rem] font-medium transition-all duration-300 ease-out hover:ml-2 hover:scale-105 hover:border-white hover:text-white"
                >
                  {cta.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
