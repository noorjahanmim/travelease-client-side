import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

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

    // Password validation
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
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch(() => toast.error("Registration failed!"))
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success("Registered with Google!");
        navigate("/");
      })
      .catch(() => toast.error("Google signup failed!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg w-full max-w-md transition-colors">
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            required
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="mt-4 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          disabled={loading}
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
