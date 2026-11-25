"use client";

import { useState } from "react";

import Image from "next/image";

import type { ProductImage } from "@/lib/catalog/types";
import { cn } from "@/lib/utils/cn";

export interface ProductGalleryProps {
  images: readonly ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) {
    return null;
  }

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt || title}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>
      {images.length > 1 ? (
        <ul className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  className={cn(
                    "relative h-20 w-16 overflow-hidden border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                    isActive
                      ? "border-gold"
                      : "border-stone-300 hover:border-stone-500",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
