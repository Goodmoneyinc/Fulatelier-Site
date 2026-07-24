import type { ReactNode } from "react";
import { Reveal } from "@/components/blueprint/Reveal";
import { SectionHeading } from "@/components/blueprint/SectionHeading";

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex h-11 w-11 items-center justify-center border border-accent/30 bg-accent/[0.08] text-accent">
      {children}
    </div>
  );
}

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ITEMS = [
  {
    title: "Custom Homepage Concept",
    body: "A real, designed homepage built specifically for your business — not a generic layout with your logo dropped in.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Website Audit",
    body: "A clear-eyed look at what your current site — or lack of one — is quietly costing you in trust and customers.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20l-4.8-4.8" />
      </svg>
    ),
  },
  {
    title: "Growth Recommendations",
    body: "Specific, practical suggestions for turning more of your visitors into paying customers.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 18l5-5 4 4 7-9" />
        <path d="M14 8h6v6" />
      </svg>
    ),
  },
  {
    title: "30-Minute Strategy Session",
    body: "A focused call to walk through the design, the audit, and what a full build would look like for your business.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: "Zero-Risk Guarantee",
    body: "If you don't love what we design, you walk away. No invoice, no obligation, no hard feelings.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
] as const;

export function Included() {
  return (
    <section
      className="relative w-full border-t border-accent/30 bg-background py-24 md:py-32"
      aria-labelledby="included-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="FUL://INCLUDED"
          id="included-heading"
          title="Everything You Need to Decide — Before You Spend Anything."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={0.06 * index}>
              <div className="group h-full border border-accent/30 bg-card p-8 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent-light">
                <IconWrap>{item.icon}</IconWrap>
                <h3 className="font-cormorant text-[21px] font-semibold leading-tight tracking-[-0.01em] text-text">
                  {item.title}
                </h3>
                <p className="mt-3 font-inter text-[14px] leading-[1.7] text-subtle">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
