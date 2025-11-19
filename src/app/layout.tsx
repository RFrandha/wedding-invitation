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
        url: "https://photos.rever.cyou/pub-img/cover2.jpg",
        secureUrl: "https://photos.rever.cyou/pub-img/cover2.jpg",
        width: 1200,
        height: 630,
        alt: "The Wedding of Verina & Restow",
      },
    ],
    type: "website",
    url: "https://rever.cyou"
  },
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