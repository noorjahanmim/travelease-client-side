import { Link } from "react-router-dom";
import { format } from "date-fns";

const VehicleCard = ({ vehicle }) => {
  const { _id, vehicleName, category, pricePerDay, location, coverImage, createdAt } = vehicle;

  return (
    <div className=" hover:shadow-lg  p-4 bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform">
      <img src={coverImage} alt={vehicleName} className="h-60 w-full object-cover rounded" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{vehicleName}</h3>
        <p className="text-sm text-gray-500">{category} • {location}</p>
        <p className="text-blue-600 font-semibold mt-2">${pricePerDay}/day</p>
        <p className="text-xs text-gray-400 mt-1">Added on {format(new Date(createdAt), "PP")}</p>

        <Link
          to={`/vehicles/${_id}`}
          className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
