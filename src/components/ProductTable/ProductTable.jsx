import { useCallback, useEffect, useState } from "react";
import "./ProductTable.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api/products";

function ProductTable({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}`);

      if (!response.ok) {
        throw new Error("Products fetch nahi ho rahe.");
      }

      const data = await response.json();

      const productList = Array.isArray(data)
        ? data
        : data.items || data.products || [];

      setProducts(productList);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(); 
}, [fetchProducts]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin first.");
        return;
      }

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Product delete nahi ho saka."
        );
      }

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully.");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="products-status">
        <div className="loader"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-status error">
        <div>⚠️</div>

        <h3>Products load nahi ho sake</h3>

        <p>{error}</p>

        <button
          className="retry-btn"
          onClick={fetchProducts}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="products-status">
        <div>📦</div>

        <h3>No Products Found</h3>

        <p>Backend se koi product nahi mila.</p>
      </div>
    );
  }

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const id = product.id;

            return (
              <tr key={id}>
                <td>
                  <div className="product-info">
                    <div className="product-image">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={
                            product.title ||
                            product.name ||
                            "Product"
                          }
                        />
                      ) : (
                        <span>📦</span>
                      )}
                    </div>

                    <div>
                      <strong>
                        {product.title ||
                          product.name ||
                          "Unnamed Product"}
                      </strong>

                      <small>ID: {id}</small>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="category">
                    {product.category || "N/A"}
                  </span>
                </td>

                <td>
                  <strong>
                    ${product.price ?? 0}
                  </strong>
                </td>

                <td>
                  {product.discount ? (
                    <span className="discount">
                      {product.discount}%
                    </span>
                  ) : (
                    <span className="no-discount">
                      0%
                    </span>
                  )}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      title="Edit Product"
                      onClick={() => onEdit(product)}
                    >
                      ✎
                    </button>

                    <button
                      className="delete-btn"
                      title="Delete Product"
                      disabled={deletingId === id}
                      onClick={() => handleDelete(id)}
                    >
                      {deletingId === id ? "..." : "🗑"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="product-count">
        Showing{" "}
        <strong>{products.length}</strong>{" "}
        products
      </div>
    </div>
  );
}

export default ProductTable;