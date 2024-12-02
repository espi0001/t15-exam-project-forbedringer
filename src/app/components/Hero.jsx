'use client';
import Image from 'next/image';
import HeroImage from '../images/jon-tyson-unsplash.jpg';

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={HeroImage}
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        priority={true}
        className="z-0"
      />


      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="absolute bottom-0 left-0 w-full text-center text-white z-10">
        <h1 className="text-9xl line font-bold w-full py-4">
          FOO FEST
        </h1>
      </div>
    </div>
  );
};

export default Hero;
