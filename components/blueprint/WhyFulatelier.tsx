import { Reveal } from "@/components/blueprint/Reveal";
import { SectionHeading } from "@/components/blueprint/SectionHeading";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const REASONS = [
  {
    title: "Craftsmanship",
    body: "Every site is designed with intention — considered typography, spacing, and detail, not assembled from a template.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M14.5 3.5l6 6-9 9-6.5 1.5L6.5 13l8-9.5z" />
        <path d="M13 5l6 6" />
      </svg>
    ),
  },
  {
    title: "Fast Turnaround",
    body: "Most Blueprint concepts are ready to review within days, not weeks — because momentum matters to your business.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: "Mississippi Based",
    body: "A local studio that understands Mississippi businesses — and is genuinely reachable when you need us to be.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Proof Before Payment",
    body: "You see exactly what you're getting before a single dollar changes hands. That's the entire model.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
] as const;

export function WhyFulatelier() {
  return (
    <section
      className="relative w-full bg-[#0A0A0B] py-24 md:py-32"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="Why Fulatelier"
          id="why-heading"
          title="The Studio Behind the Blueprint."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={0.06 * index}>
              <div className="h-full rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-7 text-center backdrop-blur-md transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent-light/30">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-[9999px] border border-accent-light/25 bg-accent/[0.08] text-accent-light">
                  {reason.icon}
                </div>
                <h3 className="font-cormorant text-[20px] font-semibold leading-tight tracking-[-0.01em] text-text">
                  {reason.title}
                </h3>
                <p className="mt-3 font-inter text-[13.5px] leading-[1.7] text-subtle">
                  {reason.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
