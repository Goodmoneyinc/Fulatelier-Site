import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/blueprint/Eyebrow";
import { Reveal } from "@/components/blueprint/Reveal";

export function LimitedAvailability() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-accent/30 bg-background py-24 md:py-32"
      aria-labelledby="availability-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="select-none font-cormorant text-[42vw] font-bold leading-none text-accent/[0.04]">
          05
        </span>
      </div>

      <div className="relative mx-auto max-w-[720px] px-6 text-center sm:px-8">
        <Reveal>
          <Eyebrow className="mx-auto">FUL://AVAILABILITY</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="availability-heading"
            className="font-cormorant text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-[52px]"
          >
            We Accept Five Blueprint Projects Each Month.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-[54ch] font-inter text-[17px] leading-[1.8] text-subtle">
            Every Blueprint homepage is designed by hand — not templated, not
            outsourced, not rushed. To protect that standard, we work with a
            small number of Mississippi businesses at a time. Once this
            month&apos;s five are spoken for, new applications move to the
            next cycle.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10">
            <Button href="#apply">
              Apply for Your Digital Storefront Blueprint
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
