import ProductForm from "@/components/ProductForm";
import supabase from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const query = supabase.from("products").select("*").eq("id", id).single();
  const { data: products, error } = await query;
  if (error) {
    throw new Error("Failed to fetch product");
  }
  return (
    <div className="container mx-auto py-[4rem]">
      <h2 className="text-2xl font-semibold mb-2">Edit Product</h2>
      <Suspense fallback="Loading">
        <ProductForm formData={products} />
      </Suspense>
    </div>
  );
}
