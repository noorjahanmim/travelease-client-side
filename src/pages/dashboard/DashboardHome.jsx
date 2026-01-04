import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Car, CalendarCheck, Inbox } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const DashboardHome = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axios
      .get(
        `https://travelease-vehicle-booking.vercel.app/dashboard/overview?email=${user.email}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Dashboard API error:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading || !data) return <LoadingSpinner />;

  const { stats, charts, recentBookings } = data;

  const monthMap = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const chartData = charts.map((item) => ({
    month: monthMap[item._id],
    vehicles: item.count,
  }));

  return (
    <div className="p-6 space-y-10">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Vehicles Added" value={stats.vehiclesCount} icon={<Car />} />
        <StatCard title="My Bookings" value={stats.myBookingsCount} icon={<CalendarCheck />} />
        <StatCard title="Bookings on My Vehicles" value={stats.receivedBookingsCount} icon={<Inbox />} />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Vehicles Added Per Month
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h3>

        <table className="w-full text-left">
          <thead className="border-b dark:border-gray-700">
            <tr>
              <th>Vehicle</th>
              <th>Email</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr key={b._id} className="border-b dark:border-gray-700">
                <td>{b.vehicleName}</td>
                <td>{b.userEmail}</td>
                <td>${b.pricePerDay}</td>
                <td>{new Date(b.bookedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex items-center gap-4">
    <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

export default DashboardHome;
