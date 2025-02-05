import Link from "next/link";
import DeleteIcon from "./DeleteIcon";
import Product from "@/models/product";
import Rating from "./Rating";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <div className="absolute flex justify-end top-2 right-2 gap-2 z-1">
          <Link
            className="group p-2 hover:bg-purple-600 rounded-full"
            key={product.id}
            href={`/products/edit/${product.id}`}
            passHref>
            <svg
              className="stroke-purple-500 group-hover:stroke-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
          </Link>
          <DeleteIcon id={product.id} />
        </div>

        <Link href={`/products/${product.id}`} className="group block">
          <Image
            src={product.image_url || ""}
            alt={product.name}
            className="h-[150px] w-full object-cover sm:h-[250px] rounded-t-lg"
            height={150}
            width={100}
          />
        </Link>

        <div className="p-4">
          <div className="mt-3 flex justify-between text-sm">
            <div className="mt-1.5 flex gap-2 items-center">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="h-6 w-6 rounded-full border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}></div>
              ))}
            </div>

            {product.rating && (
              <Rating rating={product.rating.toPrecision(2)} />
            )}
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <h3 className="text-gray-900 font-semibold group-hover:underline group-hover:underline-offset-4">
              {product.name}
            </h3>
            <p className="text-gray-900 font-semibold">${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
