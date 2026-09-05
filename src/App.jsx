import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

import { getProducts } from "./services/productService";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data.items || []);
      } catch (error) {
        console.error(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="ml-64">
        <Header title={activePage} />

        <main className="p-8">
          {loading && (
            <div className="flex h-96 items-center justify-center">
              <p className="text-zinc-500">
                Loading dashboard...
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
              <p className="font-semibold">
                Backend Connection Error
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            activePage === "Dashboard" && (
              <Dashboard products={products} />
            )}

          {!loading &&
            !error &&
            activePage !== "Dashboard" && (
              <div className="rounded-2xl border bg-white p-8">
                <h2 className="text-xl font-bold">
                  {activePage}
                </h2>

                <p className="mt-2 text-zinc-500">
                  This section will be built next.
                </p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
}

export default App;