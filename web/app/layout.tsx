import type { Metadata } from "next";
import { Cairo, Varela_Round, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import Script from "next/script";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  weight: "400",
  variable: "--font-varela",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://faect.nl";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-9JMLCPS0LN";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Faect | Microsoft Dynamics 365 Business Central specialist",
  description:
    "Faect helpt organisaties met Microsoft Dynamics 365 Business Central: implementatie, optimalisatie, support en apps op maat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${cairo.variable} ${varelaRound.variable} ${workSans.variable} flex min-h-screen flex-col antialiased`}
      >
        {GA_ID && (
          <>
            {/* Google Consent Mode v2 default configuration */}
            <Script id="google-consent" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });
              `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
