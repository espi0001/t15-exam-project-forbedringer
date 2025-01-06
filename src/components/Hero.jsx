"use client";
import { useEffect } from "react";
import Image from "next/image";
import IndexHeroImage from "@/images/foo-fest-hero-w-text.png";
import IndexFansHero from "@/images/fans-for-parallax.png";
import { gsap } from "gsap";
import Poster from "@/images/foo-fest-poster.webp"
import ScrollIndicator from "./Scroll";
import { Scroll } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial states
    gsap.set([".text-layer-1 p", ".text-layer-1 h1"], {
      xPercent: gsap.utils.wrap([100, -100]),
      opacity: 0,
    });
    
    gsap.set([".text-layer-2 p", ".text-layer-2 h1"], {
      xPercent: gsap.utils.wrap([100, -100]),
      opacity: 0,
    });
    
    // Animation sequence
    tl.to([".text-layer-1 p", ".text-layer-1 h1", ".text-layer-2 p", ".text-layer-2 h1"], {
      xPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.4,
      ease: "circ.inOut",
    })
    .to(
      ".liquid-overlay",
      {
        clipPath: `circle(70% at 60% 40%)`,
        duration: 0.8,
        ease: "power2.in",
      },
      "-=0.6"
    )
    .to(".liquid-overlay", {
      clipPath: `circle(65% at 85% 20%)`,
      duration: 0.3,
      ease: "power1.out",
    })
    .to(".liquid-overlay", {
      clipPath: `circle(0% at 100% 0%)`,
      duration: 0.5,
      ease: "power4.in",
    });
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Loading overlay */}
      <div
        className="liquid-overlay fixed inset-0 bg-white_color z-50"
        style={{
          clipPath: "circle(100% at 50% 50%)",
        }}
      >
        {/* Black text on white background */}
        <div className="text-layer-1 absolute bottom-10 w-full text-black_color flex flex-col items-start p-4 space-y-1">
          <div className="hero-text overflow-hidden leading-none">
            <h1 className="ml-14 fluid-title font-bold">FOO FEST</h1>
          </div>
          <div className="hero-text overflow-hidden leading-none">
            <p className="ml-14 fluid-text font-medium">24th ─ 30th</p>
          </div>
          <div className="hero-text overflow-hidden leading-none">
            <p className="ml-14 fluid-text font-medium">March, 2025</p>
          </div>
        </div>
      </div>

      {/* Main hero */}
      <div className="relative h-full">
        <Image 
          src={IndexHeroImage} 
          alt="Hero background for index" 
          layout="fill" 
          objectFit="cover" 
          priority={true} 
          className="z-0" 
        />
        {/* White text on hero background */}
        <div className="text-layer-2 absolute bottom-10 w-full text-white_color flex flex-col items-start p-4 space-y-1 z-40">
          <div className="hero-text overflow-hidden leading-none">
            <h1 className="ml-14 fluid-title font-bold">FOO FEST</h1>
          </div>
          <div className="hero-text overflow-hidden leading-none">
            <p className="ml-14 fluid-text font-bold">24th ─ 30th</p>
          </div>
          <div className="hero-text overflow-hidden leading-none">
            <p className="ml-14 fluid-text font-medium">March, 2025</p>
          </div>
        </div>
      </div>
<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
  <ScrollIndicator />
</div>
    </div>
  );
};

export default Hero;