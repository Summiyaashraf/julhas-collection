import { formatPrice } from "@/lib/catalog/format";
import {
  getFreeShippingProgress,
  getFreeShippingRemaining,
} from "@/lib/cart/selectors";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export interface FreeShippingProgressProps {
  subtotal: number;
  className?: string;
}

export function FreeShippingProgress({
  subtotal,
  className,
}: FreeShippingProgressProps) {
  const progress = getFreeShippingProgress(subtotal);
  const remaining = getFreeShippingRemaining(subtotal);
  const unlocked = remaining === 0;

  return (
    <div className={cn("space-y-2", className)}>
      <p
        aria-live="polite"
        className="text-xs leading-relaxed text-stone-600"
      >
        {unlocked
          ? "You've unlocked free delivery."
          : `You're ${formatPrice(remaining)} away from free delivery.`}
      </p>
      <div
        role="progressbar"
        aria-label="Free shipping progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="h-1 w-full overflow-hidden bg-stone-300"
      >
        <div
          className="h-full bg-gold transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] uppercase tracking-[0.14em] text-stone-500">
        Free delivery over {formatPrice(siteConfig.freeShippingThreshold)}
      </p>
    </div>
  );
}
