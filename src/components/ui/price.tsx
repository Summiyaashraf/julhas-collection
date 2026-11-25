import { formatPrice } from "@/lib/catalog/format";
import { cn } from "@/lib/utils/cn";

const SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export interface PriceProps {
  price: number;
  compareAtPrice?: number;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  size = "md",
  className,
}: PriceProps) {
  const onSale =
    compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-baseline gap-2",
        SIZE_CLASSES[size],
        className,
      )}
    >
      <span
        className={cn(
          "font-medium",
          onSale ? "text-sale" : "text-ink",
        )}
      >
        {formatPrice(price)}
      </span>
      {onSale ? (
        <del className="text-sm font-normal text-stone-500">
          {formatPrice(compareAtPrice)}
        </del>
      ) : null}
    </span>
  );
}
