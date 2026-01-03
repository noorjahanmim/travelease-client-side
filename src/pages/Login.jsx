// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import toast from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc"

// const Login = () => {
//   const { signInUser, signInWithGoogle } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";
  

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       await signInUser(email, password);
//       toast.success("Login successful!");
//       navigate(from, { replace: true });
//     } catch (err) {
//       toast.error("Invalid credentials!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       await signInWithGoogle();
//       toast.success("Logged in with Google!");
//       navigate(from, { replace: true });
//     } catch (err) {
//       toast.error("Google login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  px-4">
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-md p-8">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
//           Welcome Back
//         </h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p
//           className="mt-4 text-right text-blue-600 dark:text-blue-400 cursor-pointer underline"
        
//         >
//           Forgot Password?
//         </p>


//         <button
//           onClick={handleGoogleLogin}
//           className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-3 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//         >
//           <FcGoogle size={22} /> Continue with Google
//         </button>

//         <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-blue-600 dark:text-blue-400 underline font-medium"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, CarFront } from "lucide-react";

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      toast.success("Welcome back to TravelEase!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0a0f1a] font-sans">
      
      {/* 🚀 Left Side: Brand Visuals (Visible on Desktop) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative bg-blue-600 items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-40" />
        
        <div className="relative z-10 p-12 text-white">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8"
          >
            <CarFront size={40} className="text-white" />
          </motion.div>
          <h2 className="text-6xl font-black tracking-tighter mb-6 leading-tight">
            Elevate Your <br /> Journey.
          </h2>
          <p className="text-blue-100 text-xl max-w-md font-medium opacity-80">
            Log in to access your premium fleet, manage bookings, and explore new horizons.
          </p>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </motion.div>

      {/* 📝 Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <CarFront size={28} />
             </div>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Please enter your details to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all outline-none shadow-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all outline-none shadow-sm font-medium"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Login to Account"}
              {!loading && <ArrowRight size={20} />}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-gray-400"><span className="bg-white dark:bg-[#0a0f1a] px-4">Or continue with</span></div>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-100 dark:border-white/5 py-4 rounded-2xl font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            <FcGoogle size={24} /> Google Account
          </motion.button>

          <p className="mt-10 text-center text-gray-500 dark:text-gray-400 font-medium">
            New to TravelEase?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-black hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;