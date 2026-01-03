// import React from "react";
// import { motion, useScroll } from "framer-motion";
// import { Shield, Globe, Star, Users } from "lucide-react"; 
// import { Link } from "react-router-dom";
// // import aboutImg from "../../assets/about-car.jpg"; 

// const teamMembers = [
//   { name: "Noor Jahan Rahman Mim", role: "Founder", img: "https://i.pinimg.com/736x/56/28/11/562811a72efe837a85bdc4b84a7e63d4.jpg" },
//   { name: "Musfika Rahman Bushra", role: "Developer", img: "https://i.pinimg.com/736x/22/eb/74/22eb74a3001be3546dc36e4e1652d950.jpg" },
//   { name: "Israth Jahan Sadia", role: "Designer", img: "https://i.pinimg.com/736x/32/13/1d/32131d770c0829188810bd492f04932c.jpg" },
//   { name: "Minhazur Rahman Siyam", role: "Support", img: "https://i.pinimg.com/736x/a9/0a/21/a90a210e53399ee804ef3c8a551cabfe.jpg" },
// ];

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const Counter = ({ value, label }) => (
//   <motion.div
//     whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
//     viewport={{ once: true }}
//     className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-100 dark:border-gray-700"
//   >
//     <h3 className="text-4xl font-bold text-blue-600 mb-2">{value}+</h3>
//     <p className="text-gray-600 dark:text-gray-300 font-medium">{label}</p>
//   </motion.div>
// );

// const About = () => {
//   const { scrollYProgress } = useScroll();

//   return (
//     <div className="relative dark:bg-gray-900 text-gray-800 dark:text-gray-100">
//       {/* Scroll Progress */}
//       <motion.div
//         style={{ scaleX: scrollYProgress }}
//         className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
//       />

//       {/* Vision Section */}
//       <section className="py-20 max-w-6xl mx-auto px-6">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <img
//               src=""
//               alt="TravelEase Vision"
//               className="rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-700"
//             />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
//               Driving the Future of{" "}
//               <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
//                 Vehicle Booking
//               </span>
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//               TravelEase is built to make your journeys smoother, safer, and
//               smarter. From luxury sedans to rugged SUVs, we connect you with
//               the perfect ride instantly.
//             </p>
//             <ul className="space-y-4 pt-2">
//               {["Fully Insured Rides", "Global Destinations", "24/7 Support"].map(
//                 (item, i) => (
//                   <li
//                     key={i}
//                     className="flex items-center gap-3 font-semibold text-gray-700 dark:text-gray-200"
//                   >
//                     <Shield className="text-blue-600" size={18} /> {item}
//                   </li>
//                 )
//               )}
//             </ul>
//           </motion.div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="bg-gray-50 dark:bg-gray-800 py-16">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <Counter value={1200} label="Vehicles Listed" />
//           <Counter value={5000} label="Bookings Completed" />
//           <Counter value={150} label="Destinations Covered" />
//           <Counter value={4.9} label="Average Rating" />
//         </div>
//       </section>

//       {/* Story */}
//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid md:grid-cols-2 gap-12 items-center"
//         >
//           <div className="space-y-6">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
//               🚘 Travel Made Simple
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-lg">
//               From browsing vehicles to instant booking, TravelEase ensures
//               every step is effortless and enjoyable.
//             </p>
//             <div className="grid grid-cols-1 gap-4 pt-4">
//               {[
//                 { icon: "⚡", text: "Book in seconds" },
//                 { icon: "🌍", text: "Explore global destinations" },
//                 { icon: "🛡️", text: "Safe & verified rides" },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-colors"
//                 >
//                   <span className="text-xl">{item.icon}</span>
//                   <span className="text-sm font-medium">{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070"
//             alt="TravelEase Story"
//             className="rounded-xl shadow-lg"
//           />
//         </motion.div>
//       </section>

//       {/* Team */}
//       <section className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-24">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               🤝 Meet Our Team
//             </h2>
//             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
//               The passionate people behind TravelEase, making every journey
//               possible.
//             </p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-gray-700 group"
//               >
//                 <img
//                   src={member.img}
//                   alt={member.name}
//                   className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-white shadow-md mb-6"
//                 />
//                 <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-1">
//                   {member.name}
//                 </h3>
//                 <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
//                   {member.role}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 text-center border border-gray-100 dark:border-gray-700"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             🚀 Ready to Start Your Journey?
//           </h2>

//           <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
//             Whether you’re planning a family trip or a business ride,{" "}
//             <span className="font-bold text-blue-600"> TravelEase </span> is the
//             right place to begin. Book your vehicle today and enjoy a safe,
//             stylish, and seamless travel experience.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {/* Explore Vehicles */}
//             <Link
//               to="/allVehicles"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition"
//             >
//               Explore Vehicles
//             </Link>

//             {/* Contact Us */}
//             <Link
//               to="/contact"
//               className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-lg font-bold transition"
//             >
//               Contact Us
//             </Link>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// export default About;


import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Globe, Zap, Crown, CheckCircle, ArrowRight } from "lucide-react"; 
import { Link } from "react-router-dom";

const About = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const coreValues = [
    { 
      title: "Uncompromising Safety", 
      desc: "Every vehicle undergoes a 50-point safety inspection before every trip.",
      icon: <Shield className="text-blue-500" size={32} />,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      title: "Premium Fleet", 
      desc: "Only the latest models from the world's most trusted luxury brands.",
      icon: <Crown className="text-amber-500" size={32} />,
      color: "from-amber-500/20 to-yellow-500/20"
    },
    { 
      title: "Instant Mobility", 
      desc: "One-tap booking system designed for the modern, fast-paced world.",
      icon: <Zap className="text-purple-500" size={32} />,
      color: "from-purple-500/20 to-pink-500/20"
    },
    { 
      title: "Global Standards", 
      desc: "International quality service available across all major cities in Bangladesh.",
      icon: <Globe className="text-emerald-500" size={32} />,
      color: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  return (
    <div className="bg-white dark:bg-[#0a0f1a] transition-colors duration-500 overflow-hidden">
      {/* 1. Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 origin-left z-50"
      />

      {/* 2. Hero Section with Floating Elements */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800"
          >
            <span className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">
              Since 2015 • Luxury Travel
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter"
          >
            The Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Seamless Travel
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium"
          >
            TravelEase isn’t just a rental service; it’s a commitment to excellence, 
            combining cutting-edge technology with high-end hospitality.
          </motion.p>
        </div>

        {/* Floating Background Shapes */}
        <motion.div style={{ y: y1 }} className="absolute top-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </section>

      {/* 3. Core Values Grid (Instead of Team) */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black dark:text-white mb-4">Our Core Philosophy</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${value.color} border border-white dark:border-white/5 shadow-xl backdrop-blur-sm group transition-all`}
            >
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-xl font-black dark:text-white mb-3">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Luxury Experience Section (Parallax) */}
      <section className="py-24 bg-gray-50 dark:bg-[#0d1425]">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-black dark:text-white leading-[1.1]">
              Elevating the <br /> 
              <span className="text-blue-600 underline decoration-indigo-500/30">Standard of Comfort</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              We believe that the journey is just as important as the destination. 
              Our service is designed to remove every friction point, leaving you 
              with nothing but the pleasure of the road.
            </p>
            
            <div className="space-y-4">
              {["Smart Mobile Integration", "Real-time Vehicle Tracking", "No Hidden Charges"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 font-bold dark:text-gray-200">
                  <CheckCircle className="text-blue-600" size={20} />
                  {text}
                </div>
              ))}
            </div>
            
            <Link to="/allVehicles" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Discover Our Fleet <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-10" />
            <img 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070" 
              alt="Driving experience" 
              className="relative rounded-[3rem] shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>
      </section>

      {/* 5. Minimal CTA Section */}
      <section className="py-24 px-6 text-center">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Drive Your Story.</h2>
            <p className="text-blue-100 text-lg mb-10 opacity-80">Join 50,000+ happy travelers who trust TravelEase for their journeys.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/allVehicles" className="px-10 py-4 bg-white text-blue-700 font-black rounded-2xl hover:bg-gray-100 transition-all">
                Get Started
              </Link>
              <Link to="/contact" className="px-10 py-4 bg-blue-500/20 backdrop-blur-md border border-white/30 text-white font-black rounded-2xl hover:bg-white/10 transition-all">
                Talk to Us
              </Link>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </section>
    </div>
  );
};

export default About;