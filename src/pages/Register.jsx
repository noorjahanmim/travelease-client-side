// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import toast from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";

// const Register = () => {
//   const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const photoURL = e.target.photoURL.value;
//     const password = e.target.password.value;

//     // Password validation
//     if (!/[A-Z]/.test(password))
//       return toast.error("Password must include an uppercase letter!");
//     if (!/[a-z]/.test(password))
//       return toast.error("Password must include a lowercase letter!");
//     if (password.length < 6)
//       return toast.error("Password must be at least 6 characters!");

//     setLoading(true);
//     createUser(email, password)
//       .then(() => updateUserProfile(name, photoURL))
//       .then(() => {
//         toast.success("Account created successfully!");
//         navigate("/");
//       })
//       .catch(() => toast.error("Registration failed!"))
//       .finally(() => setLoading(false));
//   };

//   const handleGoogle = () => {
//     setLoading(true);
//     signInWithGoogle()
//       .then(() => {
//         toast.success("Registered with Google!");
//         navigate("/");
//       })
//       .catch(() => toast.error("Google signup failed!"))
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[80vh] px-4  transition-colors">
//       <div className="bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg w-full max-w-md transition-colors">
//         <h2 className="text-3xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
//           Register
//         </h2>
//         <form onSubmit={handleRegister} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             required
//             className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             name="photoURL"
//             placeholder="Photo URL"
//             required
//             className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             {loading ? "Creating..." : "Register"}
//           </button>
//         </form>

//         <button
//           onClick={handleGoogle}
//           className="mt-4 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//           disabled={loading}
//         >
//           <FcGoogle size={22} /> Continue with Google
//         </button>

//         <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { User, Mail, Lock, Image as ImageIcon, ArrowRight, CarFront } from "lucide-react";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    // Password validation logic
    if (!/[A-Z]/.test(password))
      return toast.error("Password must include an uppercase letter!");
    if (!/[a-z]/.test(password))
      return toast.error("Password must include a lowercase letter!");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters!");

    setLoading(true);
    createUser(email, password)
      .then(() => updateUserProfile(name, photoURL))
      .then(() => {
        toast.success(`Welcome to TravelEase, ${name}!`);
        navigate("/");
      })
      .catch(() => toast.error("Registration failed!"))
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success("Welcome aboard!");
        navigate("/");
      })
      .catch(() => toast.error("Google signup failed!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0a0f1a] transition-colors duration-500 overflow-hidden">
      
      {/* 🚀 Left Side: Brand Visuals (Matching Login Style) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 items-center justify-center overflow-hidden"
      >
        {/* High-quality background image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983')] bg-cover bg-center mix-blend-overlay opacity-40" />
        
        <div className="relative z-10 p-12 text-white text-center">
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mb-8 mx-auto border border-white/30"
          >
            <CarFront size={56} className="text-white" />
          </motion.div>
          <h2 className="text-6xl font-black tracking-tighter mb-6 leading-tight">
            Start Your <br /> Adventure.
          </h2>
          <p className="text-indigo-100 text-xl max-w-sm mx-auto font-medium opacity-80">
            Join the elite TravelEase community and unlock premium road experiences.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </motion.div>

      {/* 📝 Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center lg:text-left">
             {/* Mobile Logo Only */}
             <div className="lg:hidden flex justify-center mb-6">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <CarFront size={32} />
                </div>
             </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Join TravelEase</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium italic">Your premium journey starts with a simple click.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. John Doe"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Avatar Link (URL)</label>
              <div className="relative group">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input
                  type="text"
                  name="photoURL"
                  placeholder="https://..."
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-indigo-600 dark:text-white transition-all outline-none shadow-sm font-medium"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 transition-all hover:bg-indigo-700 disabled:opacity-70 mt-4"
            >
              {loading ? "Engines Starting..." : "Create Account"}
              {!loading && <ArrowRight size={20} />}
            </motion.button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-gray-400"><span className="bg-white dark:bg-[#0a0f1a] px-4">Or Quick Sign-Up</span></div>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-100 dark:border-white/5 py-4 rounded-2xl font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            <FcGoogle size={22} /> Register with Google
          </motion.button>

          <p className="mt-10 text-center text-gray-500 dark:text-gray-400 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-black hover:underline underline-offset-8">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;