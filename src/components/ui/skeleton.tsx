import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export const SKELETON_VARIANTS = ["text", "rect", "circle"] as const;

export type SkeletonVariant = (typeof SKELETON_VARIANTS)[number];

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: "h-4 rounded-none",
  rect: "rounded-card",
  circle: "rounded-full",
};

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

export function Skeleton({
  variant = "rect",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-stone-200",
        VARIANT_CLASSES[variant],
        className,
      )}
    />
  );
}
