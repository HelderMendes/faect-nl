import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SectionSettings {
  backgroundColor?: "white" | "gray" | "dither" | "navy" | "none";
  paddingTop?: "default" | "compact" | "none";
  paddingBottom?: "default" | "compact" | "none";
  verticalSpacing?: "default" | "compact";
}

export function getSectionStyles(
  settings?: SectionSettings,
  options: { noOverlay?: boolean } = {},
) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    dither: "section-dither",
    navy: "bg-faect-navy text-white",
    none: "bg-transparent",
  };

  const paddingTopClasses = {
    default: "pt-20 lg:pt-24",
    compact: "pt-10 lg:pt-12",
    none: "pt-0",
  };

  const paddingBottomClasses = {
    default: "pb-16 lg:pb-20",
    compact: "pb-8 lg:pb-10",
    none: "pb-0",
  };

  return cn(
    bgClasses[settings?.backgroundColor || "white"],
    paddingTopClasses[settings?.paddingTop || "default"],
    paddingBottomClasses[settings?.paddingBottom || "default"],
    !options.noOverlay && "block-background-overlay",
  );
}
