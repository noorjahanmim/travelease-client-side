import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMapMarkerAlt, FaCarSide, FaGlobeAmericas, FaArrowRight, 
  FaSearch, FaFilter, FaSortAmountDown, FaTimes 
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for Search, Filter, Sort, & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Row te 4 ta kore 2 row

  useEffect(() => {
    axios
      .get("https://travelease-vehicle-booking.vercel.app/models")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch(() => toast.error("Failed to load vehicles"))
      .finally(() => setLoading(false));
  }, []);

  // Filter & Sort Logic (useMemo for Performance)
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    if (searchQuery) {
      result = result.filter((v) =>
        v.vehicleName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category) {
      result = result.filter((v) => v.category === category);
    }
    if (location) {
      result = result.filter((v) => v.location === location);
    }
    if (sort === "low") {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "high") {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return result;
  }, [vehicles, searchQuery, category, location, sort]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedData = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("");
    setLocation("");
    setSort("");
    setCurrentPage(1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1a] transition-colors duration-700 font-sans pb-20">
      
      {/* 1. HEADER SECTION (Glassmorphism Look) */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            Explore Our Fleet
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6"
          >
            All <span className="text-blue-600">Vehicles</span>
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Find the perfect ride for your next journey from our luxury and economy collections.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTERS BAR */}
      <section className="sticky top-20 z-40 container mx-auto px-6 -mt-10">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
          
          {/* Search Bar */}
          <div className="relative lg:col-span-2">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by vehicle name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 dark:text-white border-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="Sedan">Sedan</option>
              <option value="Electric">Electric</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 dark:text-white border-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="">All Locations</option>
              <option value="Dhaka, Bangladesh">Dhaka</option>
              <option value="Chittagong, Bangladesh">Chittagong</option>
              <option value="Sylhet, Bangladesh">Sylhet</option>
              <option value="Rangpur, Bangladesh">Rangpur</option>
            </select>
          </div>

          {/* Sort & Clear */}
          <div className="flex gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex-1 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 dark:text-white border-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer font-bold"
            >
              <option value="">Sort Price</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>
            <button 
              onClick={clearFilters}
              className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
              title="Clear Filters"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </section>

      {/* 3. VEHICLE GRID (1 Row 4 Cards Layout) */}
      <section className="container mx-auto px-6 py-20">
        <AnimatePresence mode="popLayout">
          {paginatedData.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20"
            >
              <div className="text-6xl mb-6 flex justify-center text-gray-300 dark:text-gray-700"><FaCarSide /></div>
              <h3 className="text-2xl font-bold dark:text-white">No vehicles match your search.</h3>
              <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {paginatedData.map((vehicle) => (
                <motion.div
                  key={vehicle._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -12 }}
                  className="group relative bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] p-4 border border-transparent hover:border-blue-500/30 transition-all duration-500 shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden rounded-[2rem] mb-6">
                    <img 
                      src={vehicle.coverImage} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={vehicle.vehicleName}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest dark:text-white">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 pb-2">
                    <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 truncate">
                      {vehicle.vehicleName}
                    </h4>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                      <FaGlobeAmericas className="text-blue-500"/> {vehicle.location}
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 dark:border-white/5 pt-6">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Daily Rate</p>
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                          ${vehicle.pricePerDay}
                        </span>
                      </div>
                      <Link 
                        to={`/vehicles/${vehicle._id}`} 
                        className="w-12 h-12 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-lg"
                      >
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 dark:text-white disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all font-bold"
          >
            Prev
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-xl font-black transition-all ${
                  currentPage === i + 1 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                  : "bg-gray-100 dark:bg-white/5 dark:text-white hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 dark:text-white disabled:opacity-30 hover:bg-blue-600 hover:text-white transition-all font-bold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllVehicles;