import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-purple-900">
            Shoe Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A Next.js 15 application showcasing parallel routes, intercepting
            routes, and dynamic route groups for efficient product management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/products" className="group">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow h-full border border-gray-100">
              <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  Product List
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Browse all products with advanced filtering and sorting options.
                Uses route groups (list) for organization.
              </p>
              <div className="flex items-center text-purple-600 group-hover:translate-x-2 transition-transform">
                View Products →
              </div>
            </div>
          </Link>

          <Link href="/products/add" className="group">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow h-full border border-gray-100">
              <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  Add Product
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Add new products with our modal-based form. Demonstrates
                intercepting routes for modal interactions.
              </p>
              <div className="flex items-center text-purple-600 group-hover:translate-x-2 transition-transform">
                Add New →
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-16">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold">Route Structure Explained</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Route Groups</h3>
                <p className="text-gray-600">
                  <code className="text-purple-600">(list)</code> - Contains the
                  main product listing layout and page
                  <br />
                  <code className="text-purple-600">(others)</code> - Groups
                  add/edit/detail pages
                  <br />
                  <code className="text-purple-600">@modal</code> - Parallel
                  route for modal interactions
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Intercepting Routes</h3>
                <p className="text-gray-600">
                  <code className="text-purple-600">(.)add</code> - Intercepts
                  /products/add for modal view
                  <br />
                  <code className="text-purple-600">(.)edit/[id]</code> -
                  Intercepts /products/edit/[id] for modal view
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Modal-based forms with URL persistence</li>
                  <li>Parallel routes for complex layouts</li>
                  <li>Dynamic segments for product details</li>
                  <li>Organized route grouping for better code structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>Built with Next.js 15 and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
