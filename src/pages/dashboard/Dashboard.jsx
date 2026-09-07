import StatCard from "../../components/StatCard/StatCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin 👋</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          title="Total Products"
          value="16"
          description="Products in store"
          icon="📦"
          type="purple"
        />

        <StatCard
          title="Total Users"
          value="0"
          description="Registered customers"
          icon="👤"
          type="blue"
        />

        <StatCard
          title="Total Orders"
          value="0"
          description="Orders received"
          icon="🛒"
          type="orange"
        />
      </div>

      {/* Dashboard Bottom */}
      <div className="dashboard-grid">

        {/* Sales Overview */}
        <div className="panel sales-panel">
          <div className="panel-header">
            <div>
              <h2>Sales Overview</h2>
              <p>Store performance</p>
            </div>

            <select className="sales-select">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 12 months</option>
            </select>
          </div>

          <div className="sales-summary">
            <div>
              <span>Total Sales</span>
              <strong>$1,245</strong>
            </div>

            <div>
              <span>This Week</span>
              <strong>$845</strong>
            </div>
          </div>

          <div className="chart">

            <div className="chart-line line-1"></div>
            <div className="chart-line line-2"></div>
            <div className="chart-line line-3"></div>
            <div className="chart-line line-4"></div>

            <div className="bars">
              <div className="bar-item">
                <span className="bar" style={{ height: "35%" }}></span>
                <small>Mon</small>
              </div>

              <div className="bar-item">
                <span className="bar" style={{ height: "55%" }}></span>
                <small>Tue</small>
              </div>

              <div className="bar-item">
                <span className="bar" style={{ height: "42%" }}></span>
                <small>Wed</small>
              </div>

              <div className="bar-item">
                <span className="bar" style={{ height: "70%" }}></span>
                <small>Thu</small>
              </div>

              <div className="bar-item">
                <span className="bar" style={{ height: "50%" }}></span>
                <small>Fri</small>
              </div>

              <div className="bar-item">
                <span className="bar" style={{ height: "85%" }}></span>
                <small>Sat</small>
              </div>

              <div className="bar-item">
                <span className="bar" style={{ height: "65%" }}></span>
                <small>Sun</small>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <div className="panel recent-products-panel">
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
            <div className="product-placeholder">
              T
            </div>

            <div className="recent-product-info">
              <strong>T-Shirts with Tape Details</strong>
              <small>T-shirts</small>
            </div>

            <b>$145</b>
          </div>

          <div className="recent-item">
            <div className="product-placeholder">
              J
            </div>

            <div className="recent-product-info">
              <strong>Skinny Fit Jeans</strong>
              <small>Jeans</small>
            </div>

            <b>$240</b>
          </div>

          <div className="recent-item">
            <div className="product-placeholder">
              S
            </div>

            <div className="recent-product-info">
              <strong>Checkered Shirt</strong>
              <small>Shirts</small>
            </div>

            <b>$180</b>
          </div>

          <div className="recent-item">
            <div className="product-placeholder">
              S
            </div>

            <div className="recent-product-info">
              <strong>Vertical Striped Shirt</strong>
              <small>Shirts</small>
            </div>

            <b>$212</b>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;