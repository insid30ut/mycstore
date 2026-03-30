import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit2, Archive, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { toggleProductActive, deleteProduct } from "@/lib/actions/product";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, stock_count, is_active, category")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-sm text-muted-foreground">Manage your inventory, pricing, and active status.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left align-middle whitespace-nowrap">
            <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-right">Price</th>
                <th className="px-6 py-4 font-semibold text-right">Stock</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(products || []).map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 capitalize text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-4 text-right tabular-nums">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 text-right tabular-nums">{product.stock_count}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${product.is_active ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {product.is_active ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="text-muted-foreground hover:text-white transition-colors p-2 rounded hover:bg-white/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <form action={async () => {
                      "use server";
                      await toggleProductActive(product.id, product.is_active);
                    }}>
                      <button 
                        type="submit" 
                        title="Toggle Active"
                        className="text-muted-foreground hover:text-orange-400 transition-colors p-2 rounded hover:bg-white/10"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await deleteProduct(product.id);
                    }}>
                      <button 
                        type="submit"
                        title="Delete"
                        className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded hover:bg-white/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {!products?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No products found. Add one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
