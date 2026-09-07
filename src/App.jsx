
import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Topbar from "./components/Topbar/Topbar.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Products from "./pages/Products/Products.jsx";
import Users from "./pages/Users/Users.jsx";
import Orders from "./pages/Orders/Orders.jsx";

import Login from "./pages/Login/Login.jsx";

function App() {
  // Check karo admin already login hai ya nahi
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    setIsLoggedIn(false);
  };

  // Agar login nahi hai to Login page show hoga
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case "Products":
        return <Products />;

      case "Users":
        return <Users />;

      case "Orders":
        return <Orders />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="main-content">
        <Topbar onLogout={handleLogout} />

        <section className="page-content">
          {renderPage()}
        </section>
      </main>
    </div>
  );
}

export default App;
