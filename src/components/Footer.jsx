import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-10">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 bg-clip-text text-transparent font-extrabold">
              TravelEase
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner for seamless vehicle booking and unforgettable trip management. Explore the world with comfort.
            </p>
            <div className="flex gap-4 text-xl mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors duration-300"><FaFacebook /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors duration-300"><FaXTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors duration-300"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition-colors duration-300"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/allVehicles" className="hover:text-blue-400 transition-colors">Find Vehicles</a></li>
              {/* <li><a href="/trips" className="hover:text-blue-400 transition-colors">My Trips</a></li> */}
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-gray-400">
                <FaLocationDot className="text-blue-500" />
                <span>123 Travel Avenue, Dhaka, BD</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-blue-500" />
                <a href="tel:+880123456789" className="hover:text-blue-400">+880 1234-567890</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-blue-500" />
                <a href="mailto:support@travelease.com" className="hover:text-blue-400">support@travelease.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe for latest offers and updates.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-400 
           dark:from-blue-800 dark:to-purple-700 text-white py-2 rounded-md text-sm font-medium transition-all">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} TravelEase. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
