import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
} from "lucide-react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const emptyForm = {
  name: "",
  category: "",
  dressStyle: "",
  price: "",
  discount: 0,
  rating: 0,
  reviews: 0,
  description: "",
  colors: "",
  sizes: "",
  images: "",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.items || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);

    setForm({
      name: product.name || "",
      category: product.category || "",
      dressStyle: product.dressStyle || "",
      price: product.price || "",
      discount: product.discount || 0,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      description: product.description || "",
      colors: product.colors?.join(", ") || "",
      sizes: product.sizes?.join(", ") || "",
      images: product.images?.join(", ") || "",
    });

    setShowModal(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.category || !form.dressStyle || !form.price) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const productData = {
        name: form.name,
        category: form.category,
        dressStyle: form.dressStyle,
        price: Number(form.price),
        discount: Number(form.discount) || 0,
        rating: Number(form.rating) || 0,
        reviews: Number(form.reviews) || 0,
        description: form.description,

        colors: form.colors
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        sizes: form.sizes
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        images: form.images
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }

      setShowModal(false);
      setForm(emptyForm);
      setEditingProduct(null);

      await loadProducts();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your SHOP.CO products
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-xl p-4 mb-6">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">
            All Products ({filteredProducts.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4">
                    Product
                  </th>

                  <th className="text-left px-6 py-4">
                    Category
                  </th>

                  <th className="text-left px-6 py-4">
                    Style
                  </th>

                  <th className="text-left px-6 py-4">
                    Price
                  </th>

                  <th className="text-right px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >

                    {/* Product */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">

                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package
                              size={22}
                              className="text-gray-400"
                            />
                          )}

                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {product.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            ID: {product.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Category */}
                    <td className="px-6 py-5 text-gray-600">
                      {product.category}
                    </td>

                    {/* Style */}
                    <td className="px-6 py-5 text-gray-600">
                      {product.dressStyle}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5 font-semibold">
                      ${product.price}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 rounded-lg hover:bg-gray-100"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>
                <h2 className="text-xl font-bold">
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p className="text-sm text-gray-500">
                  Enter product information
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name *
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Black Striped T-shirt"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>

                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="T-shirts"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dress Style *
                  </label>

                  <input
                    name="dressStyle"
                    value={form.dressStyle}
                    onChange={handleChange}
                    placeholder="Casual"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

              </div>

              <div className="grid grid-cols-3 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="120"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Discount %
                  </label>

                  <input
                    type="number"
                    name="discount"
                    value={form.discount}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Product description..."
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Colors
                </label>

                <input
                  name="colors"
                  value={form.colors}
                  onChange={handleChange}
                  placeholder="Black, White, Red"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Separate colors with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sizes
                </label>

                <input
                  name="sizes"
                  value={form.sizes}
                  onChange={handleChange}
                  placeholder="S, M, L, XL"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Image URLs
                </label>

                <textarea
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  rows="3"
                  placeholder="https://example.com/image.jpg"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Separate multiple image URLs with commas
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}