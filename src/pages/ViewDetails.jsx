import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, User, Tag, Calendar, CheckCircle2, 
  ChevronRight, Star, ShieldCheck, Zap, Fuel, Users 
} from "lucide-react";

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
  if (!vehicle) return <p className="text-center mt-20 text-red-500 font-bold">Vehicle not found!</p>;

  const handleBooking = () => {
    if (!user) {
      toast.error("Please log in to book!");
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
      .then(() => toast.success("Trip Booked Successfully!"))
      .catch(() => toast.error("Booking failed!"));
  };

  return (
    <div className="bg-[#fcfcfd] dark:bg-[#0a0f1a] min-h-screen pt-28 pb-20 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* 🌟 Top Hero Section: Split View */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left: Media Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl border dark:border-white/5">
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" /> 4.9 (120+ Reviews)
                </span>
              </div>
            </div>
            
            {/* Small Media Thumbnails (Simulated) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-800 overflow-hidden cursor-pointer hover:ring-2 ring-indigo-500 transition-all opacity-70 hover:opacity-100">
                   <img src={vehicle.coverImage} className="w-full h-full object-cover grayscale hover:grayscale-0" />
                </div>
              ))}
              <div className="h-24 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs text-center p-2 cursor-pointer">
                +12 More Photos
              </div>
            </div>
          </motion.div>

          {/* Right: Essential Info & Booking */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4">
              <ShieldCheck size={16} /> Verified TravelEase Vehicle
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter">
              {vehicle.vehicleName}
            </h1>
            
            <div className="flex flex-wrap gap-6 mb-8">
               <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <MapPin size={20} className="text-indigo-500" /> {vehicle.location}
               </div>
               <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <Tag size={20} className="text-indigo-500" /> {vehicle.category}
               </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              {vehicle.description || "Experience the ultimate comfort and performance with our premium vehicle. Perfect for long weekend getaways or professional business trips."}
            </p>

            {/* Price Box */}
            
          </motion.div>
        </div>

        {/* 🛠 Section 2: Technical Specifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-black mb-8 dark:text-white">Vehicle Specifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Zap />, label: "Power", value: "450 HP" },
              { icon: <Fuel />, label: "Fuel Type", value: "Hybrid/Petrol" },
              { icon: <Users />, label: "Capacity", value: "5 Seats" },
              { icon: <Calendar />, label: "Model Year", value: "2024" }
            ].map((spec, i) => (
              <div key={i} className="p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl shadow-sm hover:border-indigo-500 transition-colors group">
                <div className="text-indigo-500 mb-4 group-hover:scale-110 transition-transform">{spec.icon}</div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{spec.label}</p>
                <p className="text-gray-900 dark:text-white font-black text-lg">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 📋 Section 3: Overview & Rules */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-black mb-6 dark:text-white">Why Choose This Vehicle?</h3>
            <ul className="space-y-4">
              {["Full insurance coverage included", "Clean & Sanitized before every trip", "24/7 Roadside assistance", "Instant booking confirmation"].map((rule, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-medium">
                  <CheckCircle2 size={18} className="text-emerald-500" /> {rule}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-black mb-6 dark:text-white">Owner Information</h3>
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-black text-xl">
                 {vehicle.owner?.charAt(0) || "O"}
               </div>
               <div>
                  <h4 className="font-black text-gray-900 dark:text-white">{vehicle.owner}</h4>
                  <p className="text-gray-500 text-sm">Member since 2022 • Response time: 5 mins</p>
               </div>
            </div>
          </div>
        </div>

        {/* ⭐ Section 4: Reviews (Simulated) */}
        <div className="border-t dark:border-white/10 pt-16">
          <div className="flex justify-between items-end mb-10">
            <div>
               <h3 className="text-3xl font-black dark:text-white">Traveler Reviews</h3>
               <p className="text-gray-500 mt-2 font-medium">See what others are saying about their experience.</p>
            </div>
            <button className="text-indigo-600 font-black hover:underline underline-offset-8">See All Reviews</button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((r) => (
               <div key={r} className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-indigo-500/30 transition-all">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-yellow-500 text-yellow-500" />)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic mb-6">"Absolute beast of a car! The pickup was smooth and the host was very professional. Highly recommended!"</p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-300" />
                     <p className="font-bold dark:text-white text-sm">Alex Johnson</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ViewDetails;