"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";

type FooterLink = { name: string; href: string };
type FooterGroup = {
  title: string;
  checkmarks?: boolean;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "Main navigatie",
    links: [
      { name: "Home", href: "/" },
      { name: "Oplossingen", href: "/oplossingen" },
      { name: "Apps", href: "/apps" },
      { name: "Klanten & Cases", href: "/klanten-cases" },
      { name: "Team", href: "/team" },
      { name: "Partners", href: "/partners" },
      { name: "Nieuws", href: "/nieuws" },
    ],
  },
  {
    title: "Vacatures",
    links: [
      { name: "Algemene Voorwaarden", href: "/voorwaarden" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Help & Ondersteuning", href: "/support" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Over Business Central:",
    checkmarks: true,
    links: [
      { name: "Mogelijkheden van Business Central", href: "#" },
      { name: "Upgraden naar Business Central", href: "#" },
      { name: "Overstappen naar Business Central", href: "#" },
      { name: "Aflopende support Navision versies 2016-2018", href: "#" },
      { name: "Verschil tussen Navision en Microsoft Dynamics 365", href: "#" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative bg-[url(/faect_over-Business-Central_footer.jpg)] bg-cover bg-bottom pt-0 pb-6 font-sans text-white">
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-[#020b1a]/10" />

      {/* Wave separator — white arc that visually curves the top of the footer */}
      {/* <div className="absolute inset-x-0 top-0 z-10">
        <svg
          viewBox="0 0 1440 88"
          preserveAspectRatio="none"
          className="block h-[88px] w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0,0 L1440,0 C1080,88 360,88 0,0 Z" fill="white" />
        </svg>
      </div> */}

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="my-12 grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:gap-1.5 xl:grid-cols-[1.5fr_2fr_2fr_3.5fr] xl:text-left">
          {/* Contact column */}
          <div className="space-y-5">
            <div className="space-y-3">
              <a
                href="https://www.google.com/maps/place/Faect/@52.3082036,5.1399348,17z/data=!3m1!4b1!4m6!3m5!1s0x47c615bad6dde5a1:0xbdcccbf69c1db2bb!8m2!3d52.3082036!4d5.1399348!16s%2Fg%2F1ptzc_8t0?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-center gap-0.5 text-white/80 transition-colors xl:justify-start"
              >
                <svg
                  className="fill-faect-blue mt-1.5 size-6 shrink-0 transition-colors group-hover:fill-white"
                  viewBox="0 0 30 30"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="group-hover:text-faect-blue leading-snug transition-colors">
                  Gooimeer 12
                  <br />
                  1411 DE Naarden
                </span>
              </a>

              <a
                href="tel:+31887077000"
                className="group flex items-start justify-center gap-0.5 text-white/80 transition-colors xl:justify-start"
              >
                <svg
                  className="fill-faect-blue size-6 shrink-0 pt-1 transition-colors group-hover:fill-white"
                  viewBox="0 0 30 30"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="group-hover:text-faect-blue transition-colors">
                  +31 (0) 88 707 7000
                </span>
              </a>

              <a
                href="mailto:info@faect.nl"
                className="group flex items-start justify-center gap-0.5 text-white/80 transition-colors xl:justify-start"
              >
                <svg
                  className="fill-faect-blue size-6 shrink-0 pt-1 transition-colors group-hover:fill-white"
                  viewBox="0 0 30 30"
                  aria-hidden="true"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="group-hover:text-faect-blue transition-colors">
                  info@faect.nl
                </span>
              </a>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/faect/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-faect-blue inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
              aria-label="Faect op LinkedIn"
            >
              <svg
                className="h-5 w-5 fill-white"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Link groups */}
          {footerGroups.map((group, i) => (
            <div key={i} className="space-y-4 px-6 xl:pl-12">
              {group.title && (
                <h3 className="border-faect-blue border-b-2 pb-1 font-bold tracking-wide text-white/90">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li
                    key={link.name}
                    className="flex items-start justify-center gap-1.5 space-y-2 xl:justify-start"
                  >
                    {group.checkmarks && (
                      <Check
                        className="text-faect-blue mt-0.5 size-5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={link.href}
                      className={
                        pathname === link.href
                          ? "text-faect-blue before:text-faect-blue transition-colors before:content-['.../'] hover:text-white"
                          : "hover:text-faect-blue tracking-wide text-white/80 transition-colors"
                      }
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-xs tracking-widest text-white/70 uppercase">
            COPYRIGHT {new Date().getFullYear()} © ALL RIGHTS RESERVED. DESIGN
            VOOR FAECT
          </p>
        </div>
      </div>
    </footer>
  );
}
