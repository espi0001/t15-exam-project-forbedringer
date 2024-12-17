"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Poster from "@/images/foo-fest-poster.webp";
import { Button } from "./ui/button";
import Link from "next/link";

const FooFestPosterComp = () => {
  const posterRef = useRef(null);

  const handleQuickSpin = () => {
    const poster = posterRef.current;

    if (!poster) return;

    poster.style.pointerEvents = "none";

    gsap.killTweensOf(poster);

    gsap.to(poster, {
      rotationY: "+=360", 
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
    
        gsap.set(poster, { rotationY: 0 });

 
        poster.style.pointerEvents = "auto";
      },
    });
  };

  return (
<section className="relative flex flex-col items-center justify-center min-h-screen p-4 mb-20 bg-gradient-to-b from-custom-end to-custom-start">
  <div
    ref={posterRef}
    className="relative w-full max-w-lg aspect-[2/3] cursor-pointer perspective-1000"
    onClick={handleQuickSpin}
  >
    <Image
      src={Poster}
      alt="Foo Fest Poster"
      fill
      priority
      className="object-contain"
    />
  </div>
 <Link href="/schedule">
  <Button variant="forsiden" size="lg" className="mt-6 mb-10">
    View full schedule
  </Button>
</Link>

</section>

  );
};

export default FooFestPosterComp;
