import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container } from "@/components/ui/container";
import {
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { formatPrice } from "@/lib/catalog/format";
import {
  FOOTER_NAVIGATION,
  type NavigationLink,
} from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

const SOCIAL_LINKS = [
  {
    label: `Visit ${siteConfig.name} on Facebook`,
    href: siteConfig.social.facebook,
    icon: FacebookIcon,
  },
  {
    label: `Visit ${siteConfig.name} on Instagram`,
    href: siteConfig.social.instagram,
    icon: InstagramIcon,
  },
  {
    label: `Message ${siteConfig.name} on WhatsApp`,
    href: siteConfig.social.whatsapp,
    icon: WhatsAppIcon,
  },
] as const;

const LINK_GROUPS = [
  {
    title: "Customer Care",
    links: FOOTER_NAVIGATION.customerCare,
  },
  {
    title: "Information",
    links: FOOTER_NAVIGATION.information,
  },
] as const;

function FooterLinkList({
  links,
  className,
}: {
  links: readonly NavigationLink[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm text-stone-300 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterLinkColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: readonly NavigationLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-50">
        {title}
      </h2>
      <FooterLinkList links={links} className="mt-5" />
    </div>
  );
}

function FooterAccordion({
  title,
  links,
}: {
  title: string;
  links: readonly NavigationLink[];
}) {
  return (
    <details className="group border-b border-white/15 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-50 marker:content-none">
        {title}
        <ChevronDownIcon
          size={16}
          className="shrink-0 text-stone-400 transition-transform group-open:rotate-180"
        />
      </summary>
      <FooterLinkList links={links} className="pb-2 pt-4" />
    </details>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-stone-50">
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] lg:gap-12">
          <div className="order-1 max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 font-display text-2xl leading-tight text-stone-50">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              Thoughtful Pakistani fashion for everyday moments and
              celebrations — ready-to-wear, unstitched collections,
              fragrances, and kidswear.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-stone-200 transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-2 hidden md:block">
            <FooterLinkColumn
              title={LINK_GROUPS[0].title}
              links={LINK_GROUPS[0].links}
            />
          </div>
          <div className="order-3 hidden md:block">
            <FooterLinkColumn
              title={LINK_GROUPS[1].title}
              links={LINK_GROUPS[1].links}
            />
          </div>

          <div className="order-4 md:col-span-1">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-50">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-stone-300">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <MailIcon size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-start gap-3 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <PhoneIcon size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <WhatsAppIcon
                    size={16}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li className="border-t border-white/15 pt-4 text-xs leading-relaxed text-stone-400">
                {siteConfig.workingHours}
              </li>
            </ul>
          </div>

          <div className="order-2 md:hidden">
            {LINK_GROUPS.map((group) => (
              <FooterAccordion
                key={group.title}
                title={group.title}
                links={group.links}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-10 lg:mt-16">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                Join Our Journey
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-stone-50">
                Be the first to know.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-300">
                New collections, considered styling notes, and occasional
                private offers — delivered with care.
              </p>
            </div>
            <NewsletterForm className="lg:pt-6" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-stone-400 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {siteConfig.copyrightYear} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Developed in-house for {siteConfig.name}.</p>
          <p>
            Nationwide delivery. Free shipping over{" "}
            {formatPrice(siteConfig.freeShippingThreshold)}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
