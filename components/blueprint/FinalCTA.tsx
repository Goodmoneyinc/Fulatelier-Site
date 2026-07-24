import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/blueprint/Reveal";

export function FinalCTA() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-accent/30 bg-background py-28 md:py-36"
      aria-labelledby="final-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(163,126,44,0.14),transparent_65%)] blur-[10px]" />
      </div>
      <BlueprintGrid className="opacity-50" />

      <div className="relative mx-auto max-w-[780px] px-6 text-center sm:px-8">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="font-cormorant text-[38px] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-[56px] md:text-[68px]"
          >
            Let&apos;s Build the Digital Storefront Your Business Deserves.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[48ch] font-inter text-lg leading-relaxed text-subtle">
            Apply today, and see your homepage before you spend a dollar.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-11">
            <Button href="#apply">Apply Now</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
