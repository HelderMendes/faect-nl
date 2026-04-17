import type { Metadata } from "next";
import { Cairo, Varela_Round, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Faect – Microsoft business software",
  description: "Standaard or op maat Microsoft oplossingen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.variable} ${varelaRound.variable} ${workSans.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
