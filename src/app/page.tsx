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

  return (
    <main className="min-h-screen bg-black">
      <HomeContent featuredProducts={featuredProducts || []} />
    </main>
  );
}
