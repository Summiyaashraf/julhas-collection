import Image from "next/image";

import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

const LOGO_INTRINSIC_WIDTH = 360;
const LOGO_INTRINSIC_HEIGHT = 88;

const SIZE_CLASSES = {
  sm: "h-7",
  md: "h-8",
} as const;

export interface LogoProps {
  variant?: "dark" | "light";
  size?: keyof typeof SIZE_CLASSES;
  priority?: boolean;
  className?: string;
}

export function Logo({
  variant = "dark",
  size = "md",
  priority = false,
  className,
}: LogoProps) {
  const sizeClass = SIZE_CLASSES[size];

  return (
    <Image
      src={variant === "light" ? siteConfig.logoLight : siteConfig.logo}
      alt={siteConfig.name}
      width={LOGO_INTRINSIC_WIDTH}
      height={LOGO_INTRINSIC_HEIGHT}
      priority={priority}
      className={cn(sizeClass, "w-auto", className)}
    />
  );
}
