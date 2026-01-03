import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast, Toaster } from "react-hot-toast";

const BookVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [bookingLoading, setBookingLoading] = useState({}); // individual button loading state

  useEffect(() => {
    fetch("https://travelease-vehicle-booking.vercel.app/models")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  }, []);

  const handleBook = async (vehicleId) => {
    setBookingLoading((prev) => ({ ...prev, [vehicleId]: true }));

    const bookingData = {
      vehicleId,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      pickupLocation: "Default Location",
      userEmail: "testuser@example.com", // replace with actual logged in user email
    };

    try {
      const res = await fetch(
        "https://travelease-vehicle-booking.vercel.app/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );
      if (!res.ok) throw new Error("Booking failed");

      toast.success("Vehicle booked successfully!");
    } catch (err) {
      toast.error("Booking failed. Try again!");
      console.error(err);
    } finally {
      setBookingLoading((prev) => ({ ...prev, [vehicleId]: false }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Toaster position="top-right" reverseOrder={false} />
      {vehicles.map((vehicle) => (
        <motion.div
          key={vehicle._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow hover:shadow-lg hover:scale-105 transition-transform"
        >
          {/* Vehicle Image */}
          <img
            src={vehicle.coverImage}
            alt={vehicle.vehicleName || vehicle.name}
            className="h-60 w-full object-cover"
          />

          <div className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {vehicle.vehicleName || vehicle.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {vehicle.category || vehicle.model} • {vehicle.location || "N/A"}
              </p>
              <p className="text-blue-600 font-semibold mt-2">
                ${vehicle.pricePerDay || vehicle.price}/day
              </p>
              {vehicle.createdAt && (
                <p className="text-xs text-gray-400 mt-1">
                  Added on {format(new Date(vehicle.createdAt), "PP")}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              {/* View Details */}
              <a
                href={`/vehicles/${vehicle._id}`}
                className="flex-1 text-center py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold"
              >
                View Details
              </a>

              {/* Book Now */}
              <button
                onClick={() => handleBook(vehicle._id)}
                disabled={bookingLoading[vehicle._id]}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {bookingLoading[vehicle._id] ? "Booking..." : "Book Now"}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BookVehicles;
