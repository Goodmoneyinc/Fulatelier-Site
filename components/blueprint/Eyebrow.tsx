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
        "mb-4 font-mono text-[10px] tracking-[0.2em] text-accent/65",
        className,
      ].join(" ")}
    >
      {children}
    </p>
  );
}
