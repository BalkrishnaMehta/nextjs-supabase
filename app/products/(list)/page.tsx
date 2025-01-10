import Products from "@/components/Products";
import { Suspense } from "react";
import Filters from "@/models/filters";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = await Promise.resolve(searchParams || {});

  const filters: Filters = {
    category: [],
    colors: [],
    sizes: [],
    brand: [],
  };

  const SORT_MAPPINGS = {
    dateLTH: { created_at: false },
    dateHTL: { created_at: true },
    rating: { rating: false },
    priceLTH: { price: true },
    priceHTL: { price: false },
  };

  const orderBy = SORT_MAPPINGS[
    params.sortby as keyof typeof SORT_MAPPINGS
  ] || {
    created_at: false,
  };

  if (params.gender) {
    filters.category = Array.isArray(params.gender)
      ? params.gender
      : [params.gender as string];
  }

  if (params.color) {
    filters.colors = Array.isArray(params.color)
      ? params.color.map((color) => `#${color}`)
      : [`#${params.color}`];
  }

  if (params.size) {
    filters.sizes = Array.isArray(params.size)
      ? params.size
      : [params.size as string];
  }

  if (params.brand) {
    filters.brand = Array.isArray(params.brand)
      ? params.brand
      : [params.brand as string];
  }

  return (
    <div className="p-1">
      <Suspense fallback="Loading">
        <Products filters={filters} orderBy={orderBy} />
      </Suspense>
    </div>
  );
}
