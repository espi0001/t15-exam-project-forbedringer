"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/images/foo-fest-logo.webp";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav className="absolute flex justify-between items-center py-6 px-5 lg:px-16 w-full z-50 bg-transparent">
      <div className="hidden md:block">
        <Link href="/">
          <Image src={Logo} width={35} alt="logo" />
        </Link>
      </div>

      {/* <Link href="/tickets" className="text-2xl font-light text-white relative group">
        Tickets
>>>>>>> schedule-branch
        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
      </Link> */}

      <button onClick={() => setIsMenuOpen(true)} className="text-2xl font-bold text-white relative group">
        MENU
        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
      </button>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className="fixed right-0 top-0 h-screen w-full md:w-[480px] bg-[#121212] p-16 text-white z-60">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center">
              <div className="w-8 h-[2px] bg-white rotate-45 absolute" />
              <div className="w-8 h-[2px] bg-white -rotate-45 absolute" />
            </button>

            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-gray-400 uppercase text-sm border-b border-gray-400 pb-4 mb-8">Menu</p>
                <div className="flex flex-col gap-3">
                  {menuItems.map((item, index) => (
                    <motion.div key={index} initial={{ x: 80 }} animate={{ x: 0 }} transition={{ delay: 0.1 * index }} className="relative" onMouseEnter={() => setSelectedIndicator(item.href)}>
                      {selectedIndicator === item.href && (
                        <motion.div
                          layoutId="indicator"
                          className="absolute left-[-30px] top-[50%] w-2.5 h-2.5 bg-white rounded-full -translate-y-1/2"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                          }}
                        />
                      )}
                      <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="text-5xl font-light hover:text-gray-300 transition-colors">
                        {item.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-10 text-sm">
                <Link href="#" className="hover:text-gray-300 cursor-pointer">
                  Instagram
                </Link>
                <Link href="#" className="hover:text-gray-300 cursor-pointer">
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
