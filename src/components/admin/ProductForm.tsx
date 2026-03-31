"use client";

import { useState } from "react";
import { saveProduct } from "@/lib/actions/product";
import { Button } from "@/components/ui/Button";

interface ProductFormProps {
  initialData?: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    stock_count?: number;
    category?: string;
    is_active?: boolean;
    metadata?: Record<string, unknown>;
    product_images?: { url: string }[];
  } | null;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function clientAction(formData: FormData) {
    setPending(true);
    setError(null);
    const result = await saveProduct(null, formData);
    if (result?.error) {
      setError(result.error);
    }
    setPending(false);
  }

  // Helper to pre-fill metadata JSON string
  const metadataString = initialData?.metadata 
    ? JSON.stringify(initialData.metadata, null, 2)
    : "{\n  \"strain\": \"\",\n  \"medium\": \"\",\n  \"weight_lbs\": 0\n}";

  return (
    <form action={clientAction} className="space-y-6 max-w-3xl glass p-8 rounded-xl border border-white/10">
      {error && (
        <div className="bg-destructive/20 text-destructive p-3 rounded border border-destructive/50">
          {error}
        </div>
      )}

      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            defaultValue={initialData?.name}
            className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary"
            placeholder="e.g., Golden Teacher Spore Print"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Slug</label>
          <input 
            type="text" 
            name="slug" 
            required 
            defaultValue={initialData?.slug}
            className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary"
            placeholder="e.g., golden-teacher-spore-print"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Description</label>
        <textarea 
          name="description" 
          rows={3} 
          required 
          defaultValue={initialData?.description}
          className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary"
          placeholder="High quality spores..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Price ($)</label>
          <input 
            type="number" 
            name="price"
            step="0.01" 
            required 
            defaultValue={initialData?.price}
            className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Stock Count</label>
          <input 
            type="number" 
            name="stock_count" 
            required 
            defaultValue={initialData?.stock_count ?? 10}
            className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Category</label>
          <select 
            name="category" 
            required 
            defaultValue={initialData?.category || "spores"}
            className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white focus:ring-1 focus:ring-primary"
          >
            <option value="spores">Spores</option>
            <option value="cultures">Cultures</option>
            <option value="substrates">Substrates</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Image URL</label>
        <input 
          type="text" 
          name="image_url" 
          defaultValue={initialData?.product_images?.[0]?.url}
          className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary"
          placeholder="https://... or /image.png"
        />
        <p className="text-xs text-muted-foreground">Enter an external URL or a local file path (e.g., /banner.png).</p>
        {initialData?.product_images?.[0]?.url && (
            <div className="mt-2 w-24 h-24 rounded border border-white/10 overflow-hidden relative">
              <img src={initialData.product_images[0].url} alt="Preview" className="object-cover w-full h-full" />
            </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Metadata (JSON)</label>
        <textarea 
          name="metadata" 
          rows={5} 
          defaultValue={metadataString}
          className="w-full font-mono text-sm bg-black/40 border border-white/10 rounded-md p-2 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input 
          type="checkbox" 
          name="is_active" 
          id="is_active" 
          value="true"
          defaultChecked={initialData?.is_active ?? true}
          className="w-4 h-4 rounded border-white/10 bg-black/40 text-primary focus:ring-primary"
        />
        <label htmlFor="is_active" className="text-sm font-medium text-white">Active (Visible on Storefront)</label>
      </div>

      <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => window.history.back()}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={pending}
          className="min-w-[120px]"
        >
          {pending ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
