import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing vehicle data by ID
  useEffect(() => {
    axios
      .get(`https://travelease-vehicle-booking.vercel.app/models/${id}`)
      .then(res => setVehicle(res.data))
      .catch(() => toast.error("Failed to load vehicle data"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedVehicle = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      pricePerDay: parseFloat(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
    };

    axios
      .put(`https://travelease-vehicle-booking.vercel.app/models/${id}`, updatedVehicle)
      .then(() => {
        toast.success("Vehicle updated successfully!");
        navigate("/myVehicles");
      })
      .catch(() => toast.error("Update failed!"));
  };

  if (loading) return <LoadingSpinner />;

  if (!vehicle)
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 py-20">
        Vehicle not found.
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-700 mt-10  dark:text-blue-400">
        Update Vehicle Information
      </h2>
      <form
        onSubmit={handleUpdate}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6 transition-colors duration-300"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="vehicleName"
            defaultValue={vehicle.vehicleName}
            placeholder="Vehicle Name"
            required
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            name="owner"
            defaultValue={vehicle.owner}
            placeholder="Owner Name"
            required
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            name="category"
            defaultValue={vehicle.category}
            required
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Electric">Electric</option>
            <option value="Van">Van</option>
          </select>
          <input
            name="pricePerDay"
            type="number"
            defaultValue={vehicle.pricePerDay}
            placeholder="Price Per Day"
            required
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            name="location"
            defaultValue={vehicle.location}
            placeholder="Location"
            required
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            name="availability"
            defaultValue={vehicle.availability}
            required
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
        </div>

        <input
          name="coverImage"
          defaultValue={vehicle.coverImage}
          placeholder="Cover Image URL"
          required
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
        <textarea
          name="description"
          defaultValue={vehicle.description}
          placeholder="Description"
          required
          rows="4"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
