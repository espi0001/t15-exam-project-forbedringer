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
          <Label htmlFor="regular" className={`label-styling border shadow-md ${bookingData.ticketType === "regular" ? "border-red_color border-[2px] bg-light_grey_color" : "border-grey_color"}`}>
            <div className="row-start-2 row-end-4">REGULAR</div>

            <div className="flex flex-col gap-[10px] row-start-4 row-end-4">
              <span className="font-normal text-step-text_regular">
                <p>799 DKK</p>
              </span>
              <span>
                <p className="font-thin text-step_text_tiny">+ FEE</p>
              </span>
            </div>
            <ul className="row-start-6 row-end-8 text-start font-normal text-step_text_tiny list-disc space-y-1">
              <li>Access to all stages</li>
              <li>Access to all camping areas</li>
            </ul>
          </Label>

          <RadioGroupItem value="regular" id="regular" className="hidden" variant="secondary" />

          {/* VIP Ticket valg */}
          <Label htmlFor="VIP" className={`label-styling border shadow-md ${bookingData.ticketType === "VIP" ? "border-red_color border-[2px]" : "border-grey_color"}`}>
            <div className="row-start-2 row-end-4">VIP</div>

            <div className="flex flex-col gap-[10px] row-start-4 row-end-5">
              <span className="font-normal text-step-text_regular">
                <p>1299 DKK</p>
              </span>
              <span>
                <p className="font-thin text-step_text_tiny">+ FEE</p>
              </span>
            </div>
            <ul className="row-start-6 row-end-8 text-start font-normal text-step_text_tiny list-disc space-y-1">
              <li>Access to all stages</li>
              <li>Access to all camping areas</li>
              <li>Early access</li>
              <li>Meet & Greet </li>
            </ul>
          </Label>

          <RadioGroupItem value="VIP" id="VIP" className="hidden" />
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
          className="w-full text-white"
        >
          Continue to camping options
        </Button>
      </CardContent>
    </Card>
  );
}
