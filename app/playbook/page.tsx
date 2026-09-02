import type { Metadata } from "next";
import { EbookGate } from "@/components/sections/EbookGate";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

const title = "Free Ebook — From Side Hustle to Digital Business | Fulatelier";
const description =
  "The modern playbook for building, selling, and scaling a business with AI, software, and the internet. 10 chapters. Free.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title: "From Side Hustle to Digital Business — Free Ebook",
    description:
      "10 chapters on building a real digital business with AI and modern software. No paywall.",
    images: [
      {
        url: "https://fulatelier.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function PlaybookPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <EbookGate />
      </main>
      <Footer />
    </>
  );
}
