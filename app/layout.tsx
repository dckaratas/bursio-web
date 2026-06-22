import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://bursio.com.tr"),
  title: {
    default: "BursIO — Burs Bul, Hayallerine Ulaş",
    template: "%s | BursIO",
  },
  description: "Devlet üniversitesi öğrencilerini burs vermek isteyen bireylerle buluşturan ücretsiz Türkiye platformu. Güvenli, şeffaf ve hızlı.",
  keywords: ["burs", "burs platformu", "üniversite bursu", "öğrenci bursu", "burs bul", "burs ver", "Türkiye burs"],
  authors: [{ name: "BursIO" }],
  creator: "BursIO",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://bursio.com.tr",
    siteName: "BursIO",
    title: "BursIO — Burs Bul, Hayallerine Ulaş",
    description: "Devlet üniversitesi öğrencilerini burs vermek isteyen bireylerle buluşturan ücretsiz Türkiye platformu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BursIO — Burs Bul, Hayallerine Ulaş",
    description: "Devlet üniversitesi öğrencilerini burs vermek isteyen bireylerle buluşturan ücretsiz Türkiye platformu.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bursio.com.tr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}