"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";

interface HomeContentProps {
  featuredProducts: any[];
}

export function HomeContent({ featuredProducts }: HomeContentProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_50%)]" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>New genetics available now</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent"
          >
            Explore the Depths of
            <br />
            <span className="text-primary filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              Underworld Genetics
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Premium quality spore prints, liquid cultures, and microscopy supplies. 
            Expertly curated and sterilely prepared for rigorous research and taxonomy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/products"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-primary rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            
            <Link 
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 font-medium text-white bg-white/5 border border-white/10 rounded-full transition-all hover:bg-white/10"
            >
              Learn Our Process
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-black/50 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Genetics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every strain is rigorously tested and verified for clean, robust microscopy research.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass p-8 rounded-2xl border border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sterile Preparation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Prepared in a professional-grade flow hood environment ensuring zero contamination.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-2xl border border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Discreet Shipping</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fast, reliable, and completely discreet packaging right to your door.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Specimens</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Explore our most popular and highly sought-after mycological supplies.
              </p>
            </div>
            <Link 
              href="/products" 
              className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View all inventory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center glass rounded-2xl border border-white/10">
              <p className="text-muted-foreground text-lg">Inventory is currently being updated.</p>
            </div>
          )}
          
          <div className="mt-8 flex justify-center md:hidden">
            <Link 
              href="/products" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View all inventory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Futuristic Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-white/5 bg-black/80">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 relative rounded-full overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="object-cover w-full h-full" />
                </div>
                <span className="text-xl font-bold tracking-tighter">
                  PSILOCYBER <span className="text-primary">UNDERWORLD</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Elevating mycology research with premium genetics, sterile supplies, and an uncompromising dedication to the craft. 
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Store</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">Research Info</Link></li>
                <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Psilocyber Underworld. All rights reserved.</p>
            <p className="mt-2 md:mt-0">For microscopy and taxonomy purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
