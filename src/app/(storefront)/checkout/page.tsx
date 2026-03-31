"use client";

import * as React from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const [mounted, setMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { items, getTotalPrice } = useCartStore();
  const router = useRouter();

  /**
   * Calls the /api/checkout route to create a Stripe Checkout Session,
   * then redirects the browser to the hosted Stripe payment page.
   */
  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Failed to start checkout");
      }

      // Redirect to Stripe-hosted Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };


  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty
  React.useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/products");
    }
  }, [items, router, mounted]);

  if (!mounted || items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Truck className="w-6 h-6" />
                <h2 className="text-xl font-bold">Shipping Details</h2>
              </div>
              
              <Card className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">First Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md p-3 focus:border-primary outline-hidden" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md p-3 focus:border-primary outline-hidden" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Address</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md p-3 focus:border-primary outline-hidden" placeholder="123 Underworld Way" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">City</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md p-3 focus:border-primary outline-hidden" placeholder="Portland" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">State</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md p-3 focus:border-primary outline-hidden" placeholder="OR" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Zip</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md p-3 focus:border-primary outline-hidden" placeholder="97201" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Country</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-md p-3 outline-hidden opacity-50 cursor-not-allowed" disabled>
                    <option>United States</option>
                  </select>
                  <p className="text-[10px] text-primary italic">We currently only ship domestic to the US.</p>
                </div>
              </Card>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              <Card className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">Payment processing will be handled securely via Stripe. You will be redirected to a hosted checkout page.</p>
                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-2">
                    {error}
                  </p>
                )}
                <Button
                  className="w-full h-12 gap-2"
                  variant="primary"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                      Redirecting to Stripe...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      Confirm and Pay {formatPrice(getTotalPrice())}
                    </>
                  )}
                </Button>
              </Card>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <Card className="p-6 space-y-4">
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </Card>
              
              <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <p className="text-[10px] text-primary/80 leading-tight">
                  Your transaction is protected by 256-bit SSL encryption. Laboratory research materials are shipped discreetly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
