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
    <div
      // Wrapper div, der tager hele skærmen og viser et baggrundsbillede
      className="w-full h-screen py-[64px] lg:py-[112px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/jodie-walton-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-black text-white text-center">Tickets & overview</h1>

        {/* Knapper til at skifte mellem booking og schedule */}
        <div className="space-x-4">
          <Button
            // className="bg-white border border-white hover:bg-[#7d0200] hover:border-[#7d0200] text-black hover:text-white"
            variant={activeView === "booking" ? "default" : ""} // Marker aktiv visning
            onClick={() => setActiveView("booking")} // Opdaterer aktiv visning til schedule
          >
            Book Tickets
          </Button>
          <Button
            variant={activeView === "schedule" ? "secondary" : ""}
            variant="secondary" // Marker aktiv visning
            onClick={() => setActiveView("schedule")} // Opdaterer aktiv visning til schedule
          >
            View Schedule
          </Button>
        </div>
      </div>
      {/* Sektion til dynamisk rendering af enten BookingFlow eller ScheduleView */}
      <section className="p-6">{activeView === "booking" ? <BookingFlow /> : <ScheduleView />}</section>

      <Button variant="default" size="default">
        Default Button
      </Button>
      <Button variant="default" size="sm">
        Small Default Button
      </Button>
      <Button variant="default" size="lg">
        Large Default Button
      </Button>

      <Button variant="secondary" size="default">
        Secondary Button
      </Button>
      <Button variant="secondary" size="sm">
        Small Secondary Button
      </Button>
      <Button variant="secondary" size="lg">
        Large Secondary Button
      </Button>

      <Button variant="tertiary" size="default">
        tertiary Button
      </Button>
      <Button variant="tertiary" size="sm">
        Small tertiary Button
      </Button>
      <Button variant="tertiary" size="lg">
        Large tertiary Button
      </Button>

      <Button variant="outline" size="default">
        Outline Button
      </Button>
      <Button variant="outline" size="sm">
        Small Outline Button
      </Button>
      <Button variant="outline" size="lg">
        Large Outline Button
      </Button>

      <Button variant="ghost" size="default">
        Ghost Button
      </Button>
      <Button variant="ghost" size="sm">
        Small Ghost Button
      </Button>
      <Button variant="ghost" size="lg">
        Large Ghost Button
      </Button>

      <Button variant="link" size="default">
        Link Button
      </Button>
      <Button variant="link" size="sm">
        Small Link Button
      </Button>
      <Button variant="link" size="lg">
        Large Link Button
      </Button>
    </div>
  );
}
