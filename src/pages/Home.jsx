import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCarSide, FaBolt, FaShuttleVan, FaCarAlt } from "react-icons/fa";
import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://travelease-vehicle-booking.vercel.app/models")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="transition-colors duration-500 bg-white dark:bg-gray-900 dark:text-gray-100">
      {/* 🔷 Banner Section */}
      <section
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://car-images.bauersecure.com/wp-images/12942/061-tesla-model-3-2024-review.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center z-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Find Your Perfect Ride with{" "}
            <span className="text-blue-400">TravelEase</span>
          </h1>
          <Link
            to="/allVehicles"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-white font-semibold transition"
          >
            Explore All Vehicles
          </Link>
        </motion.div>
      </section>

      
      <section className="my-16 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold text-center mb-10"
        >
          Latest Vehicles
        </motion.h2>

        {vehicles.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No vehicles available.
          </p>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delayChildren: 0.2, staggerChildren: 0.15 },
              },
            }}
          >
            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle._id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {/* Vehicle Card with AllVehicles style */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105">
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
                      <FaCarSide className="text-blue-600 dark:text-blue-400" /> {vehicle.vehicleName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <FaBolt className="text-blue-600 dark:text-blue-400" /> {vehicle.location}
                    </p>
                    <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <FaBolt /> ${vehicle.pricePerDay}/day
                    </p>
                    <Link
                      to={`/vehicles/${vehicle._id}`}
                      className="mt-4 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      
      <section className="bg-gray-100 dark:bg-gray-800 py-14 transition-colors duration-300">
        <h2 className="text-3xl font-semibold text-center mb-10">Top Categories</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "SUV", icon: <FaCarSide size={40} className="text-blue-600 dark:text-blue-400" /> },
            { name: "Sedan", icon: <FaCarAlt size={40} className="text-blue-600 dark:text-blue-400" /> },
            { name: "Electric", icon: <FaBolt size={40} className="text-blue-600 dark:text-blue-400" /> },
            { name: "Van", icon: <FaShuttleVan size={40} className="text-blue-600 dark:text-blue-400" /> },
          ].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl w-56 text-center py-6 px-4 cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-3">{cat.icon}</div>
              <h3 className="text-xl font-bold">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="container mx-auto py-16 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold mb-6"
        >
          About TravelEase
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          TravelEase is your trusted vehicle booking and trip management platform. Explore,
          add, and manage your vehicles effortlessly with a user-friendly experience designed
          to make your travel easier, faster, and smarter.
        </motion.p>
      </section>
    </div>
  );
};

export default Home;
