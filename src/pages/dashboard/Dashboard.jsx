import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";

import StatCard from "../../components/StatCard";

function Dashboard({ products }) {
  const totalProducts = products.length;

  const categories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          Welcome back 👋
        </h1>

        <p className="mt-1 text-zinc-500">
          Here's what's happening with your store.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          description="Products in catalog"
          icon={Package}
        />

        <StatCard
          title="Categories"
          value={categories}
          description="Product categories"
          icon={ShoppingCart}
        />

        <StatCard
          title="Customers"
          value="0"
          description="Registered customers"
          icon={Users}
        />

        <StatCard
          title="Revenue"
          value="$0"
          description="Total revenue"
          icon={DollarSign}
        />
      </div>

      {/* Overview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Store Overview
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your products are connected to the existing backend.
            </p>
          </div>

          <div className="rounded-xl bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            ● Backend Connected
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-xl font-bold">
            Recent Products
          </h2>
        </div>

        <div className="divide-y">
          {products.slice(-5).reverse().map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-5"
            >
              <div>
                <p className="font-semibold">
                  {product.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {product.category}
                </p>
              </div>

              <p className="font-bold">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;