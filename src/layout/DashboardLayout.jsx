import { Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CarFront } from "lucide-react";
import {
  Menu,
  X,
  LayoutDashboard,
  Car,
  ClipboardList,
  PlusCircle,
  UserCircle,
  Home,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  const activeClass =
    "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold";
  const baseClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-indigo-600/10";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* ───── Top Navbar ───── */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          <div className="flex items-start gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 bg-clip-text text-transparent font-extrabold">
              TravelEase
            </span>
          </div>

          <div className="flex items-center gap-4">

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-600/10"
              >
                <UserCircle size={22} />
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-indigo-600/10"
                  >
                    Overview
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm hover:bg-indigo-600/10"
                  >
                    Edit Profile
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <div className="flex">

        {/* ───── Sidebar ───── */}


        <motion.aside
          animate={{ width: open ? 260 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-white/10 overflow-hidden h-[calc(100vh-64px)] sticky top-16"
        >
          <nav className="p-4 space-y-1 text-sm">

            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${baseClass} ${isActive && activeClass}`
              }
            >
              <LayoutDashboard size={18} />
              Overview
            </NavLink>

            <NavLink
              to="/dashboard/add-vehicle"
              className={({ isActive }) =>
                `${baseClass} ${isActive && activeClass}`
              }
            >
              <PlusCircle size={18} />
              Add Vehicle
            </NavLink>

            <NavLink
              to="/dashboard/my-vehicles"
              className={({ isActive }) =>
                `${baseClass} ${isActive && activeClass}`
              }
            >
              <Car size={18} />
              My Vehicles
            </NavLink>


            <NavLink
              to="/dashboard/book-vehicle"
              className={({ isActive }) =>
                `${baseClass} ${isActive && activeClass}`
              }
            >
              <CarFront size={18} />
              {open && "Book Vehicle"}
            </NavLink>


            <NavLink
              to="/dashboard/my-bookings"
              className={({ isActive }) =>
                `${baseClass} ${isActive && activeClass}`
              }
            >
              <ClipboardList size={18} />
              My Bookings
            </NavLink>

            <div className="my-3 border-t border-gray-200 dark:border-white/10" />

            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-600/10"
            >
              <Home size={18} />
              Main Home
            </NavLink>

          </nav>
        </motion.aside>

        {/* ───── Main Content ───── */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
