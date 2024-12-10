"use client";
import { useState } from "react";
import BookingFlow from "@/components/BookingFlow";
import ScheduleView from "@/components/ScheduleView";
import { Button } from "@/components/ui/Button";

export default function Page() {
  // useState til at styre, hvilken visning der er aktiv (booking eller schedule)
  const [activeView, setActiveView] = useState("booking");

  //   mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px]
  return (
    <div>
      <div
        // Wrapper div, der tager hele skærmen og viser et baggrundsbillede
        style={{
          backgroundImage: "url('/images/jodie-walton-unsplash.jpg')",
          // backgroundSize: "cover",
          // backgroundPosition: "fill",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        className="w-full h-[250px] py-[64px] lg:py-[112px] bg-center bg-fill bg-cover bg-black bg-opacity-50"
      >
        <h1 className="font-black text-white text-center">Festival Schedule</h1>
      </div>

      <section className="p-6">
        <ScheduleView />
      </section>
    </div>
  );
}
