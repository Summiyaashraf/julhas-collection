import Link from "next/link";

import { buttonStyles } from "@/components/ui/button-styles";
import { BagIcon } from "@/components/ui/icons";

export interface EmptyCartProps {
  onClose: () => void;
}

export function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-stone-500">
        <BagIcon size={26} />
      </span>
      <h3 className="mt-6 font-display text-2xl text-ink">
        Your bag is empty
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-600">
        Explore our latest pieces and find something to love.
      </p>
      <Link
        href="/collections"
        onClick={onClose}
        className={buttonStyles({ className: "mt-8" })}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
