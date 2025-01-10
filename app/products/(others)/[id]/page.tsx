import supabase from "@/utils/supabase/server";
import Image from "next/image";
import Product from "@/models/product";
import Rating from "@/components/Rating";

export default async function Products({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const query = supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single<Product>();
  const { data: product, error } = await query;

  if (error) {
    throw new Error("Failed to fetch product");
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-96 lg:h-screen lg:fixed lg:left-0 lg:top-0 flex items-center justify-center bg-white p-4 lg:p-8">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src={product.image_url!}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="rating absolute top-5 right-5">
            {product.rating && (
              <Rating rating={product.rating.toPrecision(2)} />
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen p-4 lg:p-8">
        <div className="max-w-xl mx-auto pt-8 lg:pt-24">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h2 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
            {product.name}
          </h2>
          <p className="mb-2 lg:mb-4">{`${product.category}'s Shoes`}</p>
          <p className="font-bold text-lg lg:text-xl mb-4 lg:mb-6">{`MRP: $${product.price}`}</p>

          <p className="mb-4 lg:mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            sunt perferendis vitae dolores consequuntur earum quibusdam, dicta,
            natus, error quaerat dolore architecto aliquid quos. Quaerat eum
            illum rerum omnis quas. Perspiciatis corporis incidunt nisi nemo
            nulla quis fugit aliquam in. Rem distinctio odit fugiat minus aut
            nobis recusandae eveniet enim aperiam labore quibusdam, sunt velit
            adipisci est quisquam? Atque quos molestias, ratione officiis vitae
            ex labore sapiente, rerum nihil nisi recusandae repellat eaque, in
            temporibus repudiandae sunt numquam? Asperiores accusamus, ullam
            exercitationem, a accusantium et adipisci provident ab cum dicta
            dolor perspiciatis sunt saepe repudiandae eum enim sint error? Quos.
          </p>

          <div className="mb-6 lg:mb-8">
            <label className="block mb-3 text-sm font-medium text-gray-900">
              Colors
            </label>
            <div className="grid grid-cols-6 gap-2 lg:gap-4">
              {product.colors.map((color) => (
                <label
                  key={color}
                  style={{ backgroundColor: color }}
                  className="relative w-8 h-8 border rounded-full cursor-pointer hover:shadow-lg transition-shadow">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    required
                    className="sr-only peer"
                  />
                  <div className="absolute inset-0 rounded-full peer-checked:ring-2 ring-gray-900 ring-offset-2"></div>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 lg:mb-8">
            <label className="block mb-3 text-sm font-medium text-gray-900">
              Size
            </label>
            <div className="grid grid-cols-3 gap-2 lg:gap-4">
              {product.sizes.map((size) => (
                <label
                  key={size}
                  className="relative border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="size"
                    value={`${size} UK`}
                    required
                    className="sr-only peer"
                  />
                  <div className="p-2 lg:p-4 text-center rounded-lg border-2 border-transparent peer-checked:border-gray-900">
                    <span className="text-sm font-medium">{`${size} UK`}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
