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

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Mobile menu state
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

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 font-semibold"
                    : "hover:text-blue-300 transition-colors duration-300"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        
        <div className="hidden md:flex items-center gap-4">
         
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-300 transition-colors duration-300"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          
          {user ? (
            <div className="flex items-center gap-2 group relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              {user.displayName && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {user.displayName}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors duration-300"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white px-3 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        
        <button onClick={toggleMobileMenu} className="md:hidden text-2xl">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      
      {mobileOpen && (
        <div className="md:hidden bg-[#1E40AF] dark:bg-[#1E3A8A] text-white px-4 pb-4 space-y-4 transition-all duration-300">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-4 font-semibold"
                      : "hover:text-blue-300 transition-colors duration-300"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-4">
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-300 transition-colors duration-300"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors duration-300"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="border border-white px-3 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300"
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
