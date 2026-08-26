import type { Metadata } from "next";
import { WebsiteScoreCard } from "@/components/ui/WebsiteScoreCard";

const title = "Website Score Card | Fulatelier LLC";
const description =
  "10 questions. Two minutes. Find out exactly what your website is costing you — instant scoring, a full breakdown, and a personalized action plan.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "https://fulatelier-site.vercel.app/scorecard",
  },
  openGraph: {
    title,
    description,
    url: "https://fulatelier-site.vercel.app/scorecard",
    siteName: "Fulatelier LLC",
    images: [
      {
        url: "https://fulatelier-site.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Fulatelier Website Score Card",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function ScoreCardPage() {
  return <WebsiteScoreCard />;
}
