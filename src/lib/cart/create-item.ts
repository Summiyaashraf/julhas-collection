import type { CartItem } from "@/lib/cart/types";
import type { ProductVariant } from "@/lib/catalog/types";

export interface CartProductSource {
  id: string;
  slug: string;
  title: string;
  price: number;
  images: readonly { src: string }[];
}

export function createCartItem(
  product: CartProductSource,
  variant: ProductVariant,
  quantity = 1,
): CartItem {
  return {
    productId: product.id,
    variantId: variant.id,
    slug: product.slug,
    title: product.title,
    image: product.images[0]?.src ?? "/images/brand/og-default.jpg",
    size: variant.size,
    color: variant.color,
    unitPrice: product.price,
    quantity,
    maxQuantity: Math.max(0, variant.stock),
  };
}
