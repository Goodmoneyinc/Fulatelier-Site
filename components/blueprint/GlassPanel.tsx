import type { ReactNode } from "react";

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["border border-accent/60 bg-footer", className].join(" ")}>
      {children}
    </div>
  );
}
