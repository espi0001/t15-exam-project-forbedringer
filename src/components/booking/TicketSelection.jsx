"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"; // UI-komponenter til opbygning af kortlayout
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"; // UI-komponenter til valg af radio-knapper
import { Label } from "../ui/Label"; // UI-komponent til tekstlabels
import { Input } from "../ui/Input"; // UI-komponent til inputfelter
import { Button } from "../ui/Button"; // UI-komponent til knapper
import { Music } from "lucide-react"; // Ikonpakke

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
          className="mb-4"
        >
          {/* Regular Ticket valg */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular" id="regular" />
            <Label htmlFor="regular">Regular Ticket (799,-)</Label>
          </div>

          {/* VIP Ticket valg */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vip" id="vip" />
            <Label htmlFor="vip">VIP Ticket (1299,-)</Label>
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
