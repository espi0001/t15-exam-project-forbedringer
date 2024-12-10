"use client";
import Image from "next/image";
import IndexHeroImage from "@/images/foo-fest-hero-w-text.png";
import IndexFansHero from "@/images/fans-for-parallax.png";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="relative h-full">
        <Image src={IndexHeroImage} alt="Hero background for index" layout="fill" objectFit="cover" priority={true} className="z-0" />

        <spline-viewer url="https://prod.spline.design/dlMfl08WooPZ4J3H/scene.splinecode"></spline-viewer>

        <div className="absolute inset-0 z-40">
          <Image src={IndexFansHero} alt="Fans Image" width={3000} height={100} priority={true} className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-10 left-0 w-full text-white flex flex-col items-start p-4 z-40">
          {/* <h1 className="z-30 [text-shadow:_0_1px_4_rgb(0_0_0_/_100%)] text-9xl">FOO FEST</h1> */}
          <p className="ml-14 text-xl font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl [text-shadow:_0_1px_8_rgb(0_0_0_/_40%)]">MARCH 24-28, 2025</p>
          <p className="ml-14 text-xl font-light sm:text-lg md:text-xl lg:text-2xl xl:text-3xl [text-shadow:_0_1px_8_rgb(0_0_0_/_40%)]">REFSHALEØEN, KBH S</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
