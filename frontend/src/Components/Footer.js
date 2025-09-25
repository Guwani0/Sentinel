import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-[#3a0044] text-gray-100 mt-16">
      {/* Smooth Curvy Wave Top */}
      <div className="w-full overflow-hidden leading-none -mt-1">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64C120,80,240,96,360,96C480,96,600,80,720,64C840,48,960,32,1080,48C1200,64,1320,96,1440,112L1440,0L0,0Z"
            fill="black"
          />
        </svg>
      </div>

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-white font-bold mb-4">Sentinel</h3>
          <ul className="space-y-2 text-sm">
            <li>Security Awareness</li>
            <li>Policy Management</li>
            <li>Incident Reporting</li>
            <li>Compliance Tracking</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-bold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Training Modules</li>
            <li>Policies</li>
            <li>Knowledge Base</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-bold mb-4">More</h3>
          <ul className="space-y-2 text-sm">
            <li>About Sentinel</li>
            <li>Contact IT Dept</li>
            <li>User Support</li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h3 className="text-white font-bold mb-4">Follow us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-black">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-black">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-black">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-black">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-purple-900 py-4 text-center text-sm text-gray-200">
        © 2025 Sentinel | Sri Lanka Army IT Department
      </div>
    </footer>
  );
}

export default Footer;
