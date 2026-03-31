import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { ReactNode } from "react";

/**
 * Storefront layout — wraps all public customer-facing pages.
 * Renders the Navbar and CartSidebar. Intentionally excluded from /admin.
 */
export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}
