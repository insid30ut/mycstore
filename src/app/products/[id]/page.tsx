"use client";

import * as React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, ShoppingCart, Microscope, FlaskConical, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Strain not found in our mycelial database.</h1>
        <Button onClick={() => router.push("/products")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.back()}
        className="mb-8 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Research
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-2xl overflow-hidden glass-dark border border-white/10"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <Badge variant="accent" className="px-4 py-1">
              {product.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
                Free Expedited Shipping
              </span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Research Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl glass border border-white/10 flex items-center gap-4">
              <Microscope className="w-6 h-6 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Scientific Spec</p>
                <p className="font-semibold">{product.metadata.strain || "Psilocybe cubensis"}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl glass border border-white/10 flex items-center gap-4">
              <FlaskConical className="w-6 h-6 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Substrate/Medium</p>
                <p className="font-semibold">{product.metadata.medium || product.metadata.grain || "N/A"}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl glass border border-white/10 flex items-center gap-4">
              <PackageCheck className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Availability</p>
                <p className="font-semibold">In Stock & Ready</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 gap-2" 
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Collection
            </Button>
            <Button size="lg" variant="glass" className="flex-1">
              Wholesale Inquiry
            </Button>
          </div>

          <div className="pt-8 border-t border-white/5 text-xs text-muted-foreground space-y-2">
            <p>• Ships via discrete USPS Priority Mail (estimated 2-3 business days).</p>
            <p>• All spore materials are strictly for microscopy and research purposes only.</p>
            <p>• Guaranteed viable cultures and contamination-free shipping.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
