import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const VARIANT_CLASSES = {
  plain: "text-ink hover:text-gold",
  outline:
    "border border-stone-300 text-ink hover:border-gold hover:text-gold",
} as const;

const SIZE_CLASSES = {
  sm: "h-11 w-11",
  md: "h-12 w-12",
} as const;

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
}

export function IconButton({
  label,
  variant = "plain",
  size = "sm",
  type = "button",
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-control transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
