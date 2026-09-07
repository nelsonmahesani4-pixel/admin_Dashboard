import { useState } from "react";
import ProductTable from "../../components/ProductTable/ProductTable";
import "./Products.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api";

function Products() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditingProduct(null);

    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Products</h1>
          <p>Welcome back, Admin 👋</p>
        </div>

        <button
          className="primary-btn"
          onClick={handleAdd}
        >
          + Add Product
        </button>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>All Products</h2>
            <p>Manage your store products</p>
          </div>
        </div>

        <ProductTable
          key={refreshKey}
          onEdit={handleEdit}
        />
      </div>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}


// ======================================================
// ADD / EDIT PRODUCT MODAL
// ======================================================

function ProductModal({
  product,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    name:
      product?.name ||
      product?.title ||
      "",

    category:
      product?.category ||
      "",

    price:
      product?.price ??
      "",

    discount:
      product?.discount ??
      0,

    image:
      product?.image ||
      "",

    dressStyle:
      product?.dressStyle ||
      "",

    rating:
      product?.rating ??
      0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.category ||
      !form.price
    ) {
      setError(
        "Product name, category aur price required hain."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Admin login nahi hai. Please login again."
        );

        return;
      }

      const isEditing =
        Boolean(product);

      const productId =
        product?.id;

      const url = isEditing
        ? `${API_URL}/products/${productId}`
        : `${API_URL}/products`;

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          name: form.name,

          category:
            form.category,

          price:
            Number(form.price),

          discount:
            Number(form.discount) || 0,

          image:
            form.image,

          dressStyle:
            form.dressStyle,

          rating:
            Number(form.rating) || 0,
        }),
      });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Product save nahi ho saka."
        );
      }

      alert(
        isEditing
          ? "Product updated successfully."
          : "Product added successfully."
      );

      onSaved();
    } catch (err) {
      console.error(err);

      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="product-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <h2>
              {product
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p>
              {product
                ? "Update product information"
                : "Add a new product to your store"}
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Product Name *
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>


          <div className="form-row">
            <div className="form-group">
              <label>
                Category *
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. T-Shirts"
              />
            </div>

            <div className="form-group">
              <label>
                Price *
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="100"
                min="0"
              />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group">
              <label>
                Discount (%)
              </label>

              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label>
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="4.5"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>


          <div className="form-group">
            <label>
              Dress Style
            </label>

            <input
              type="text"
              name="dressStyle"
              value={form.dressStyle}
              onChange={handleChange}
              placeholder="e.g. Casual"
            />
          </div>


          <div className="form-group">
            <label>
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>


          {error && (
            <div className="form-error">
              ⚠️ {error}
            </div>
          )}


          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : product
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Products;