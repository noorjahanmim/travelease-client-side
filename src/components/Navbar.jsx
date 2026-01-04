import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  /* ---------------- Theme ---------------- */
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  /* ---------------- Mobile ---------------- */
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed!"));
  };

  /* ---------------- Links ---------------- */
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "All Vehicles", path: "/allVehicles" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  /* ---------------- Active Style ---------------- */
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-gradient-to-r from-blue-600 to-indigo-400 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-indigo-400"
      : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent transition-all duration-300";
  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-100 dark:border-white/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        {/* ---------------- Logo ---------------- */}
        <Link
          to="/"
          className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 bg-clip-text text-transparent font-extrabold"
        >
          TravelEase
        </Link>

        {/* ---------------- Desktop Menu ---------------- */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {publicLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={navLinkClass}>
                {link.name}
              </NavLink>
            </li>
          ))}

          {user && (
            <li>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        {/* ---------------- Right Section ---------------- */}
        <div className="hidden md:flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* User / Auth */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-9 h-9 rounded-full border-2 border-indigo-500 object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-indigo-600" />
                )}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-4 py-3 border-b dark:border-white/10">
                  <p className="text-sm font-semibold">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>

                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Profile
                </Link>

                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* ---------------- Mobile Button ---------------- */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-2xl"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ---------------- Mobile Menu ---------------- */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t">
          <ul className="flex flex-col gap-4 p-4">
            {publicLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
