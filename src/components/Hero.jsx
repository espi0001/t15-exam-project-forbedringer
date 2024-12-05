"use client";
import Image from "next/image";
import IndexHeroImage from "@/images/foo-fest-hero-w-text.png";
import IndexFansHero from "@/images/fans-for-parallax.png"

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="relative h-full">
        <Image 
          src={IndexHeroImage} 
          alt="Hero background for index" 
          layout="fill" 
          objectFit="cover" 
          priority={true} 
          className="z-0" 
        />
  
        <spline-viewer 
          className="absolute z-40" 
          url="https://prod.spline.design/xGywt7pLfv6ZN4uB/scene.splinecode"
        ></spline-viewer>

        <div className="absolute inset-0 z-50">
          <Image 
            src={IndexFansHero} 
            alt="Fans Image" 
            width={3000} 
            height={100} 
            priority={true} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute bottom-10 left-0 w-full text-white flex flex-col items-start p-4 z-50">
          <h1 className="z-30">FOO FEST</h1>
          <p className="text-xl font-medium sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            MARCH 24-28, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
