"use client";

import { useRouter } from "next/navigation";

import { SORT_LABELS } from "@/components/collection/listing-labels";
import { Select } from "@/components/ui/select";
import {
  PRODUCT_SORT_OPTIONS,
  type ProductFilters,
  type ProductSort,
} from "@/lib/catalog/types";
import { buildFilterHref, resetPage } from "@/lib/filters/params";

export interface SortSelectProps {
  pathname: string;
  filters: ProductFilters;
}

export function SortSelect({ pathname, filters }: SortSelectProps) {
  const router = useRouter();

  return (
    <Select
      id="collection-sort"
      label="Sort by"
      containerClassName="w-full sm:w-52"
      value={filters.sort ?? "featured"}
      onChange={(event) => {
        const value = event.target.value;
        const sort =
          value === "featured" ? undefined : (value as ProductSort);

        router.push(
          buildFilterHref(pathname, resetPage({ ...filters, sort })),
        );
      }}
    >
      {PRODUCT_SORT_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {SORT_LABELS[option]}
        </option>
      ))}
    </Select>
  );
}
