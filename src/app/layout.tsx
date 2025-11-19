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
  title: "Wedding Verina & Restow",
  description: "The Wedding of Verina & Restow",
  openGraph: {
    title: "Wedding Verina & Restow",
    description: "The Wedding of Verina & Restow",
    images: [
      {
        url: "https://photos.rever.cyou/prewed-album/ZEN08434-Edit.jpg",
        width: 1200,
        height: 630,
        alt: "The Wedding Verina & Restow",
      },
    ],
    type: "website",
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