import { Modal } from "@/components/Modal";
import ProductForm from "@/components/ProductForm";
import supabase from "@/utils/supabase/server";

export default async function EditProductModal({
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
    <Modal>
      <ProductForm formData={products} />
    </Modal>
  );
}
