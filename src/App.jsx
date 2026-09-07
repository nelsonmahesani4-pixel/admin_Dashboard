import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "▣" },
    { name: "Products", icon: "▤" },
    { name: "Users", icon: "♙" },
    { name: "Orders", icon: "🛒" },
  ];

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <span>SHOP.CO</span>
        </div>

        <div className="sidebar-title">MAIN MENU</div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activeTab === item.name ? "active" : ""
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item logout">
            <span className="nav-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">
          <button className="mobile-menu">☰</button>

          <div className="search-box">
            <span>⌕</span>
            <input placeholder="Search..." />
          </div>

          <div className="top-actions">
            <button>◔</button>
            <button>🔔</button>

            <div className="admin-profile">
              <div className="avatar">A</div>
              <div>
                <strong>Admin</strong>
                <small>Administrator</small>
              </div>
            </div>
          </div>
        </header>

        {/* Page */}
        <section className="page-content">

          <div className="page-heading">
            <div>
              <h1>{activeTab}</h1>
              <p>
                Welcome back, Admin 👋
              </p>
            </div>

            {activeTab === "Products" && (
              <button className="primary-btn">
                + Add Product
              </button>
            )}
          </div>

          {/* Dashboard */}
          {activeTab === "Dashboard" && (
            <>
              <div className="stats-grid">

                <div className="stat-card purple">
                  <div className="stat-top">
                    <span>Total Products</span>
                    <div className="stat-icon">📦</div>
                  </div>

                  <h2>16</h2>
                  <p>Products in store</p>
                </div>

                <div className="stat-card blue">
                  <div className="stat-top">
                    <span>Total Users</span>
                    <div className="stat-icon">👤</div>
                  </div>

                  <h2>0</h2>
                  <p>Registered customers</p>
                </div>

                <div className="stat-card orange">
                  <div className="stat-top">
                    <span>Total Orders</span>
                    <div className="stat-icon">🛒</div>
                  </div>

                  <h2>0</h2>
                  <p>Orders received</p>
                </div>

              </div>

              <div className="dashboard-grid">

                <div className="panel sales-panel">
                  <div className="panel-header">
                    <div>
                      <h2>Sales Overview</h2>
                      <p>Store performance</p>
                    </div>

                    <select>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 12 months</option>
                    </select>
                  </div>

                  <div className="chart">
                    <div className="chart-line line-1"></div>
                    <div className="chart-line line-2"></div>
                    <div className="chart-line line-3"></div>

                    <div className="bars">
                      <span style={{ height: "35%" }}></span>
                      <span style={{ height: "55%" }}></span>
                      <span style={{ height: "42%" }}></span>
                      <span style={{ height: "70%" }}></span>
                      <span style={{ height: "50%" }}></span>
                      <span style={{ height: "85%" }}></span>
                      <span style={{ height: "65%" }}></span>
                    </div>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <h2>Recent Products</h2>
                      <p>Latest products</p>
                    </div>

                    <button className="view-btn">
                      View All
                    </button>
                  </div>

                  <div className="recent-item">
                    <div className="product-placeholder">T</div>
                    <div>
                      <strong>T-Shirts with Tape Details</strong>
                      <small>T-shirts</small>
                    </div>
                    <b>$145</b>
                  </div>

                  <div className="recent-item">
                    <div className="product-placeholder">J</div>
                    <div>
                      <strong>Skinny Fit Jeans</strong>
                      <small>Jeans</small>
                    </div>
                    <b>$240</b>
                  </div>

                  <div className="recent-item">
                    <div className="product-placeholder">S</div>
                    <div>
                      <strong>Checkered Shirt</strong>
                      <small>Shirts</small>
                    </div>
                    <b>$180</b>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* Products */}
          {activeTab === "Products" && (
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>All Products</h2>
                  <p>Manage your store products</p>
                </div>

                <button className="refresh-btn">
                  ↻ Refresh
                </button>
              </div>

              <div className="empty-table">
                <div>📦</div>
                <h3>Products section</h3>
                <p>
                  Yahan MongoDB se tumhare 16 products
                  connect karenge.
                </p>
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "Users" && (
            <div className="panel empty-page">
              <div>👤</div>
              <h2>Users</h2>
              <p>Customer management yahan hoga.</p>
            </div>
          )}

          {/* Orders */}
          {activeTab === "Orders" && (
            <div className="panel empty-page">
              <div>🛒</div>
              <h2>Orders</h2>
              <p>Customer orders yahan show honge.</p>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default App;