import type { ReactNode } from "react";

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[24px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl",
        "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
