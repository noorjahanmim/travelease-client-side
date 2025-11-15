import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">TravelEase</h2>
        <p className="mb-4">Your Trusted Vehicle Booking & Trip Management Platform</p>
        
        <div className="flex justify-center gap-6 text-xl mb-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaFacebook /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaXTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400"><FaInstagram /></a>
        </div>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TravelEase. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


