"use client";
import { useState } from "react";
import Navigation from "./Navigation";
import BookingFlow from "./BookingFlow";
import ScheduleView from "./ScheduleView";
import Image from "next/image";
import BookingFlowHero from "@/images/jodie-walton-unsplash.jpg";

export default function FestivalApp() {
  const [activeView, setActiveView] = useState("booking");

  return (
    <div className="relative min-h-screen bg-black">
   
      <Image
        src={BookingFlowHero}
        alt="Hero background for BookingFlow"
        layout="fill"
        objectFit="cover"
        priority={true}
        className="z-0 absolute inset-0"
      />

      <div className="relative z-10 text-white">
        <Navigation activeView={activeView} setActiveView={setActiveView} />
        <main className="max-w-7xl mx-auto p-6">
          {activeView === "booking" ? <BookingFlow /> : <ScheduleView />}
        </main>
      </div>
    </div>
  );
}
