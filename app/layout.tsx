import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";
import { IntroReveal } from "@/components/intro/IntroReveal";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "600"],
});

const siteTitle = "Fulatelier LLC";
const siteDescription =
  "Boutique web development studio in Jackson, MS — custom websites and SaaS applications, precision crafted.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  keywords: [
    "web development",
    "Jackson MS",
    "Next.js",
    "custom websites",
    "SaaS development",
    "Fulatelier",
  ],
  authors: [{ name: "Fulatelier LLC" }],
  creator: "Fulatelier LLC",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://fulatelier-site.vercel.app",
    siteName: "Fulatelier LLC",
    images: [
      {
        url: "https://fulatelier-site.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fulatelier LLC — Precision Crafted. Purpose Built.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Boutique web development studio — custom websites and SaaS, precision crafted.",
    images: ["https://fulatelier-site.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background font-inter text-text antialiased">
        <IntroReveal />
        <Nav />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 outline-none"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
