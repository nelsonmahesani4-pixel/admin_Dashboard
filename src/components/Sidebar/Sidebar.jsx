import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { name: "Dashboard", icon: "▣" },
    { name: "Products", icon: "▤" },
    { name: "Users", icon: "♙" },
    { name: "Orders", icon: "🛒" },
  ];

  return (
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
  );
}

export default Sidebar;