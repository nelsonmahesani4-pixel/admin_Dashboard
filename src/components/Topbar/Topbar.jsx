import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <button className="mobile-menu">☰</button>

      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="top-actions">
        <button className="top-action-btn">◔</button>

        <button className="top-action-btn">🔔</button>

        <div className="admin-profile">
          <div className="avatar">A</div>

          <div className="admin-info">
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;