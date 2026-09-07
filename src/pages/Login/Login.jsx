import { useState } from "react";
import "./Login.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      // JWT token save karo
      localStorage.setItem("token", data.token);

      // Admin information save karo
      localStorage.setItem("admin", JSON.stringify(data.admin));

      // App ko batao login successful hai
      if (onLogin) {
        onLogin(data.admin);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">SHOP.CO</div>

        <h1>Admin Login</h1>
        <p className="login-subtitle">
          Login to manage your store
        </p>

        <form onSubmit={handleLogin}>
          <div className="login-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@shopco.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;