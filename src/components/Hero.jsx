'use client';
import Image from 'next/image';
import IndexHeroImage from '../app/images/samu-lopez-unsplash.jpg';
import IndexTextLogo from '../app/images/foo-fest-text-logo.webp';

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={IndexHeroImage}
        alt="Hero background for index"
        layout="fill"
        objectFit="cover"
        priority={true}
        className="z-0"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

<div className="absolute bottom-0 left-0 w-full text-center text-white z-10 flex justify-center items-center p-4">
  <Image
    src={IndexTextLogo}
    alt="Text logo for index"
    width={3000}
    height={100}
    priority={true}
    className="z-10"
  />
</div>

    </div>
  );
};

export default Hero;
