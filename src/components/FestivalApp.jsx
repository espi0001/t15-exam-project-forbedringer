"use client";
import { useState } from "react";
import Navigation from "./Navigation";
import BookingFlow from "./BookingFlow";
import ScheduleView from "./ScheduleView";

export default function FestivalApp() {
  const [activeView, setActiveView] = useState("booking");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      <main className="max-w-7xl mx-auto p-6">{activeView === "booking" ? <BookingFlow /> : <ScheduleView />}</main>
    </div>
  );
}
