"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "@/images/foo-fest-isometric-white-logo.svg";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import DateHover from "./DateHover";
import { IoCloseOutline } from "react-icons/io5";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref for the menu div
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  const menuSlide = {
    initial: { x: "100%" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Lineup", href: "/lineup" },
    { title: "Tickets", href: "/tickets" },
    { title: "Schedule", href: "/schedule" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="absolute flex justify-between items-center py-py_default px-[20px] lg:px-[64px] w-full z-50 bg-transparent">
      <div className="flex gap-6 items-center">
        <Link href="/">
          <Image src={Logo} width={50} alt="logo" />
        </Link>
        <DateHover />
      </div>
      <div className="flex gap-[3.5rem]">
        <Link href="/tickets" className="text-2xl font-bold text-white_color relative group">
          TICKETS
          <span className="absolute left-0 bottom-0 w-0 h-px bg-white_color transition-base group-hover:w-full" />
        </Link>

        <button onClick={() => setIsMenuOpen(true)} className="text-2xl font-bold text-white_color relative group">
          MENU
          <span className="absolute left-0 bottom-0 w-0 h-px bg-white_color transition-base group-hover:w-full" />
        </button>
      </div>
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            ref={menuRef} // Attach ref to the menu div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 h-screen w-full md:w-[480px] bg-white_color p-16 text-black_color z-60"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center">
              <IoCloseOutline className="w-12 h-12 text-black_color hover:text-red_color transition-base" />
            </button>

            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-less_black_color uppercase text-sm border-b border-less_black_color pb-4 mb-8">Menu</p>
                <div className="flex flex-col gap-3 ">
                  {menuItems.map((item, index) => (
                    <motion.div key={index} initial={{ x: 80 }} animate={{ x: 0 }} transition={{ delay: 0.1 * index }} className="relative " onMouseEnter={() => setSelectedIndicator(item.href)}>
                      {selectedIndicator === item.href && (
                        <motion.div
                          layoutId="indicator"
                          className="absolute left-[-30px] top-[50%] w-2.5 h-2.5 bg-black_color rounded-full -translate-y-1/2"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                          }}
                        />
                      )}
                      <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="text-5xl font-light hover:text-red_color transition-base">
                        {item.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Add a line above Instagram and Facebook links */}
              <p className="text-less_black_color uppercase text-sm border-b border-less_black_color pb-4 mt-20">Follow Us</p>

              <div className="flex gap-10 text-sm mb-10">
                <Link href="#" className="hover:text-less_black_color cursor-pointer transition-base">
                  Instagram
                </Link>
                <Link href="#" className="hover:text-less_black_color cursor-pointer transition-base">
                  Facebook
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
