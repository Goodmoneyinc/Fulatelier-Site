import Image from "next/image";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Image
      src="/logo-fulatelier.png"
      alt="Fulatelier"
      width={256}
      height={256}
      className={className}
      priority
    />
  );
}
