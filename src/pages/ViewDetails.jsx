import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const ViewDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://travelease-vehicle-booking.vercel.app/models/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => toast.error("Failed to load vehicle details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!vehicle)
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-medium">
        Vehicle not found!
      </p>
    );

  const handleBooking = () => {
    if (!user) {
      toast.error("Please log in to book this vehicle!");
      navigate("/login");
      return;
    }

    const bookingData = {
      vehicleId: vehicle._id,
      vehicleName: vehicle.vehicleName,
      userEmail: user.email,
      ownerEmail: vehicle.userEmail,
      pricePerDay: vehicle.pricePerDay,
      coverImage: vehicle.coverImage,
      bookedAt: new Date().toISOString(),
    };

    axios
      .post("https://travelease-vehicle-booking.vercel.app/bookings", bookingData)
      .then(() => toast.success("Booking successful!"))
      .catch(() => toast.error("Booking failed!"));
  };

  return (
    <div className="pt-24 pb-10 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
        {/* Vehicle Image */}
        <img
          src={vehicle.coverImage}
          alt={vehicle.vehicleName}
          className="w-full h-96 object-cover"
        />

        {/* Vehicle Info */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {vehicle.vehicleName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            <span className="font-semibold">Owner:</span> {vehicle.owner}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            <span className="font-semibold">Location:</span> {vehicle.location}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            <span className="font-semibold">Category:</span>{" "}
            {vehicle.category}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <span className="font-semibold">Availability:</span>{" "}
            <span
              className={
                vehicle.availability === "Available"
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {vehicle.availability}
            </span>
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {vehicle.description}
          </p>

          {/* Price & Book Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <h2 className="text-2xl font-semibold text-blue-600">
              ${vehicle.pricePerDay}/day
            </h2>
            <button
              onClick={handleBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
