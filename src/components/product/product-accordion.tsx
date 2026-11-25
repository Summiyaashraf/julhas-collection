import { Accordion } from "@/components/ui/accordion";
import type { Product } from "@/lib/catalog/types";

export interface ProductAccordionProps {
  product: Product;
}

export function ProductAccordion({ product }: ProductAccordionProps) {
  return (
    <div className="mt-10 space-y-4 border-t border-stone-200 pt-8">
      <Accordion title="Description" open>
        <p className="text-sm leading-relaxed text-stone-600">
          {product.description}
        </p>
      </Accordion>
      <Accordion title="Fabric & Care">
        <p className="text-sm leading-relaxed text-stone-600">{product.fabric}</p>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">{product.care}</p>
      </Accordion>
      <Accordion title="Shipping & Returns">
        <p className="text-sm leading-relaxed text-stone-600">
          {product.shipping}
        </p>
      </Accordion>
      {product.sizeGuide ? (
        <Accordion title="Size Guide">
          <p className="text-sm leading-relaxed text-stone-600">
            {product.sizeGuide}
          </p>
        </Accordion>
      ) : null}
    </div>
  );
}
