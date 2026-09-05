import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Products", icon: Package },
  { name: "Orders", icon: ShoppingCart },
  { name: "Customers", icon: Users },
  { name: "Settings", icon: Settings },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 bg-black text-white">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-zinc-800 px-6">
        <h1 className="text-2xl font-black tracking-tight">
          SHOP.CO
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;