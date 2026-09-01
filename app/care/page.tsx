import type { Metadata } from "next";
import { Care } from "@/components/sections/Care";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Fulatelier Care — Website Support",
  description:
    "Your digital business should not be left unattended after launch. Fulatelier Care keeps your website and digital systems supported, secure, and growing.",
};

export default function CarePage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Care />
      </main>
      <Footer />
    </>
  );
}
