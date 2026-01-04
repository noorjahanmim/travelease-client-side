import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Swal from "sweetalert2";

import { FaCarSide, FaMapMarkerAlt, FaDollarSign, FaPlus } from "react-icons/fa"; 
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyVehicles = () => {
  const { user } = useAuth(); // Logged-in user
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate hook

  // Fetch vehicles owned by logged-in user only
  const fetchVehicles = () => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(
        `https://travelease-vehicle-booking.vercel.app/models?userEmail=${user.email}`
      )
      .then((res) => setVehicles(res.data))
      .catch(() =>
        Swal.fire("Error", "Failed to load your vehicles", "error")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  // SweetAlert2 Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://travelease-vehicle-booking.vercel.app/models/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your vehicle has been deleted.",
              icon: "success",
              timer: 2000,
            });
            fetchVehicles();
          })
          .catch(() => {
            Swal.fire(
              "Failed!",
              "Something went wrong while deleting.",
              "error"
            );
          });
      }
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8 mt-20">
        <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400">
          My Vehicles
        </h2>

        {/* Add Vehicle Button */}
        <button
          onClick={() => navigate("/addVehicle")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
        >
          <FaPlus /> Add Vehicle
        </button>
      </div>

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
              {/* Vehicle Image */}
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

              {/* Vehicle Info */}
              <div className="p-5 space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <FaCarSide className="text-blue-600 dark:text-blue-400" />{" "}
                  {vehicle.vehicleName}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />{" "}
                  {vehicle.location}
                </p>

                <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <FaDollarSign /> {vehicle.pricePerDay}/day
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link
                    to={`/vehicles/${vehicle._id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/dashboard/update-vehicle/${vehicle._id}`}
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
