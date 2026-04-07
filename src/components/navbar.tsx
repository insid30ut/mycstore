"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, Sprout } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

export function Navbar() {
  const [mounted, setMounted] = React.useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="container mx-auto">
        <div className="glass-dark rounded-full px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="Psilocyber Underworld Logo" className="object-cover w-full h-full" />
            </div>
            <span className="text-xl font-bold tracking-tighter">
              PSILOCYBER <span className="text-primary">UNDERWORLD</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => useCartStore.getState().toggleCart()}
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <Badge 
                  variant="primary" 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
