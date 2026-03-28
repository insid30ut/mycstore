import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop Mycology Supplies | Mycelial FunGuy",
  description: "Browse our premium selection of sporeprints, live cultures, and sterilized substrates. Free shipping on all US orders.",
};

// Revalidate every hour or rely on on-demand revalidation
export const revalidate = 3600;

export default async function ProductsPage() {
  const { data: dbProducts } = await supabase
    .from("products")
    .select(`
      *,
      product_images (url)
    `)
    .eq("is_active", true);

  const products: Product[] = (dbProducts || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    metadata: p.metadata,
    image: p.product_images?.[0]?.url || "https://images.unsplash.com/photo-1594950195709-a14f66c242d7?q=80&w=800&auto=format&fit=crop",
  }));

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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
