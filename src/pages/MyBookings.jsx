import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { format } from "date-fns";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axios
      .get(`https://travelease-vehicle-booking.vercel.app/myBookings?email=${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold text-center mt-15 mb-8 text-gray-800 dark:text-gray-100">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You haven’t booked any vehicles yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Vehicle</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price/Day</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Booked On</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={booking.coverImage}
                      alt={booking.vehicleName}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {booking.vehicleName}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {booking.category}
                  </td>
                  <td className="py-3 px-4 text-blue-600 dark:text-blue-400 font-semibold">
                    ${booking.pricePerDay}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {booking.location}
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                    {booking.createdAt
                      ? format(new Date(booking.createdAt), "PP")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
