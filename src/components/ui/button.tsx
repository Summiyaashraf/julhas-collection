import type { ButtonHTMLAttributes } from "react";

import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button-styles";
import { LoaderIcon } from "@/components/ui/icons";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({
        variant,
        size,
        fullWidth,
        className,
      })}
    >
      {loading ? <LoaderIcon size={16} /> : null}
      {children}
    </button>
  );
}
