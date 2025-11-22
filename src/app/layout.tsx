import type { Metadata } from "next";
import {Geist_Mono, Montserrat} from "next/font/google";
import "./globals.css";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "The Wedding of Verina & Restow",
  description: "Sabtu, 6 Desember 2025",
  openGraph: {
    title: "The Wedding of Verina & Restow",
    description: "Sabtu, 6 Desember 2025",
    images: [
      {
        url: "https://photos.rever.cyou/pub-img/opengraph_cover.png",
        width: 1200,
        height: 630,
        alt: "The Wedding of Verina & Restow",
      },
      {
        url: "https://photos.rever.cyou/pub-img/opengraph_cover.png",
        width: 400,
        height: 400,
        alt: "The Wedding of Verina & Restow",
      },
    ],
    type: "website",
    url: "https://rever.cyou",
    siteName: "The Wedding of Verina & Restow",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Verina & Restow",
    description: "Sabtu, 6 Desember 2025",
    images: ["https://photos.rever.cyou/pub-img/opengraph_cover.png"],
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
      className={`${montserrat.variable} ${geistMono.variable} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}