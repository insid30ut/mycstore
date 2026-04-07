import { createClient } from "@/utils/supabase/server";
import { HomeContent } from "@/components/home-content";

export default async function Home() {
  const supabase = await createClient();

  // Fetch up to 4 active products to feature on the homepage
  const { data: featuredProducts } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        url,
        is_primary
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);

  const products = (featuredProducts || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    metadata: p.metadata,
    image: p.product_images?.[0]?.url || "https://images.unsplash.com/photo-1594950195709-a14f66c242d7?q=80&w=800&auto=format&fit=crop",
  }));

  return (
    <main className="min-h-screen bg-black">
      <HomeContent featuredProducts={products} />
    </main>
  );
}
