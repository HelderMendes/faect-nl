import Link from "next/link";
import Image from "next/image";

const footerGroups = [
  {
    title: "Over Business Central:",
    links: [
      { name: "Wat is Business Central?", href: "#" },
      { name: "Dynamics 365 Cloud", href: "#" },
      { name: "Microsoft Ecosystem", href: "#" },
      { name: "Innovatie & AI", href: "#" },
    ],
  },
  {
    title: "Platform:",
    links: [
      { name: "Home", href: "/" },
      { name: "Oplossingen", href: "/oplossingen" },
      { name: "Faect Apps", href: "/faect-apps" },
      { name: "Klanten & Cases", href: "/klanten-cases" },
      { name: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Vacatures:",
    links: [
      { name: "Werken bij Faect", href: "/vacatures" },
      { name: "Algemene Voorwaarden", href: "/voorwaarden" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Help & Ondersteuning", href: "/support" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050A14] pt-20 pb-10 font-sans text-white">
      {/* Background Graphic Style */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <Image
          src="/bkg_footer_test-scaled.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-lg font-bold">Faect</p>
              <p className="leading-relaxed text-white/80">
                Edisonbaan 14-G
                <br />
                3439 MN Nieuwegein
              </p>
              <p className="text-white/80">
                <a
                  href="tel:+310302220140"
                  className="hover:text-faect-blue transition-colors"
                >
                  030 – 222 0 140
                </a>
              </p>
              <p className="text-white/80">
                <a
                  href="mailto:info@faect.nl"
                  className="hover:text-faect-blue transition-colors"
                >
                  info@faect.nl
                </a>
              </p>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/faect/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-faect-blue inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-6">
              <h3 className="font-heading text-lg font-bold text-white">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-faect-blue text-lg transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center border-t border-white/10 pt-10">
          <p className="text-center text-xs tracking-widest text-white/40 uppercase">
            COPYRIGHT {new Date().getFullYear()} © ALL RIGHTS RESERVED. DESIGN
            VOOR FAECT
          </p>
        </div>
      </div>
    </footer>
  );
}
