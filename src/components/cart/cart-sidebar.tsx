"use client";

import * as React from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CartSidebar() {
  const [mounted, setMounted] = React.useState(false);
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-dark z-50 flex flex-col border-l border-white/10"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Your Cart</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground opacity-20" />
                  <p className="text-muted-foreground">Your cart is as empty as a sterile petri dish.</p>
                  <Button variant="outline" onClick={() => setCartOpen(false)}>Start Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-primary font-bold text-sm">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/10 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="text-2xl font-bold">{formatPrice(getTotalPrice())}</span>
                </div>
                <p className="text-[10px] text-primary font-bold tracking-widest uppercase text-center">
                  Free US shipping included
                </p>
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  <Button className="w-full py-6 text-lg" variant="primary">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
