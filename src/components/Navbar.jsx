import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/packages', label: 'Packages' },
    { path: '/contact', label: 'Contact' },
    { path: '/my-bookings', label: 'My Bookings' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🧭</span>
            <span className="font-bold text-xl text-gray-800">Bharat<span className="text-orange-500">Yatra</span></span>
          </NavLink>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-orange-500 font-medium transition duration-300 ${
                    isActive ? 'text-orange-500 border-b-2 border-orange-500' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg transition duration-300 shadow-md">
              Book Now
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 text-2xl">
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-gray-700 hover:text-orange-500 font-medium ${
                    isActive ? 'text-orange-500' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg w-full text-center mt-3">
              Book Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;