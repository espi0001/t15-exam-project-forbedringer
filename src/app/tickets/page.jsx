"use client";
import { useState } from "react";
import BookingFlow from "@/components/BookingFlow";
import ContactHero from "@/images/andre-benz-unsplash.jpg";
import HeaderBillede from "@/components/HeaderBillede";
import HeaderText from "@/components/HeaderText";

export default function Page() {
  // useState til at styre, hvilken visning der er aktiv (booking eller schedule)
  const [activeView, setActiveView] = useState("booking");

  //   mx-[20px] lg:mx-[64px] py-[64px] lg:py-[112px]
  return (
    <div>
      <HeaderBillede billede={ContactHero} />

      <section className="mx-[20px] lg:mx-[64px] p-6">
        <HeaderText h1="Tickets" text="Choose your experience! Standard tickets for full access or VIP for exclusive perks and priority. Get yours now!" />
        {/* <h1 className="text-black_color text-center">Tickets</h1> */}
        <BookingFlow />
      </section>
    </div>
  );
}
