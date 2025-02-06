import supabase from "@/utils/supabase/server";
import ProductCard from "./ProductCard";
import Product from "@/models/product";
import Filters from "@/models/filters";

export default async function Products({
  filters,
  orderBy,
}: {
  filters: Filters;
  orderBy: {
    [key: string]: boolean;
  };
}) {
  const [key, value] = Object.entries(orderBy)[0];
  let query = supabase
    .from("products")
    .select("*")
    .order(key, { ascending: value });

  Object.entries(filters).forEach(([key, values]) => {
    if (values.length > 0) {
      if (key === "sizes" || key === "colors") {
        query = query.overlaps(key, values);
      } else {
        query = query.in(key, values);
      }
    }
  });

  const {
    data: products,
    error,
  }: { data: Product[] | null; error: Error | null } = await query;

  if (error) {
    throw new Error("Failed to fetch products");
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2">
      {products && products.length !== 0 ? (
        products.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <>
          <p></p>
          <p className="text-xl">No Products available</p>
        </>
      )}
    </div>
  );
}
