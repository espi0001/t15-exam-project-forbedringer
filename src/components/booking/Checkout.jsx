"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Alert, AlertDescription } from "../ui/Alert";
import { CreditCard } from "lucide-react";
import { api } from "@/lib/api"; // API-funktioner til backend-kommunikation

export default function Checkout({ bookingData, setReservationId, onNext, onBack }) {
  // Beregner totalprisen for ordren baseret på brugerens valg
  const calculateTotal = () => {
    let total = bookingData.ticketCount * (bookingData.ticketType === "vip" ? 1299 : 799); // Billetpris
    if (bookingData.greenCamping) total += 249; // Tillæg for green camping
    if (bookingData.tentSetup === "2person") total += 299 * Math.ceil(bookingData.ticketCount / 2); // 2-personers telt
    if (bookingData.tentSetup === "3person") total += 399 * Math.ceil(bookingData.ticketCount / 3); // 3-personers telt
    return total; // Returnerer den samlede pris
  };

  // Håndterer indsendelse af checkout
  const handleSubmit = async () => {
    try {
      // Reserver campingplads baseret på brugerens valg
      const reservation = await api.reserveSpot(bookingData.campingArea, bookingData.ticketCount);
      setReservationId(reservation.id); // Gem reservations-ID'et
      await api.fulfillReservation(reservation.id); // Fuldfør reservationen
      onNext(); // Gå videre til næste trin
    } catch (error) {
      console.error("Checkout failed:", error); // Log fejl, hvis noget går galt
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          Checkout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Ordresammendrag */}
          <div className="border-b pb-4">
            <h3 className="font-semibold">Order Summary</h3>
            <p>
              {bookingData.ticketCount}x {bookingData.ticketType} Tickets
            </p>
            {bookingData.greenCamping && <p>Green Camping Option</p>}
            {bookingData.tentSetup && <p>Tent Setup: {bookingData.tentSetup}</p>}
            <p className="text-xl font-bold mt-2">Total: {calculateTotal()},-</p>
          </div>

          {/* Betalingsinformation */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" type="text" placeholder="**** **** **** ****" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" type="text" placeholder="MM/YY" />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" type="text" placeholder="***" />
            </div>
          </div>

          <Alert>
            <AlertDescription>This is a demo checkout. No actual payment will be processed.</AlertDescription>
          </Alert>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Complete Purchase</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
