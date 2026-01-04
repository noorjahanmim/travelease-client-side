import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Image as ImageIcon,
  Save,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";


const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        avatar: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(form.name, form.avatar);

      toast.success("Profile updated successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Profile update failed!");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6 lg:p-10"
    >
      {/* 🔝 Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white">
          Profile Settings
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your account information and profile photo
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 👤 PROFILE CARD */}
        <div>
          <div className="bg-white dark:bg-white/5  rounded-3xl p-8 text-center shadow">
            <div className="relative inline-block">
              <img
                src={
                  form.avatar ||
                  `https://ui-avatars.com/api/?name=${form.name}`
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500/30"
              />
              <div className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full text-white">
                <Camera size={16} />
              </div>
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              {form.name || "Your Name"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Registered User</p>
          </div>
        </div>

        {/* 📝 ACCOUNT FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-white/5  rounded-3xl p-8 shadow">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION: BASIC INFO */}
              <div>
                <h4 className="text-lg font-bold mb-4">Basic Information</h4>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    icon={<User size={18} />}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />

                  <Input
                    label="Email Address"
                    icon={<Mail size={18} />}
                    name="email"
                    value={form.email}
                    disabled
                  />
                </div>
              </div>

              {/* SECTION: CONTACT */}
              <div>
                <h4 className="text-lg font-bold mb-4">Contact</h4>

                <Input
                  label="Phone Number"
                  icon={<Phone size={18} />}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* SECTION: PHOTO */}
              <div>
                <h4 className="text-lg font-bold mb-4">Profile Photo</h4>

                <Input
                  label="Photo URL"
                  icon={<ImageIcon size={18} />}
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                />
              </div>

              {/* ACTION */}
              <div className="flex justify-end pt-6 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 text-white rounded-xl font-bold shadow"
                >
                  <Save size={18} /> Save Changes
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;



const Input = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  </div>
);