import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCarSide, FaBolt, FaShuttleVan, FaCarAlt, FaArrowRight,
  FaShieldAlt, FaHeadset, FaGlobeAmericas, FaStar, FaMobileAlt,
  FaPlay, FaQuoteLeft, FaCheckCircle, FaHashtag
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);



  const slides = [
    {
      img: "https://car-images.bauersecure.com/wp-images/12942/061-tesla-model-3-2024-review.jpg",
      title: "Elevate Your Driving Experience",
      subtitle: "Discover the future of mobility with our premium electric and luxury fleet."
    },
    {
      img: "https://sm.pcmag.com/t/pcmag_me/review/2/2024-kia-n/2024-kia-niro-ev_8av1.1920.jpg",
      title: "Adventure Awaits Beyond the Horizon",
      subtitle: "Unleash the power of our off-road SUVs for your next great escape."
    }
  ];

  useEffect(() => {
    axios
      .get("https://travelease-vehicle-booking.vercel.app/models")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) return <LoadingSpinner />;

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-white dark:bg-[#0a0f1a] transition-colors duration-700 font-sans selection:bg-blue-500 selection:text-white">

      {/* 1. ULTRA HERO SECTION (FULL WIDTH) */}
<section className="relative h-[70vh] overflow-hidden bg-black">
  <AnimatePresence mode="wait">
    <motion.div
      key={activeSlide}
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4 }}
      className="absolute inset-0"
    >
      <img
        src={slides[activeSlide].img}
        className="w-full h-full object-cover"
        alt="hero"
      />
      <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
    </motion.div>
  </AnimatePresence>

  <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-3xl"
    >
      <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase text-white mb-6">
        Premium Vehicle Platform
      </span>

      <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white">
        {slides[activeSlide].title}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          TravelEase
        </span>
      </h1>

      <p className="text-lg md:text-xl text-white/80 mb-10">
        {slides[activeSlide].subtitle}
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/allVehicles"
          className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-400 
          rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition shadow-2xl shadow-blue-500/30 text-white"
        >
          Explore Vehicles <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  </div>

  <div className="absolute bottom-10 right-10 flex gap-3">
    {slides.map((_, i) => (
      <div
        key={i}
        className={`h-1 rounded-full transition-all ${
          i === activeSlide ? "w-12 bg-blue-500" : "w-4 bg-white/30"
        }`}
      />
    ))}
  </div>
</section>



      {/* 2. FLOATING STATS SECTION */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl p-10 rounded-[40px] shadow-2xl border border-gray-100 dark:border-white/5"
        >
          {[
            { label: "Elite Fleet", value: "250+", color: "text-blue-600" },
            { label: "Happy Travelers", value: "12k+", color: "text-cyan-500" },
            { label: "Cities Covered", value: "45+", color: "text-indigo-500" },
            { label: "User Rating", value: "4.9/5", color: "text-blue-400" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <h3 className={`text-4xl font-black mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.value}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tighter text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. LATEST VEHICLES - GRID 4 */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">The Collections</span>
            <h2 className="text-5xl font-black text-gray-900 dark:text-white">Our Exclusive <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">Latest Garage</span></h2>
          </motion.div>
          <Link to="/allVehicles" className="px-8 py-4 bg-gray-100 dark:bg-white/5 dark:text-white rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all">View Full Fleet</Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {vehicles.slice(0, 8).map((vehicle) => (
            <motion.div
              key={vehicle._id}
              variants={fadeInUp}
              whileHover={{ y: -15 }}
              className="relative group bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] p-4 border border-transparent hover:border-blue-500/30 transition-all duration-500 shadow-xl hover:shadow-blue-500/10"
            >
              <div className="relative h-64 overflow-hidden rounded-[2rem] mb-6">
                <img src={vehicle.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{vehicle.category}</span>
                </div>
              </div>
              <div className="px-4 pb-4">
                <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 truncate">{vehicle.vehicleName}</h4>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6"><FaGlobeAmericas className="text-blue-500" /> {vehicle.location}</div>
                <div className="flex justify-between items-center border-t border-gray-100 dark:border-white/5 pt-6">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Rate</p>
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">${vehicle.pricePerDay}<span className="text-xs font-normal text-gray-400">/day</span></span>
                  </div>
                  <Link to={`/vehicles/${vehicle._id}`} className="w-14 h-14 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-lg shadow-blue-500/20">
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. MODERN WHY CHOOSE US (CREATIVE LOOK) */}
      <section className="py-32 bg-[#f8faff] dark:bg-[#080d17] overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <motion.div
              initial={{ rotate: -5, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              className="relative z-10 p-6 bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/5"
            >
              <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070" className="rounded-[2.5rem]" />
              <div className="absolute -bottom-10 -right-10 bg-blue-600 p-10 rounded-[2.5rem] shadow-2xl text-white">
                <p className="text-5xl font-black mb-1">10+</p>
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Years of Luxury</p>
              </div>
            </motion.div>
          </div>
          <div className="space-y-10">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
              <h2 className="text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">Why High-End Travelers <br /> <span className="text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 bg-clip-text text-transparent font-extrabold">Choose TravelEase</span></h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">We don't just rent cars; we provide a gateway to your next great experience with unmatched precision and care.</p>
            </motion.div>
            <div className="grid gap-6">
              {[
                { icon: <FaShieldAlt />, title: "Uncompromised Safety", desc: "Military-grade encryption and comprehensive premium insurance." },
                { icon: <FaBolt />, title: "Hyper-Fast Booking", desc: "Confirm your luxury ride in less than 60 seconds." }
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 10 }} className="flex gap-6 p-8 bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-gray-50 dark:border-white/5 transition-all">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl text-blue-600">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKFLOW SECTION (CREATIVE STEPS) */}
      <section className="py-32 container mx-auto px-6 text-center">
        <h2 className="text-5xl font-black mb-20 text-gray-900 dark:text-white">Seamless Journey in <span className="text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 bg-clip-text text-transparent font-extrabold">3 Easy Steps</span></h2>
        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -z-10" />
          {[
            { step: "01", title: "Select Fleet", desc: "Choose from our curated 2026 models." },
            { step: "02", title: "Smart Booking", desc: "AI-powered quick verification process." },
            { step: "03", title: "Hit the Road", desc: "Enjoy your ride with 24/7 concierge." }
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="w-24 h-24 bg-white dark:bg-gray-900 shadow-2xl rounded-[2rem] flex items-center justify-center text-3xl font-black text-blue-600 mx-auto mb-8 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {s.step}
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-white">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-[250px] mx-auto text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS (GLASS DESIGN) */}
      <section className="py-32 bg-[#0a0f1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Voice of Our Members</h2>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="text-blue-500" />)}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((_, i) => (
              <motion.div key={i} className="p-10 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] hover:bg-white/10 transition-all">
                <FaQuoteLeft className="text-blue-500 text-4xl mb-8 opacity-50" />
                <p className="text-gray-300 text-lg italic leading-relaxed mb-10">"The booking experience was futuristic. I rented a Tesla for my business trip and everything from pick-up to drop-off was automated and smooth."</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white">JD</div>
                  <div>
                    <h5 className="text-white font-black">Alex Rivera</h5>
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Tech Entrepreneur</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. APP PROMO (MODERN GRADIENT) */}
      <section className="py-32 container mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[4rem] p-16 flex flex-col lg:flex-row items-center gap-20 shadow-[0_50px_100px_-20px_rgba(37,99,235,0.4)] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <FaMobileAlt size={400} />
          </div>
          <div className="lg:w-1/2 text-white relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">TravelEase <br /> In Your Pocket.</h2>
            <p className="text-blue-100 text-xl mb-12 font-light">Get exclusive early access to new fleet arrivals and 24/7 priority support with our mobile app.</p>
            <div className="flex flex-wrap gap-4">



              <div className="flex gap-4">
                {/* App Store Button */}
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
                >
                  <FaApple size={22} /> App Store
                </a>

                {/* Play Store Button */}
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/20 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <FaGooglePlay size={20} /> Play Store
                </a>
              </div>

            </div>
          </div>
          <div className="lg:w-1/2">
            <motion.img
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              src="https://cabsware.com/wp-content/uploads/2025/11/2.webp"
              className="w-full max-w-md mx-auto rounded-4xl"
            />
          </div>
        </div>
      </section>

      {/* 8. PARTNER LOGOS (MINIMALIST) */}
      <section className="py-20 opacity-30 dark:opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-16 md:gap-32">
          {["TESLA", "BMW", "AUDI", "NISSAN", "TOYOTA"].map(brand => (
            <span key={brand} className="text-3xl font-black tracking-[0.5em] text-gray-500 dark:text-white">{brand}</span>
          ))}
        </div>
      </section>

      {/* 9. NEWSLETTER (THE FINALE) */}
      <section className="py-20 bg-white dark:bg-[#0a0f1a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">



        </div>
      </section>

    </div>
  );
};

export default Home;


