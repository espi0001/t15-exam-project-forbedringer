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

      <Link href="/tickets" className="text-2xl font-light text-white relative group">
        Tickets
        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
      </Link>

      <button onClick={() => setIsMenuOpen(true)} className="text-2xl font-light text-white relative group">
        Menu
        <span className="absolute left-0 bottom-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
      </button>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className="fixed right-0 top-0 h-screen w-full md:w-[480px] bg-black p-16 text-white z-60">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center">
              <div className="w-8 h-[2px] bg-white rotate-45 absolute" />
              <div className="w-8 h-[2px] bg-white -rotate-45 absolute" />
            </button>
            <ul className="space-y-3 text-center text-3xl">
              <li>
                <NavigationLink href={"/"} text={"Home"} closeMenu={() => setIsMenuOpen(false)} />
              </li>
              <li>
                <NavigationLink href={"/lineup"} text={"Lineup"} closeMenu={() => setIsMenuOpen(false)} />
              </li>
              <li>
                <NavigationLink href={"/about"} text={"About"} closeMenu={() => setIsMenuOpen(false)} />
              </li>
              <li>
                <NavigationLink href={"/contact"} text={"Contact"} closeMenu={() => setIsMenuOpen(false)} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
