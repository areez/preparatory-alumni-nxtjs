import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: '#d11d1d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://preparatoryalumni.org'),
  title: {
    default: "Preparatory Alumni Association | Legacy & Future",
    template: "%s | Preparatory Alumni Association"
  },
  description: "Official community for Mohammadpur Preparatory School & College alumni. Connect, network, and grow with the Preparatory Alumni Association (PAA). Established 2013.",
  keywords: ["Preparatory Alumni Association", "PAA", "Mohammadpur Preparatory School alumni", "Alumni Association Dhaka", "School alumni Bangladesh", "Preparatory Network", "Education legacy Dhaka"],
  authors: [{ name: "Preparatory Alumni Association" }],
  creator: "Preparatory Alumni Association",
  publisher: "Preparatory Alumni Association",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Preparatory Alumni Association | Legacy & Future",
    description: "Join the official global community of Mohammadpur Preparatory School & College alumni. Forging a legacy of excellence and unity since 2013.",
    url: 'https://preparatoryalumni.org',
    siteName: 'Preparatory Alumni Association',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/og-image.jpg', // We should ensure this image exists or use a placeholder
        width: 1200,
        height: 630,
        alt: 'Preparatory Alumni Association Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Preparatory Alumni Association | Legacy & Future",
    description: "Connect with fellow alumni from Mohammadpur Preparatory School & College. Join PAA today.",
    images: ['/assets/og-image.jpg'], // Same here
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://preparatoryalumni.org',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={clsx(inter.variable, playfair.variable, "font-sans antialiased bg-white text-slate-900 selection:bg-primary selection:text-white")}>
        {children}
      </body>
    </html>
  );
}
