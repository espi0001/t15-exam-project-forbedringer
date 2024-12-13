import { useState } from "react";
import { motion } from "framer-motion";

const DateHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href="/" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative overflow-hidden w-[160px]">
      <motion.p className="font-medium text-sm text-white_color whitespace-nowrap" initial={{ x: 0 }} animate={{ x: isHovered ? "-100%" : 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
        Refshaleøen, Cph
      </motion.p>
      <motion.p className="font-medium text-sm text-white_color absolute top-0 left-full whitespace-nowrap" initial={{ x: 0 }} animate={{ x: isHovered ? "-100%" : 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
        March 24th-28th, 2025
      </motion.p>
    </a>
  );
};

export default DateHover;
