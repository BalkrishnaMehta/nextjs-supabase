"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import supabase from "@/utils/supabase/server";

export type FormState =
  | {
      errors?: {
        name?: string[];
        price?: string[];
        image_url?: string[];
        colors?: string[];
        sizes?: string[];
        brand?: string[];
        category?: string[];
      };
      message?: string;
    }
  | undefined;

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  image_url: z.string().url("Invalid URL").optional(),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  sizes: z.array(z.number()).min(1, "At least one size is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.enum(["Male", "Female", "Unisex"], {
    required_error: "Category is required",
  }),
});

export async function createProduct(prevState: FormState, formData: FormData) {
  try {
    const validatedFields = ProductSchema.safeParse({
      name: formData.get("name"),
      price: Number(formData.get("price")),
      image_url: formData.get("image_url") || undefined,
      colors: formData.getAll("colors"),
      sizes: formData.getAll("sizes").map(Number),
      brand: formData.get("brand"),
      category: formData.get("category"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Product creation failed",
      };
    }

    const { error } = await supabase
      .from("products")
      .insert(validatedFields.data);

    if (error) {
      return {
        message: error.message,
      };
    }

    revalidatePath("/products");
  } catch (error) {
    return {
      message: "An unexpected error occurred",
    };
  }
}

export async function updateProduct(
  id: string,
  prevState: FormState,
  formData: FormData
) {
  try {
    const validatedFields = ProductSchema.safeParse({
      name: formData.get("name"),
      price: Number(formData.get("price")),
      image_url: formData.get("image_url") || undefined,
      colors: formData.getAll("colors"),
      sizes: formData.getAll("sizes").map(Number),
      brand: formData.get("brand"),
      category: formData.get("category"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Product update failed",
      };
    }

    const { error } = await supabase
      .from("products")
      .update({ ...validatedFields.data })
      .eq("id", id);

    if (error) {
      return {
        message: error.message,
      };
    }

    revalidatePath("/products");
  } catch (error) {
    return {
      message: "An unexpected error occurred",
    };
  }
}

export async function deleteProduct(
  id: string,
  prevState: { message?: string } | undefined
) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      return {
        message: error.message,
      };
    }

    revalidatePath("/products");
  } catch (error) {
    return {
      message: "An unexpected error occurred",
    };
  }
}
