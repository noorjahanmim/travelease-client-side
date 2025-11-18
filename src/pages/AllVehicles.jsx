import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaMapMarkerAlt, FaCarSide, FaDollarSign, FaThLarge } from "react-icons/fa";
import { motion } from "framer-motion";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios
      .get("https://travelease-vehicle-booking.vercel.app/models")
      .then((res) => {
        setVehicles(res.data);
        setFiltered(res.data);
      })
      .catch(() => toast.error("Failed to load vehicles"))
      .finally(() => setLoading(false));
  }, []);

 
  useEffect(() => {
    let data = [...vehicles];

    if (category) {
      data = data.filter((v) => v.category === category);
    }

    if (location) {
      data = data.filter((v) => v.location === location);
    }

    if (sort === "low") {
      data.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sort === "high") {
      data.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    setFiltered(data);
  }, [category, location, sort, vehicles]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-700 dark:text-blue-400 mt-10">
         All Vehicles
      </h2>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Filter by Category</option>
          <option value="Sedan">Sedan</option>
          <option value="Electric">Electric</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
        </select>

        {/* Location Filter */}
        <select
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Filter by Location</option>
          <option value="Dhaka, Bangladesh">Dhaka</option>
          <option value="Chittagong, Bangladesh">Chittagong</option>
          <option value="Sylhet, Bangladesh">Sylhet</option>
          <option value="Rangpur, Bangladesh">Rangpur</option>
          <option value="Rajshahi, Bangladesh">Rajshahi</option>
          <option value="Khulna, Bangladesh">Khulna</option>
        </select>

        {/* Price Sort */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* Vehicle Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No vehicles found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((vehicle) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={vehicle.coverImage}
                  alt={vehicle.vehicleName}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />

                <span className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  {vehicle.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <FaCarSide className="text-blue-600 dark:text-blue-400" />
                  {vehicle.vehicleName}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
                  {vehicle.location}
                </p>

                <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <FaDollarSign /> {vehicle.pricePerDay}/day
                </p>

                <Link
                  to={`/vehicles/${vehicle._id}`}
                  className="mt-4 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVehicles;
