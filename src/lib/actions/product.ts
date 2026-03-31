"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProduct(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  // Validate admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const stock_count = parseInt(formData.get("stock_count") as string, 10);
  const is_active = formData.get("is_active") === "true";
  
  const imageUrl = formData.get("image_url") as string;
  
  // Basic validation
  if (!name || !slug || isNaN(price) || !category) {
    return { error: "Missing required fields or invalid price" };
  }

  // Parse metadata from JSON text box or individual fields
  let metadata = {};
  const metadataRaw = formData.get("metadata") as string;
  if (metadataRaw) {
    try {
      metadata = JSON.parse(metadataRaw);
    } catch {
      return { error: "Invalid JSON in metadata" };
    }
  }

  const productData = {
    name,
    slug,
    description,
    price,
    category,
    stock_count,
    is_active,
    metadata,
  };

  let productId = id;

  if (id) {
    // Update
    const { error: updateError } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id);
      
    if (updateError) return { error: updateError.message };
  } else {
    // Insert
    const { data: inserted, error: insertError } = await supabase
      .from("products")
      .insert(productData)
      .select("id")
      .single();
      
    if (insertError) return { error: insertError.message };
    productId = inserted.id;
  }

  // Update or insert image
  if (imageUrl) {
    // Check if an image already exists
    const { data: existingImages } = await supabase
      .from("product_images")
      .select("id")
      .eq("product_id", productId);
      
    if (existingImages && existingImages.length > 0) {
      const { error: imageUpdateError } = await supabase
        .from("product_images")
        .update({ url: imageUrl, is_primary: true })
        .eq("product_id", productId);
        
      if (imageUpdateError) return { error: imageUpdateError.message };
    } else {
      const { error: imageInsertError } = await supabase
        .from("product_images")
        .insert({
          product_id: productId,
          url: imageUrl,
          is_primary: true,
        });
        
      if (imageInsertError) return { error: imageInsertError.message };
    }
  }

  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function toggleProductActive(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("products")
    .update({ is_active: !currentStatus })
    .eq("id", id);
    
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
    
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  redirect("/admin/products");
}
