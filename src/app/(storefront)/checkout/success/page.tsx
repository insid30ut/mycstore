"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Shown after a successful Stripe Checkout.
 * Clears the cart and displays a confirmation message.
 */
export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // Clear cart once on mount after successful payment
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Thank you for your order. You will receive a confirmation email shortly.
            Your specimens will be shipped discreetly within 3–7 business days.
          </p>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6 text-left space-y-3">
          <p className="text-sm font-semibold text-primary">What happens next?</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">→</span>
              Your order is being prepared in our sterile facility.
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">→</span>
              You will receive a tracking number via email once shipped.
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-0.5">→</span>
              All packages are shipped in discreet, unmarked packaging.
            </li>
          </ul>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
