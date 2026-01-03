import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { 
  CarFront, DollarSign, MapPin, Image as ImageIcon, 
  FileText, Layers, User as UserIcon, PlusCircle, Sparkles 
} from "lucide-react";

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
      availability: "Available" // Default status
    };

    setLoading(true);
    axios
      .post("https://travelease-vehicle-booking.vercel.app/models", vehicle)
      .then(() => {
        toast.success("🚀 Your vehicle is now live!");
        form.reset();
      })
      .catch(() => toast.error("❌ Something went wrong!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0f1a] py-16 px-4 sm:px-6 transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* ✨ Header Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 mb-4"
          >
            <CarFront size={32} />
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">List Your Vehicle</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Reach thousands of travelers by adding your fleet to TravelEase.</p>
        </div>

        {/* 📝 Main Form Card */}
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl shadow-indigo-500/5 rounded-[2.5rem] overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            
            {/* 📍 Section: Basic Info */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Vehicle Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Vehicle Model Name</label>
                <div className="relative group">
                  <CarFront className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    name="vehicleName"
                    type="text"
                    placeholder="e.g. Tesla Model S"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none font-medium"
                  />
                </div>
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Owner / Agency Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    name="owner"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none font-medium"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                <div className="relative group">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <select
                    name="category"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none font-medium appearance-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-gray-900">Select Category</option>
                    <option value="SUV" className="dark:bg-gray-900">SUV / Crossover</option>
                    <option value="Sedan" className="dark:bg-gray-900">Luxury Sedan</option>
                    <option value="Electric" className="dark:bg-gray-900">Electric Vehicle</option>
                    <option value="Van" className="dark:bg-gray-900">Family Van</option>
                  </select>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Rental Price (USD / Day)</label>
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    name="pricePerDay"
                    type="number"
                    placeholder="99.00"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 📍 Location & Image */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Pickup Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    name="location"
                    type="text"
                    placeholder="e.g. Dhaka, Bangladesh"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Cover Image URL</label>
                <div className="relative group">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    name="coverImage"
                    type="text"
                    placeholder="https://image-link.com/car.jpg"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 📝 Description */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Vehicle Description</label>
              <div className="relative group">
                <FileText className="absolute left-4 top-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Tell us about the features, condition, and rules of the vehicle..."
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none font-medium resize-none"
                ></textarea>
              </div>
            </div>

            {/* 🚀 Submit Button */}
            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <PlusCircle size={24} />
                    Confirm & Publish Vehicle
                  </>
                )}
              </motion.button>
              
              <p className="text-center text-gray-400 text-xs mt-6 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-indigo-500" />
                By publishing, you agree to TravelEase terms of service.
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddVehicle;