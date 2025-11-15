import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Mobile menu toggle
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed!"));
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "All Vehicles", path: "/allVehicles" },
    { name: "Add Vehicle", path: "/addVehicle" },
    { name: "My Vehicles", path: "/myVehicles" },
    { name: "My Bookings", path: "/myBookings" },
  ];

  return (
    <nav className="bg-[#1E40AF] dark:bg-[#1E3A8A] text-white shadow-md fixed w-full z-50 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">

        {/* Brand */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-300">
          TravelEase
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:text-blue-300"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-300"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white px-3 py-1 rounded-md hover:bg-white hover:text-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden text-2xl">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1E40AF] dark:bg-[#1E3A8A] text-white px-4 pb-4 space-y-4">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "underline" : "hover:text-blue-300"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-4">

            {/* Mobile theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-300"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-white px-3 py-1 rounded-md hover:bg-white hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
