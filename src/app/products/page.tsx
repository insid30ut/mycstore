import { Metadata } from "next";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Shop Mycology Supplies | Mycelial FunGuy",
  description: "Browse our premium selection of sporeprints, live cultures, and sterilized substrates. Free shipping on all US orders.",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          Our <span className="text-gradient">Collections</span>
        </h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl">
          Premium genetics and research materials, expertly prepared for the dedicated mycologist.
          Always free shipping within the United States.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
