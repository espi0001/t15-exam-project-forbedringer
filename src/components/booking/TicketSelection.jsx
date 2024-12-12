"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI-komponenter til opbygning af kortlayout
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"; // UI-komponenter til valg af radio-knapper
import { Label } from "../ui/label"; // UI-komponent til tekstlabels
import { Input } from "../ui/input"; // UI-komponent til inputfelter
import { Button } from "../ui/button"; // UI-komponent til knapper
import { IoTicketOutline } from "react-icons/io5";

// Komponent til valg af billet
export default function TicketSelection({ bookingData, setBookingData, onNext }) {
  // Håndterer ændringer i valgt billettype
  const handleTicketTypeChange = (value) => {
    setBookingData({ ...bookingData, ticketType: value }); // Opdaterer bookingData med valgt billettype
  };

  // Håndterer ændringer i antal billetter
  const handleCountChange = (value) => {
    setBookingData({ ...bookingData, ticketCount: parseInt(value) || 1 }); // Opdaterer bookingData med antal billetter
  };

  return (
    <Card>
      {/* Header-sektionen med titel og ikon */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-step_h4 lg:text-step_h2">
          <IoTicketOutline size={50} /> {/* Ikon for musik */}
          Select your tickets {/* Titel for sektionen */}
        </CardTitle>
      </CardHeader>

      {/* Indhold af kortet */}
      <CardContent className="mb-6 p-4  rounded">
        {/* Radiogruppe til valg af billettype */}
        <RadioGroup
          value={bookingData.ticketType} // Forvalgt værdi baseret på bookingData
          onValueChange={handleTicketTypeChange} // Håndterer ændringer i valgt værdi
          className="flex justify-center items-center grid-cols-2 gap-10 mb-4"
        >
          {/* Regular Ticket valg */}
          <Label htmlFor="regular" className={`font-bold text-step_text_large px-[40px] lg:px-[60px] py-[50px] lg:py-[100px] border border-red_color rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer ${bookingData.ticketType === "regular" ? "border-red_color bg-gray-100" : "border-gray-300"}`}>
            Regular
            <span>
              <p className="font-thin text-step_text_tiny mt-[40px]">799,- + FEE</p>
            </span>
          </Label>

          <RadioGroupItem value="regular" id="regular" className="hidden" variant="secondary" />

          {/* VIP Ticket valg */}
          <Label htmlFor="vip" className={`font-bold text-step_text_large px-[40px] lg:px-[60px] py-[50px] lg:py-[100px] border border-red_color rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer ${bookingData.ticketType === "vip" ? "border-red_color bg-gray-100" : "border-gray-300"}`}>
            VIP
            <span>
              <p className="font-thin text-step_text_tiny mt-[40px]">1299,- + FEE</p>
            </span>
          </Label>

          <RadioGroupItem value="vip" id="vip" className="hidden" />
        </RadioGroup>

        {/* Inputfelt til antal billetter */}
        <div className="flex flex-row items-center justify-center mb-4 gap-4">
          <Label htmlFor="count" className="text-step_p ">
            Number of tickets
          </Label>
          <Input
            type="number"
            id="count"
            min="1"
            value={bookingData.ticketCount} // Forvalgt værdi baseret på bookingData
            onChange={(e) => handleCountChange(e.target.value)} // Håndterer ændringer i inputværdi
            className="mt-1 max-w-[100px] ml-2"
          />
        </div>

        {/* Knap til at fortsætte til næste trin */}
        <Button
          onClick={onNext} // Kalder onNext for at gå videre til næste trin
          disabled={!bookingData.ticketType || bookingData.ticketCount < 1} // Deaktiver knappen, hvis der ikke er valgt billettype eller antal er mindre end 1
          variant="tertiary"
          className="w-full"
        >
          Continue to camping options
        </Button>
      </CardContent>
    </Card>
  );
}
