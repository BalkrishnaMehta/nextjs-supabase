import ProductForm from "@/components/ProductForm";

export default function Page() {
  return (
    <div className="container mx-auto py-[4rem]">
      <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
      <ProductForm />
    </div>
  );
}
