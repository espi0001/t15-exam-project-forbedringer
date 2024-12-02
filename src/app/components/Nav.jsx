'use client';
import React, { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 z-50">

      <a
        href="#"
        className="relative group text-2xl font-light text-white hover:text-gray-500 hidden md:block"
      >
        FF LOGO
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
      </a>


      <a
        href="#"
        className="relative group text-2xl font-light text-white hover:text-gray-500"
      >
        Tickets
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
      </a>


      <button
        onClick={toggleMenu}
        className="relative group text-2xl font-light text-white hover:text-gray-500"
      >
        Menu
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-gray-500 transition-all duration-300 group-hover:w-full"></span>
      </button>


      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-lg flex justify-center items-center z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-3 text-center text-3xl">
              <li>
                <a
                  href="#"
                  className="relative group text-white hover:text-gray-600"
                >
                  Home
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group text-white hover:text-gray-600"
                >
                  About
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group text-white hover:text-gray-600"
                >
                  Services
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative group text-white hover:text-gray-600"
                >
                  Contact
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
