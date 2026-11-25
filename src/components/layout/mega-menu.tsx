import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";
import type { MegaMenu } from "@/lib/constants/navigation";

interface MegaMenuPanelProps {
  id: string;
  menu: MegaMenu;
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenuPanel({
  id,
  menu,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuPanelProps) {
  return (
    <div
      id={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full hidden border-y border-stone-300 bg-stone-100 shadow-menu lg:block"
    >
      <div className="container-page py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)] gap-10">
          {menu.columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow text-stone-500">{column.title}</p>
              <ul className="mt-5 space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="group inline-flex items-center gap-2 py-1.5 text-[15px] text-stone-700 transition-colors hover:text-ink"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-200 group-hover:w-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="hidden lg:block">
            <Link
              href={menu.promo.href}
              onClick={onNavigate}
              className="group relative block aspect-[16/10] overflow-hidden bg-stone-200"
            >
              <Image
                src={menu.promo.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 34vw, 0px"
                className="object-cover transition-transform duration-500 ease-luxe group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="eyebrow text-gold-soft">{menu.promo.eyebrow}</p>
                <p className="mt-2 font-display text-2xl leading-tight text-stone-50">
                  {menu.promo.title}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-200">
                  {menu.promo.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-50">
                  {menu.promo.cta}
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
