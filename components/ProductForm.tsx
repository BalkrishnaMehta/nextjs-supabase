"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { createProduct, updateProduct } from "@/app/action";
import Product from "@/models/product";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

export default function ProductForm({ formData }: { formData?: Product }) {
  const initialState = {
    errors: {
      name: [],
      price: [],
      image_url: [],
      colors: [],
      sizes: [],
      brand: [],
      category: [],
    },
    message: "",
  };

  const action = formData
    ? updateProduct.bind(null, formData.id)
    : createProduct;

  const [state, formAction, isPending] = useActionState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.errors === undefined) {
      router.back();
    }
  }, [state?.errors, router]);

  const [selectedColors, setSelectedColors] = useState<string[]>(
    formData?.colors || ["#FFFFFF"]
  );

  const handleColorAdd = () => {
    setSelectedColors([...selectedColors, "#FFFFFF"]);
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...selectedColors];
    newColors[index] = color;
    setSelectedColors(newColors);
  };

  const handleColorRemove = (index: number) => {
    setSelectedColors(selectedColors.filter((_, i) => i !== index));
  };

  const SIZES = [6, 7, 8, 9, 10, 11];

  return (
    <form className="max-w-sm mx-auto py-4" action={formAction}>
      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="name">
          Product Name
        </label>
        <input
          className="bg-gray-50 border-[1.7px] border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full p-2 caret-purple-500"
          type="text"
          name="name"
          id="name"
          defaultValue={formData?.name}
        />
        {state?.errors?.name && (
          <p className="text-red-500">{state.errors.name.join(", ")}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="price">
          Price
        </label>
        <input
          className="bg-gray-50 border-[1.7px] border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full p-2 caret-purple-500"
          type="number"
          name="price"
          id="price"
          min="1"
          defaultValue={formData?.price}
        />
        {state?.errors?.price && (
          <p className="text-red-500">{state.errors.price.join(", ")}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="image_url">
          Image URL
        </label>
        <input
          className="bg-gray-50 border-[1.7px] border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full p-2 caret-purple-500"
          type="text"
          name="image_url"
          id="image_url"
          defaultValue={formData?.image_url}
        />
        {state?.errors?.image_url && (
          <p className="text-red-500">{state.errors.image_url.join(", ")}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Colors
        </label>
        <div className="space-y-2">
          {selectedColors.map((color, index) => (
            <div
              key={index}
              className="flex justify-between items-center space-x-3">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="h-8 w-16"
                name="colors"
              />
              <span className="text-sm text-gray-600">
                {color.toUpperCase()}
              </span>
              {index > 0 ? (
                <button
                  type="button"
                  onClick={() => handleColorRemove(index)}
                  className="text-red-600 hover:text-red-800 text-sm">
                  Remove
                </button>
              ) : (
                <div className="w-12 h-5"></div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleColorAdd}
            className="mt-2 text-sm text-purple-600 hover:text-purple-800">
            Add Color
          </button>
        </div>
        {state?.errors?.colors && (
          <p className="text-red-500">{state.errors.colors.join(", ")}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Sizes
        </label>
        <div className="grid grid-cols-3 gap-3">
          {SIZES.map((size) => (
            <label
              key={size}
              className="flex items-center p-3 justify-between border rounded-lg cursor-pointer accent-purple-500 hover:bg-gray-50">
              <input
                type="checkbox"
                name="sizes"
                value={size}
                defaultChecked={formData?.sizes?.includes(size)}
                className="peer"
              />
              <div className="text-center w-full">
                <span className="text-sm text-center peer-checked:font-medium">
                  {size}
                </span>
              </div>
            </label>
          ))}
        </div>
        {state?.errors?.sizes && (
          <p className="text-red-500">{state.errors.sizes.join(", ")}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="brand">
          Brand
        </label>
        <input
          className="bg-gray-50 border-[1.7px] border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full p-2 caret-purple-500"
          type="text"
          name="brand"
          id="brand"
          defaultValue={formData?.brand}
        />
        {state?.errors?.brand && (
          <p className="text-red-500">{state.errors.brand.join(", ")}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Category
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Male", "Female", "Unisex"].map((category) => (
            <label
              key={category}
              className="relative flex items-center justify-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 accent-purple-500">
              <input
                type="radio"
                name="category"
                value={category}
                defaultChecked={formData?.category === category}
                className="peer"
              />
              <div className="text-center w-full">
                <span className="text-sm text-center peer-checked:font-medium">
                  {category}
                </span>
              </div>
            </label>
          ))}
        </div>
        {state?.errors?.category && (
          <p className="text-red-500">{state.errors.category.join(", ")}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="text-white bg-purple-700 hover:bg-purple-800 w-full px-4 py-2 rounded-lg flex justify-center">
        {isPending ? (
          <Spinner color="white" size="24px" borderThickness="2px" />
        ) : formData ? (
          "Update Product"
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
}
