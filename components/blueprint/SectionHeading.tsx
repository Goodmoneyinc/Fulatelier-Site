import type { ReactNode } from "react";
import { Eyebrow } from "@/components/blueprint/Eyebrow";
import { Reveal } from "@/components/blueprint/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  id,
  description,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={[
        "mx-auto max-w-[720px]",
        align === "center" ? "text-center" : "text-left",
        className,
      ].join(" ")}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow className={align === "center" ? "mx-auto" : ""}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h2
          id={id}
          className="font-cormorant text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] text-text md:text-[56px]"
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-[560px] font-inter text-[17px] leading-[1.75] text-subtle">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
