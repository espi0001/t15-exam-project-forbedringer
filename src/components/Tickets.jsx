"use client";
import { useState } from "react";

import BookingFlow from "@/components/BookingFlow";
import ContactHero from "@/images/andre-benz-unsplash.jpg";
import HeaderBillede from "@/components/HeaderBillede";
import HeaderText from "@/components/HeaderText";

export default function Tickets() {
  // useState til at styre, hvilken visning der er aktiv (booking eller schedule)
  const [activeView, setActiveView] = useState("booking");

  return (
    <div>
      <HeaderBillede billede={ContactHero} />

      <section className="mx-mx_default lg:mx-mx_lg py-py_default lg:py-py_lg">
        <HeaderText h1="Tickets" text="Choose your experience! Standard tickets for full access or VIP for exclusive perks and priority. Get yours now!" />
        {/* <h1 className="text-black_color text-center">Tickets</h1> */}
        <BookingFlow />
      </section>
    </div>
  );
}
