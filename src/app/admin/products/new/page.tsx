import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
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
          <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
          <p className="text-sm text-muted-foreground">Create a new product listing in your store.</p>
        </div>
      </div>
      
      <ProductForm />
    </div>
  );
}
