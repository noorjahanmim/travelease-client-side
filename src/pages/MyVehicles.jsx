import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaCarSide, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

const MyVehicles = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = () => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(`https://travelease-vehicle-booking.vercel.app/models?userEmail=${user.email}`)
      .then((res) => setVehicles(res.data))
      .catch(() => toast.error("Failed to load vehicles"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    axios
      .delete(`https://travelease-vehicle-booking.vercel.app/models/${id}`)
      .then(() => {
        toast.success("Vehicle deleted!");
        fetchVehicles();
      })
      .catch(() => toast.error("Delete failed!"));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl mt-5 font-bold text-center mb-12 text-blue-700 dark:text-blue-400">
        My Vehicles
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          You haven’t added any vehicles yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
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
                  <FaCarSide className="text-blue-600 dark:text-blue-400" /> {vehicle.vehicleName}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" /> {vehicle.location}
                </p>

                <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <FaDollarSign /> ${vehicle.pricePerDay}/day
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Link
                    to={`/vehicles/${vehicle._id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/updateVehicle/${vehicle._id}`}
                    className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
