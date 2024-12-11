"use client";
import { useState } from "react";
import BookingFlow from "@/components/BookingFlow";
import AboutHeroImage from "@/images/gabriel-benois-unsplash.jpg";
import Image from "next/image";

export default function Page() {
  // useState til at styre, hvilken visning der er aktiv (booking eller schedule)
  const [activeView, setActiveView] = useState("booking");

  //   mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px]
  return (
    <div>
      <div className="relative h-[300px] w-full flex justify-center items-center">
        <Image src={AboutHeroImage} alt="Hero background for about-page, by Gabriel Benois" layout="fill" objectFit="cover" priority={true} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 z-10 self-center">
          <h1 className="text-white_color text-center">Tickets</h1>
        </div>
      </div>

      <section className="p-6">
        {/* <h1 className="text-black_color text-center">Tickets</h1> */}
        <BookingFlow />
      </section>
    </div>
  );
}
