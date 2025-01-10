import Link from "next/link";
import SortDropdown from "@/components/SortDropdown";
import Filters from "@/components/Filters";

export default function ProductsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <div className="pt-24 pb-6 flex justify-between border-b-2 border-gray-200">
        <h2 className="text-2xl font-semibold mb-2">Products</h2>
        <div className="flex items-center space-x-6">
          <SortDropdown />
          <Link
            href="/products/add"
            className="py-2 px-4 rounded-full border border-purple-200 text-center text-purple-600 hover:text-white hover:bg-purple-600">
            Add Products
          </Link>
        </div>
      </div>
      <div className="flex space-x-8 flex-1 overflow-hidden py-6">
        <div className="w-[30vw] md:w-[20vw] sm:w-[25vw] overflow-y-auto pr-4">
          <Filters />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
