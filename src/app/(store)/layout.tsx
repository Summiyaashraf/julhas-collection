import { CartProvider } from "@/components/cart/cart-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { ToastProvider } from "@/components/ui/toast-provider";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col">
          <SkipLink />
          <AnnouncementBar />
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}
