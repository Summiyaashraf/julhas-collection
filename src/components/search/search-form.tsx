"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icons";

export interface SearchFormProps {
  initialQuery?: string;
}

export function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = query.trim();

    router.push(
      trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search",
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search products"
      className="flex items-end gap-2"
    >
      <Input
        id="search-query"
        label="Search"
        placeholder="Search fabrics, collections, fragrances…"
        type="search"
        value={query}
        autoComplete="off"
        onChange={(event) => setQuery(event.target.value)}
        containerClassName="min-w-0 flex-1"
      />
      <Button type="submit">
        <SearchIcon size={14} />
        Search
      </Button>
    </form>
  );
}
