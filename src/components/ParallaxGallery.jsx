"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";
import { api } from "@/lib/api";

const ParallaxGallery = () => {
  const [bands, setBands] = useState([]);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const gallery = useRef(null);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const bandsData = await api.getBands();
        setBands(bandsData);
      } catch (error) {
        console.error("Error fetching band data:", error);
      }
    };
    fetchBands();
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="h-96 bg-black_color flex justify-center items-center">
        <h2 className="text-white_color -mb-10">Experience all of your favorite artists</h2>
      </div>
      <div ref={gallery} className="h-[175vh] bg-white_color relative flex gap-[2vw] p-[2vw] box-border overflow-hidden">
        <Column bands={[bands[0], bands[1], bands[2]]} y={y} offset="-top-[45%]" />
        <Column bands={[bands[3], bands[4], bands[5]]} y={y2} offset="-top-[95%]" />
        <Column bands={[bands[6], bands[7], bands[8]]} y={y3} offset="-top-[45%]" />
        <Column bands={[bands[9], bands[10], bands[11]]} y={y4} offset="-top-[75%]" />
      </div>
      <div className="h-24 bg-black_color"></div>
    </>
  );
};

const Column = ({ bands, y, offset }) => {
  return (
    <motion.div className={`relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw] ${offset}`} style={{ y }}>
      {bands?.map((band, i) => {
        if (!band) return null;
        const imageUrl = band.logo.startsWith("http") ? band.logo : `/logos/${band.logo}`;
        return (
          <div key={i} className="h-full w-full relative rounded-[1vw] overflow-hidden">
            <Image src={imageUrl} alt={band.name || "band image"} fill className="object-cover" />
          </div>
        );
      })}
    </motion.div>
  );
};

export default ParallaxGallery;
