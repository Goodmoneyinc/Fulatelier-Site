export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={[
        "mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-light/80",
        className,
      ].join(" ")}
    >
      {children}
    </p>
  );
}
