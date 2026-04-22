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

type HeaderVariant = "dark" | "light";

type NavInnerProps = {
  variant: HeaderVariant;
  pathname: string;
  mobileMenuOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

function NavInner({
  variant,
  pathname,
  mobileMenuOpen,
  onToggle,
  onClose,
}: NavInnerProps) {
  const isDark = variant === "dark";

  const getLinkClass = (href: string) =>
    cn(
      "nav-item-sweep font-ui px-4 py-1 text-[16.5px]/5 font-medium whitespace-nowrap transition-colors duration-200",
      isDark
        ? "text-white from-blue-950 via-slate-900 to-gray-900"
        : "text-slate-800 hover:text-faect-blue hover:text-white",
      pathname === href &&
        (isDark
          ? "border-[1.5px] border-white/0 bg-slate-900 rounded-[8px] text-white"
          : "hover:text-white border-[1.5px] border-faect-blue/30 bg-faect-blue/10 text-faect-blue rounded-[8px] "),
    );

  return (
    <>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8 xl:grid-cols-[5%_90%_5%]">
        {/* Logo */}
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

        {/* Desktop nav */}
        <nav className="-ml-24 hidden items-center justify-center gap-4 pt-7 xl:col-start-2 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={getLinkClass(item.href)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Contact button */}
        <Link
          href="/contact"
          className={cn(
            "font-ui ease hidden items-center justify-center rounded-[8px] border-[0.5px] px-10 py-1.5 text-[19.2px]/4.5 font-semibold whitespace-nowrap transition-all duration-400 md:col-start-3 md:mt-6 md:flex md:justify-self-end",
            isDark
              ? "nav-contact-sweep hover:text-faect-blue border-white text-white"
              : "nav-item-sweep border-faect-blue text-faect-blue hover:bg-faect-blue hover:text-white",
          )}
        >
          Contact
        </Link>

        {/* Mobile burger */}
        <button
          className={cn(
            "hover:border-faect-blue hover:text-faect-blue rounded-lg border-2 p-2 transition-all active:scale-95 md:col-start-2 md:-mt-13 md:justify-self-center xl:hidden",
            isDark
              ? "border-white text-white"
              : "border-slate-600 text-slate-700",
          )}
          onClick={onToggle}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Sluit menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="size-8" />
          ) : (
            <Menu className="size-8" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "bg-faect-blue overflow-hidden transition-[max-height] duration-300 ease-in-out xl:hidden",
          mobileMenuOpen ? "max-h-screen" : "max-h-0",
        )}
      >
        <nav className="container flex w-full flex-col items-center">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "font-ui block min-w-full border-b border-white/30 py-5 text-center text-xl font-medium transition-colors hover:bg-black/90",
                pathname === item.href
                  ? "text-faect-blue bg-black/80"
                  : "text-white",
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={onClose}
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
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stickyVisible = scrollY > 600;

  return (
    <>
      {/* Primary header — in layout flow, scrolls with page */}
      {/* <header className="to-b w-full border-b border-white/10 bg-linear-to-bl from-gray-950 via-blue-950 to-slate-950"> */}
      <header className="w-full bg-linear-to-tl from-[#000921] via-[#060a11] to-[#060d22] opacity-98 bg-blend-multiply shadow-sm backdrop-blur-sm">
        <NavInner
          variant="dark"
          pathname={pathname}
          mobileMenuOpen={!stickyVisible && mobileMenuOpen}
          onToggle={() => setMobileMenuOpen((p) => !p)}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>

      {/* Sticky header — fixed, slides in from top after 600px scroll */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-md",
          "bg-blend-multiply transition-transform duration-500 ease-in-out",
          stickyVisible ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <NavInner
          variant="light"
          pathname={pathname}
          mobileMenuOpen={stickyVisible && mobileMenuOpen}
          onToggle={() => setMobileMenuOpen((p) => !p)}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>
    </>
  );
}
