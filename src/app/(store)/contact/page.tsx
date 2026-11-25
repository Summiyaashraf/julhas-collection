import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_CONTENT } from "@/content/contact";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const METHOD_ICONS = {
  WhatsApp: WhatsAppIcon,
  Email: MailIcon,
  Call: PhoneIcon,
} as const;

function getMethodIcon(label: string) {
  return (
    METHOD_ICONS[label as keyof typeof METHOD_ICONS] ?? MailIcon
  );
}

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT_CONTENT.intro,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description: CONTACT_CONTENT.intro,
  },
};

export default function ContactPage() {
  const {
    eyebrow,
    title,
    intro,
    methods,
    workingHours,
    responseNote,
    store,
    form,
  } = CONTACT_CONTENT;

  return (
    <>
      <header className="border-b border-stone-200 bg-stone-100">
        <Container size="page" className="py-10 md:py-14">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          <p className="mt-6 eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl leading-tight text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
            {intro}
          </p>
        </Container>
      </header>

      <Container size="page" className="py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16">
          <aside className="space-y-6">
            <ul className="space-y-px border border-stone-300 bg-stone-300">
              {methods.map((method) => {
                const Icon = getMethodIcon(method.label);
                return (
                  <li key={method.label} className="bg-stone-50 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-gold">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                          {method.label}
                        </p>
                        {method.external ? (
                          <a
                            href={method.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-ink transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <a
                            href={method.href}
                            className="text-sm font-medium text-ink transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                          >
                            {method.value}
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-stone-600">
                      {method.description}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="border border-stone-300 bg-stone-50 p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                Working Hours
              </p>
              <p className="mt-2 text-sm font-medium text-ink">
                {workingHours}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-stone-600">
                {responseNote}
              </p>
            </div>

            <div className="border border-stone-300 bg-stone-50 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-gold">
                  <MapPinIcon size={16} />
                </span>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
                  {store.title}
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-600">
                {store.description}
              </p>
              <dl className="mt-4 space-y-2 border-t border-stone-200 pt-4">
                {store.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
                      {detail.label}
                    </dt>
                    <dd className="text-right text-xs font-medium text-ink">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <section aria-labelledby="contact-form-heading">
            <div className="border border-stone-300 bg-white p-6 md:p-10">
              <h2
                id="contact-form-heading"
                className="font-display text-2xl text-ink md:text-3xl"
              >
                {form.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {form.description}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
