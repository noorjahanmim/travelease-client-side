import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { FaCarSide, FaDollarSign, FaMapMarkerAlt, FaUpload, FaEdit } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useState } from "react";

const AddVehicle = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const vehicle = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      pricePerDay: parseFloat(form.pricePerDay.value),
      location: form.location.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    axios
      .post("https://travelease-vehicle-booking.vercel.app/models", vehicle)
      .then(() => {
        toast.success("🚗 Vehicle added successfully!");
        form.reset();
      })
      .catch(() => toast.error("❌ Failed to add vehicle."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-12 px-4 transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400 flex justify-center items-center gap-2">
            <FaCarSide /> Add a New Vehicle
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Fill in the details below to add your vehicle to TravelEase
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Vehicle Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Vehicle Name
              </label>
              <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
                <FaCarSide className="text-blue-600 dark:text-blue-400" />
                <input
                  name="vehicleName"
                  placeholder="Enter vehicle name"
                  required
                  className="bg-white dark:bg-gray-700 w-full outline-none text-gray-900 dark:text-gray-100 rounded-md"
                />
              </div>
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Owner Name
              </label>
              <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
                <FaEdit className="text-blue-600 dark:text-blue-400" />
                <input
                  name="owner"
                  placeholder="Enter owner name"
                  required
                  className="bg-white dark:bg-gray-700 w-full outline-none text-gray-900 dark:text-gray-100 rounded-md"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Category
              </label>
              <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
                <MdCategory className="text-blue-600 dark:text-blue-400" />
                <select
                  name="category"
                  required
                  className="bg-white dark:bg-gray-700 w-full outline-none text-gray-900 dark:text-gray-100 rounded-md"
                >
                  <option value="">Select Category</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Electric">Electric</option>
                  <option value="Van">Van</option>
                </select>
              </div>
            </div>

            {/* Price Per Day */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Price Per Day ($)
              </label>
              <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
                <FaDollarSign className="text-blue-600 dark:text-blue-400" />
                <input
                  name="pricePerDay"
                  type="number"
                  placeholder="Enter price per day"
                  required
                  className="bg-white dark:bg-gray-700 w-full outline-none text-gray-900 dark:text-gray-100 rounded-md"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Location
              </label>
              <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
                <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
                <input
                  name="location"
                  placeholder="Enter location"
                  required
                  className="bg-white dark:bg-gray-700 w-full outline-none text-gray-900 dark:text-gray-100 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Cover Image URL
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
              <FaUpload className="text-blue-600 dark:text-blue-400" />
              <input
                name="coverImage"
                placeholder="Paste image URL"
                required
                className="bg-white dark:bg-gray-700 w-full outline-none text-gray-900 dark:text-gray-100 rounded-md"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write a short description about the vehicle..."
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-70 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
