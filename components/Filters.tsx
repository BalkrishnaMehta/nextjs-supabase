"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

type FilterCategory = {
  gender: string[];
  color: string[];
  size: number[];
  brand: string[];
};

type FilterValue = string | number;

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterCategories: FilterCategory = {
    gender: ["Male", "Female", "Unisex"],
    color: [
      "#F9F6E6",
      "#000957",
      "#5D8736",
      "#ffffff",
      "#000000",
      "#20fea9",
      "#db0000",
      "#00ffb3",
    ],
    size: [6, 7, 8, 9, 10, 11],
    brand: ["Adidas", "Nike", "Puma"],
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.getAll(name);

      value = name === "color" ? value.slice(1) : value;

      if (currentValues.includes(value)) {
        const newValues = currentValues.filter((v) => v !== value);
        params.delete(name);
        newValues.forEach((v) => params.append(name, v));
      } else {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleFilterCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const category = e.target.name;
    const value = e.target.value;

    const queryString = createQueryString(category, value);
    router.replace(`/products?${queryString}`);
  };

  const isChecked = (category: string, value: FilterValue) => {
    const values = searchParams.getAll(category);
    return values.includes(
      category === "color" ? value.toString().slice(1) : String(value)
    );
  };

  return (
    <>
      <button
        onClick={() => {
          router.replace("/products");
        }}
        className="w-full py-2 px-6 rounded-lg border border-purple-200 text-center text-purple-600 hover:text-white hover:bg-purple-600 transition-all">
        Clear all
      </button>
      {(Object.keys(filterCategories) as Array<keyof FilterCategory>).map(
        (categoryName) => (
          <div key={categoryName} className="px-6 py-2">
            <h2 className="text-lg font-[450]">
              {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </h2>
            <div className="border-b-2 border-gray-200 py-4">
              {filterCategories[categoryName].map(
                (filterValue: FilterValue) => (
                  <label
                    key={filterValue}
                    className="py-1 flex space-x-4 cursor-pointer accent-purple-500">
                    <input
                      type="checkbox"
                      name={categoryName}
                      value={filterValue}
                      checked={isChecked(categoryName, filterValue)}
                      className="peer"
                      onChange={handleFilterCheck}
                    />
                    <div className="w-full">
                      <span className="text-sm text-center peer-checked:font-medium">
                        {filterValue.toString().toUpperCase()}
                      </span>
                    </div>
                  </label>
                )
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}
