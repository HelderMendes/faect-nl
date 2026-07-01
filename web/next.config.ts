import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/algemene-voorwaarden",
        destination: "/voorwaarden",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/support",
        destination: "/help-en-ondersteuning",
        permanent: true,
      },
      {
        source: "/help-ondersteuning",
        destination: "/help-en-ondersteuning",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
