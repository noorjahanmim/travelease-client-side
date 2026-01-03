import { motion } from "framer-motion";

/* ✅ Tailwind-safe color map */
const accentClasses = {
  blue: "text-blue-600",
  emerald: "text-emerald-600",
  violet: "text-violet-600",
  amber: "text-amber-600",
};

const StatCard = ({ title, value, accent = "blue" }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {title}
    </p>
    <p
      className={`mt-2 text-3xl font-bold ${
        accentClasses[accent] || accentClasses.blue
      }`}
    >
      {value}
    </p>
  </div>
);

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Overview
      </h1>

      {/* 🔹 Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Vehicles" value="12" />
        <StatCard title="Active Bookings" value="5" accent="emerald" />
        <StatCard title="Revenue (This Month)" value="$1,240" accent="violet" />
        <StatCard title="Avg. Rating" value="4.8" accent="amber" />
      </div>

      {/* 🔹 Charts Section (placeholder – backend data দিয়ে পরে connect করবে) */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 h-72"
        >
          <p className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Bookings Trend
          </p>
          <div className="h-full grid place-items-center text-gray-400">
            Chart goes here
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 h-72"
        >
          <p className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Vehicle Categories
          </p>
          <div className="h-full grid place-items-center text-gray-400">
            Chart goes here
          </div>
        </motion.div>
      </div>

      {/* 🔹 Data Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            Recent Bookings
          </p>
          <input
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm outline-none"
            placeholder="Search..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Vehicle</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  vehicle: "Tesla Model 3",
                  user: "john@doe.com",
                  date: "2026-01-02",
                  status: "Confirmed",
                },
                {
                  vehicle: "Toyota RAV4",
                  user: "sara@mail.com",
                  date: "2026-01-03",
                  status: "Pending",
                },
              ].map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-100 dark:border-gray-700"
                >
                  <td className="px-4 py-3">{r.vehicle}</td>
                  <td className="px-4 py-3">{r.user}</td>
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
