import { ProductCard } from "@/components/product/product-card";
import type { ProductSummary } from "@/lib/catalog/types";

export interface ProductGridProps {
  products: readonly ProductSummary[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
