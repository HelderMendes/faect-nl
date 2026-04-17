"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLinkClass = (href: string, baseClass: string) =>
    cn(
      baseClass,
      pathname === href
        ? "text-white border-[1.5px] border-faect-blue/0 bg-faect-blue/25 hover:text-white  hover:border-white rounded-[8px]"
        : "text-white ",
    );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-500",
        isHome && !scrolled
          ? "border-white/5 bg-black/20 pt-4"
          : "border-white/60 bg-[#050A14]/80 py-1",
      )}
    >
      {/* Nav bar */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8 xl:grid-cols-[5%_90%_5%]">
        {/* Logo — always col 1 (left) */}
        <Link href="/" className="flex items-center">
          <div className="relative h-14 w-36 pt-4 transition-transform duration-300 hover:scale-105 md:w-44">
            <Image
              src="/Logo_Faect_fc.png"
              alt="FAECT"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Nav — col 2, xl only */}
        <nav className="-ml-24 hidden items-center justify-center gap-4 xl:col-start-2 xl:flex">
          {navigation.map((item) => {
            // const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={getLinkClass(
                  item.href,
                  "nav-item-sweep font-ui px-4 py-1 text-[16.5px]/5 font-medium whitespace-nowrap",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="nav-contact-sweep font-ui ease hover:text-faect-blue hidden items-center justify-center rounded-[8px] border-[0.5px] border-white px-10 py-1.5 text-[19.2px]/4.5 font-semibold whitespace-nowrap text-white transition-all duration-400 md:col-start-3 md:flex md:justify-self-end"
        >
          Contact
        </Link>

        {/* Burger / X — col 2 center on md, right on mobile, hidden on xl */}
        <button
          className="hover:border-faect-blue hover:text-faect-blue rounded-lg border-2 border-white p-2 text-white transition-all active:scale-95 md:col-start-2 md:-mt-13 md:justify-self-center xl:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="size-8" />
          ) : (
            <Menu className="size-8" />
          )}
        </button>
      </div>

      {/* Dropdown menu — slides down below the nav bar */}
      <div
        className={cn(
          "bg-faect-blue overflow-hidden transition-[max-height] duration-300 ease-in-out xl:hidden",
          mobileMenuOpen ? "max-h-auto" : "max-h-0",
        )}
      >
        <nav className="container flex w-full flex-col items-center">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "font-ui block min-w-full border-b border-white/30 py-5 text-center text-xl font-medium transition-colors hover:bg-black/90",
                  isActive ? "text-faect-blue bg-black/80" : "text-white",
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "font-ui block min-w-full py-4 text-center text-lg font-medium transition-colors hover:bg-black/90 md:hidden",
              pathname === "/contact"
                ? "text-faect-blue bg-black/80"
                : "text-white",
            )}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
