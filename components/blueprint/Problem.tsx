import { Eyebrow } from "@/components/blueprint/Eyebrow";
import { Reveal } from "@/components/blueprint/Reveal";

const PROBLEMS = [
  {
    title: "Outdated Design",
    body: "A site built years ago quietly tells today's customer you might not still be in business.",
  },
  {
    title: "Facebook-Only Presence",
    body: "Social platforms are rented land. A real website is the only address your business actually owns.",
  },
  {
    title: "Poor Mobile Experience",
    body: "Most visitors arrive on a phone. If the site isn't built for them, they won't wait around to find out.",
  },
  {
    title: "No Credibility",
    body: "Without a professional storefront online, even great businesses read as unproven — or unfinished.",
  },
  {
    title: "Confusing Navigation",
    body: "If a customer can't find what they need in seconds, they quietly assume you can't help them either.",
  },
] as const;

export function Problem() {
  return (
    <section
      className="relative w-full border-t border-accent/30 bg-background py-24 md:py-32"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-6 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>FUL://PROBLEM</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="problem-heading"
              className="font-cormorant text-[34px] font-semibold leading-[1.12] tracking-[-0.02em] text-text sm:text-[44px]"
            >
              Your Website Is Quietly Losing You Customers.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[46ch] font-inter text-[17px] leading-[1.8] text-subtle">
              A customer forms an opinion about your business in about three
              seconds — long before they ever call. If what they see looks
              dated, loads slowly, or doesn&apos;t work on their phone, they
              don&apos;t leave a message. They simply leave, quietly, for a
              competitor whose website looks like it belongs to a business
              worth trusting.
            </p>
          </Reveal>
        </div>

        <ol className="flex flex-col">
          {PROBLEMS.map((problem, index) => (
            <Reveal key={problem.title} as="li" delay={0.05 * index}>
              <div
                className={[
                  "flex gap-6 py-7",
                  index < PROBLEMS.length - 1 ? "border-b border-accent/25" : "",
                ].join(" ")}
              >
                <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-accent/65">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-cormorant text-[20px] font-semibold text-text">
                    {problem.title}
                  </h3>
                  <p className="mt-2 font-inter text-[14px] leading-[1.7] text-subtle">
                    {problem.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
