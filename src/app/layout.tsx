import type { Metadata } from "next";
import {
  Brawler,
  Faculty_Glyphic,
  Faustina,
  Instrument_Serif,
  Lato,
  Playfair,
  Plus_Jakarta_Sans,
  Vidaloka
} from "next/font/google";
import "./globals.css";

const generalFont = Brawler({
  variable: '--font-lato-sans',
  subsets: ['latin'],
  weight: "400"
});

export const metadata: Metadata = {
  title: "The Wedding of Restow & Verina",
  description: "Kamis, 26 Maret 2026",
  openGraph: {
    title: "The Wedding of Restow & Verina",
    description: "Kamis, 26 Maret 2026",
    images: [
      {
        url: "https://photos.rever.cyou/pub-img/opengraph_maroon2.png",
        width: 1200,
        height: 630,
        alt: "The Wedding of Restow & Verina",
      },
      {
        url: "https://photos.rever.cyou/pub-img/opengraph_maroon2_square.png",
        width: 400,
        height: 400,
        alt: "The Wedding of Restow & Verina",
      }
    ],
    type: "website",
    url: "https://rever.cyou",
    siteName: "The Wedding of Restow & Verina",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Restow & Verina",
    description: "Kamis, 26 Maret 2026",
    images: ["https://photos.rever.cyou/pub-img/opengraph_maroon2.png"],
  },
  metadataBase: new URL("https://rever.cyou"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${generalFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}