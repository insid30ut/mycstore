import { createClient } from "@/utils/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        url,
        is_primary
      )
    `)
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl max-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/admin/products"
          className="text-muted-foreground hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
          <p className="text-sm text-muted-foreground">Modify details for {product.name}</p>
        </div>
      </div>
      
      <ProductForm initialData={product} />
    </div>
  );
}
