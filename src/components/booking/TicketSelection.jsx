"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI-komponenter til opbygning af kortlayout
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"; // UI-komponenter til valg af radio-knapper
import { Label } from "../ui/label"; // UI-komponent til tekstlabels
import { Input } from "../ui/input"; // UI-komponent til inputfelter
import { Button } from "../ui/button"; // UI-komponent til knapper
import { Music } from "lucide-react"; // Ikonpakke

// Komponent til valg af billet
// FØR: bookingData, setBookingData, onNext
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
        <CardTitle className="flex items-center gap-2">
          <Music className="h-6 w-6" /> {/* Ikon for musik */}
          Select Your Tickets {/* Titel for sektionen */}
        </CardTitle>
      </CardHeader>

      {/* Indhold af kortet */}
      <CardContent>
        {/* Radiogruppe til valg af billettype */}
        <RadioGroup
          value={bookingData.ticketType} // Forvalgt værdi baseret på bookingData
          onValueChange={handleTicketTypeChange} // Håndterer ændringer i valgt værdi
          className="grid grid-cols-2 gap-6 mb-4"
        >
          {/* Regular Ticket valg */}
          <div className={`p-6 border rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer ${bookingData.ticketType === "regular" ? "border-black bg-gray-100" : "border-gray-300"}`} onClick={() => handleTicketTypeChange("regular")}>
            <RadioGroupItem value="regular" id="regular" className="hidden" />
            {/* 
            <Label htmlFor="regular">Regular Ticket (799,-)</Label> */}
            <Label htmlFor="regular">Regular Ticket</Label>
            <p className="text-sm mt-2">DKK 799 + FEE</p>
          </div>

          {/* VIP Ticket valg */}
          <div className={`p-6 border rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer ${bookingData.ticketType === "vip" ? "border-black bg-gray-100" : "border-gray-300"}`} onClick={() => handleTicketTypeChange("vip")}>
            <RadioGroupItem value="vip" id="vip" className="hidden" />
            <Label htmlFor="vip">VIP Ticket</Label>
            <p className="text-sm mt-2">DKK 1299 + FEE</p>
          </div>
        </RadioGroup>

        {/* Inputfelt til antal billetter */}
        <div className="mb-4">
          <Label htmlFor="count">Number of Tickets</Label>
          <Input
            type="number"
            id="count"
            min="1"
            value={bookingData.ticketCount} // Forvalgt værdi baseret på bookingData
            onChange={(e) => handleCountChange(e.target.value)} // Håndterer ændringer i inputværdi
            className="mt-1"
          />
        </div>

        {/* Knap til at fortsætte til næste trin */}
        <Button
          onClick={onNext} // Kalder onNext for at gå videre til næste trin
          disabled={!bookingData.ticketType || bookingData.ticketCount < 1} // Deaktiver knappen, hvis der ikke er valgt billettype eller antal er mindre end 1
          variant="tertiary"
          className="w-full"
        >
          Continue to Camping Options
        </Button>
      </CardContent>
    </Card>
  );
}
