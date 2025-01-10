export default interface Product {
  id: string;
  created_at: Date;
  name: string;
  price: number;
  image_url?: string;
  colors: string[];
  sizes: number[];
  brand: string;
  rating: number;
  category: "Male" | "Female" | "Unisex";
}
