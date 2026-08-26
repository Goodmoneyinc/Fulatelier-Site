import type { Metadata } from "next";
import { ApplicationForm } from "@/components/blueprint/ApplicationForm";
import { BlueprintFooter } from "@/components/blueprint/BlueprintFooter";
import { BlueprintHeader } from "@/components/blueprint/BlueprintHeader";
import { BlueprintTimeline } from "@/components/blueprint/BlueprintTimeline";
import { FAQ } from "@/components/blueprint/FAQ";
import { FinalCTA } from "@/components/blueprint/FinalCTA";
import { Hero } from "@/components/blueprint/Hero";
import { Included } from "@/components/blueprint/Included";
import { LimitedAvailability } from "@/components/blueprint/LimitedAvailability";
import { Portfolio } from "@/components/blueprint/Portfolio";
import { Problem } from "@/components/blueprint/Problem";
import { WhyFulatelier } from "@/components/blueprint/WhyFulatelier";
import { WorkShowcase } from "@/components/blueprint/WorkShowcase";

const title = "The Digital Storefront Blueprint™ | Fulatelier LLC";
const description =
  "We'll design your homepage before you pay anything. Love it, and we build the rest. If not, you owe nothing — the Fulatelier Zero-Risk Guarantee™. Only five Mississippi businesses accepted each month.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://fulatelier-site.vercel.app/blueprint",
  },
  openGraph: {
    title,
    description,
    url: "https://fulatelier-site.vercel.app/blueprint",
    siteName: "Fulatelier LLC",
    images: [
      {
        url: "https://fulatelier-site.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Fulatelier Digital Storefront Blueprint",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://fulatelier-site.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is it free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because a decision this size deserves proof, not a pitch. We'd rather show you exactly what we'd build for your business than ask you to imagine it from a proposal.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We personally review your application. If your business is a fit for one of this month's five spots, we schedule a short call to understand your goals before any design work begins.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to buy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. If the homepage design isn't right for your business, you walk away — no invoice, no pressure, and no hard feelings. That's the Fulatelier Zero-Risk Guarantee.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most homepage concepts are ready to review within about a week of your discovery call. From there, a full build typically takes an additional 1–3 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What businesses qualify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work best with established Mississippi businesses — restaurants, retail, professional services, and similar — that are ready to invest in how they're perceived online.",
      },
    },
  ],
} as const;

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Digital Storefront Blueprint — Custom Homepage Design",
  provider: {
    "@type": "LocalBusiness",
    name: "Fulatelier LLC",
    areaServed: "Mississippi",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jackson",
      addressRegion: "MS",
      addressCountry: "US",
    },
  },
  description,
} as const;

export default function BlueprintPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BlueprintHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-background outline-none">
        <Hero />
        <Problem />
        <WorkShowcase />
        <BlueprintTimeline />
        <Included />
        <Portfolio />
        <WhyFulatelier />
        <LimitedAvailability />
        <ApplicationForm />
        <FAQ />
        <FinalCTA />
      </main>
      <BlueprintFooter />
    </>
  );
}
