import { cn } from "@/lib/utils/cn";

export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "gold",
  "ghost",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ["sm", "md", "lg"] as const;

export type ButtonSize = (typeof BUTTON_SIZES)[number];

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-control font-medium uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:pointer-events-none disabled:cursor-not-allowed";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-stone-50 hover:bg-ink-soft active:bg-ink disabled:bg-stone-400 disabled:text-stone-100",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-ink hover:text-stone-50 active:bg-ink-soft disabled:border-stone-400 disabled:text-stone-400 disabled:hover:bg-transparent disabled:hover:text-stone-400",
  gold: "bg-gold text-ink hover:bg-gold-soft active:bg-gold disabled:bg-stone-400 disabled:text-stone-100",
  ghost:
    "bg-transparent text-ink underline-offset-4 hover:text-gold hover:underline disabled:text-stone-400 disabled:hover:no-underline",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-[11px]",
  md: "min-h-12 px-6 text-xs",
  lg: "min-h-14 px-8 text-xs",
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className,
  );
}
