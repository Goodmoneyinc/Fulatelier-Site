import Image from "next/image";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Image
      src="/logo-fulatelier-v2.png"
      alt="Fulatelier"
      width={256}
      height={256}
      className={className}
      priority
      unoptimized
    />
  );
}
