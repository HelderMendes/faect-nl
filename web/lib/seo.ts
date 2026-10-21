import type { Metadata } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://faect.nl"
).replace(/\/$/, "");

function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizedPath === "/") return SITE_URL;
  return `${SITE_URL}${normalizedPath}`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonical = toAbsoluteUrl(path);
  const resolvedImage = image ? (image.startsWith("http") ? image : toAbsoluteUrl(image)) : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Faect",
      locale: "nl_NL",
      type: "website",
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
  };
}
