"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "spores": return "primary";
      case "cultures": return "accent";
      case "substrates": return "secondary";
      default: return "primary";
    }
  };

  return (
    <Card className="flex flex-col h-full group">
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-10">
          <Badge variant={getCategoryColor(product.category)}>
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] text-primary font-semibold tracking-widest uppercase">
            Free US Shipping
          </span>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => addItem(product)}
          className="gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
