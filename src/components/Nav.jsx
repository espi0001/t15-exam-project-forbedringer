"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/images/foo-fest-logo.webp";
import Link from "next/link";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-4 z-50">
      <Link href={"/"} className="relative group text-2xl font-light text-white hover:text-black hidden md:block">
        <Image src={Logo} width={35} alt="logo" />
      </Link>

      <Link href={"#"} className="relative group text-2xl font-light text-white">
        Tickets
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
      </Link>

      <button onClick={toggleMenu} className="relative group text-2xl font-light text-white">
        Menu
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-lg flex justify-center items-center z-50" onClick={() => setIsMenuOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-3 text-center text-3xl">
              <li>
                <Link href={"/"} className="relative group text-white">
                  Home
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href={"/lineup"} className="relative group text-white">
                  Line-Up
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href={"/about"} className="relative group text-white">
                  About
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>

              <li>
                <Link href={"#"} className="relative group text-white">
                  Contact
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
