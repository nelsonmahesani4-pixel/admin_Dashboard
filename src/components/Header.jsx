import { Bell, Search } from "lucide-react";

function Header({ title }) {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">
          {title}
        </h2>

        <p className="text-sm text-zinc-500">
          Manage your SHOP.CO store
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 md:flex">
          <Search size={18} className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl p-2.5 hover:bg-zinc-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-bold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-zinc-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;