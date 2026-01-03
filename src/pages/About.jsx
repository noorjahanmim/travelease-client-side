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
            className="text-5xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter"
          >
            The Art of <br />
            <span className="font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 bg-clip-text text-transparent font-extrabold">
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