"use client";
import Image from "next/image";
import IndexHeroImage from "@/images/samu-lopez-unsplash.jpg";
import IndexTextLogo from "@/images/foo-fest-text-logo.webp";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image src={IndexHeroImage} alt="Hero background for index" layout="fill" objectFit="cover" priority={true} className="z-0" />
      <spline-viewer className="z-20 absolute" url="https://prod.spline.design/s43jFhXLgfMgsqSI/scene.splinecode"></spline-viewer>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="z-30 absolute bottom-0 left-0 w-full text-white z-10 flex flex-col items-start p-4">
        <Image src={IndexTextLogo} alt="Text logo for index" width={3000} height={100} priority={true} className="z-10" />
        <p className="text-xl font-medium z-10 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">MARCH 24-28, 2025</p>
      </div>
    </div>
  );
};
export default Hero;
