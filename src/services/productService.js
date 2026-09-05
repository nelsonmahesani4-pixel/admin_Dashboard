const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const response = await fetch(
    `${API_URL}/api/products?limit=100`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(
    `${API_URL}/api/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to create product"
    );
  }

  return data;
}