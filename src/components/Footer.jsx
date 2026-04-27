import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🧭</span>
              <span className="font-bold text-xl text-white">BharatYatra</span>
            </div>
            <p className="text-sm">Explore incredible India with comfort and authenticity.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/" className="hover:text-orange-400 transition">Home</NavLink></li>
              <li><NavLink to="/about" className="hover:text-orange-400 transition">About Us</NavLink></li>
              <li><NavLink to="/destinations" className="hover:text-orange-400 transition">Destinations</NavLink></li>
              <li><NavLink to="/packages" className="hover:text-orange-400 transition">Packages</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-orange-400 transition">Contact</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">📞 +91 8984056080</li>
              <li className="flex items-center gap-2">✉️ hello@bharatyatra.com</li>
              <li className="flex items-center gap-2">📍 Connaught Place, Bhubanswar</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4 text-xl">
              <span className="hover:text-orange-400 cursor-pointer">📘</span>
              <span className="hover:text-orange-400 cursor-pointer">🐦</span>
              <span className="hover:text-orange-400 cursor-pointer">📷</span>
              <span className="hover:text-orange-400 cursor-pointer">🎥</span>
            </div>
            <p className="text-xs mt-4">© 2025 BharatYatra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;