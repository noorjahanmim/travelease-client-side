import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Call
    toast.success("TravelEase has received your request!", {
      duration: 4000,
      icon: '🚗',
      style: {
        borderRadius: '15px',
        background: '#1e293b',
        color: '#fff',
      },
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white dark:bg-[#0a0f1a] min-h-screen transition-colors duration-500">
      <Toaster />
      
      {/* 🌟 Luxury Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-400/5 -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 text-center"
        >
          <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4 block">Contact Us</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            Let's Start Your <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Journey</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have a specific request or need a custom booking? Our luxury concierge team is ready to assist you.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 📞 Contact Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {[
              { icon: <Mail />, title: "Email Us", val: "support@travelease.com", color: "text-blue-600" },
              { icon: <Phone />, title: "Call Us", val: "+880 17XX-XXXXXX", color: "text-indigo-600" },
              { icon: <MapPin />, title: "Concierge Office", val: "Gulshan, Dhaka, BD", color: "text-cyan-600" },
              { icon: <Clock />, title: "Availability", val: "24/7 Premium Support", color: "text-emerald-600" }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 flex items-center gap-5 hover:scale-105 transition-transform">
                <div className={`bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.val}</p>
                </div>
              </div>
            ))}

            {/* 💎 Special VIP Support Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <Globe size={40} className="mb-4 opacity-30 group-hover:rotate-45 transition-transform duration-700" />
                <h3 className="text-2xl font-black mb-2">Corporate?</h3>
                <p className="text-blue-100 text-sm mb-6 opacity-80">Looking for long-term fleet management for your business?</p>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm font-bold hover:bg-white hover:text-blue-600 transition-all">
                  Contact Sales
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* 📝 Modern Glassmorphic Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-gray-50 dark:bg-[#0d1425] rounded-[3rem] p-8 md:p-16 border border-gray-100 dark:border-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full bg-white dark:bg-white/5 border-none rounded-2xl h-16 px-6 focus:ring-2 focus:ring-blue-600 dark:text-white transition-all outline-none shadow-sm"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    className="w-full bg-white dark:bg-white/5 border-none rounded-2xl h-16 px-6 focus:ring-2 focus:ring-blue-600 dark:text-white transition-all outline-none shadow-sm"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Inquiry about..."
                  className="w-full bg-white dark:bg-white/5 border-none rounded-2xl h-16 px-6 focus:ring-2 focus:ring-blue-600 dark:text-white transition-all outline-none shadow-sm"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your trip..."
                  className="w-full bg-white dark:bg-white/5 border-none rounded-[2rem] min-h-[180px] p-6 focus:ring-2 focus:ring-blue-600 dark:text-white transition-all outline-none shadow-sm resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all"
              >
                <Send size={20} />
                Send Request
              </motion.button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Contact;