"use client";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { CreditCard } from "lucide-react";
import { api } from "@/lib/api"; // API-funktioner til backend-kommunikation
import { MdArrowLeft } from "react-icons/md";

export default function Checkout({ bookingData, setReservationId, onNext, onBack }) {
  // State til betalingsoplysninger
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Beregner totalprisen for ordren baseret på brugerens valg
  const calculateTotal = () => {
    let total = bookingData.ticketCount * (bookingData.ticketType === "vip" ? 1299 : 799); // Billetpris
    if (bookingData.greenCamping) total += 249; // Tillæg for green camping
    if (bookingData.tentSetup === "2person") total += 299 * Math.ceil(bookingData.ticketCount / 2); // 2-personers telt
    if (bookingData.tentSetup === "3person") total += 399 * Math.ceil(bookingData.ticketCount / 3); // 3-personers telt
    return total; // Returnerer den samlede pris
  };
  // Håndterer ændringer i betalingsoplysninger
  const handleInputChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };
  // Validerer betalingsoplysninger
  const isPaymentValid = () => {
    return (
      paymentData.cardNumber.length === 16 &&
      /^[0-9]{2}\/[0-9]{2}$/.test(paymentData.expiry) && // MM/YY format
      /^[0-9]{3}$/.test(paymentData.cvv) // 3-cifret CVV
    );
  };

  // Håndterer indsendelse af checkout
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stopper standardformularens indsendelse

    if (!isPaymentValid()) {
      alert("Please provide valid payment details.");
      return;
    }

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
  // Håndterer indsendelse af checkout
  // const handleSubmit = async () => {
  //   try {
  //     // Reserver campingplads baseret på brugerens valg
  //     const reservation = await api.reserveSpot(bookingData.campingArea, bookingData.ticketCount);
  //     setReservationId(reservation.id); // Gem reservations-ID'et
  //     await api.fulfillReservation(reservation.id); // Fuldfør reservationen
  //     onNext(); // Gå videre til næste trin
  //   } catch (error) {
  //     console.error("Checkout failed:", error); // Log fejl, hvis noget går galt
  //   }
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard size={50} />
          Checkout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Ordresammendrag */}
          <div className="border-b pb-4">
            <h4 className="font-semibold">Order summary</h4>
            <p>
              {bookingData.ticketCount}x {bookingData.ticketType} Tickets
            </p>
            {bookingData.greenCamping && <p>Green Camping option</p>}
            {bookingData.tentSetup && <p>Tent setup: {bookingData.tentSetup}</p>}
            <p className="text-xl font-bold mt-2">Total: {calculateTotal()},-</p>
          </div>

          {/* Betalingsinformation */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card number</Label>
            <Input id="cardNumber" type="text" placeholder="**** **** **** ****" value={paymentData.cardNumber} onChange={(e) => handleInputChange("cardNumber", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry date</Label>
              <Input id="expiry" type="text" placeholder="MM/YY" value={paymentData.expiry} onChange={(e) => handleInputChange("expiry", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" type="text" placeholder="***" value={paymentData.cvv} onChange={(e) => handleInputChange("cvv", e.target.value)} />
            </div>
          </div>

          <Alert>
            <AlertDescription>This is a demo checkout. No actual payment will be processed.</AlertDescription>
          </Alert>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={onBack} type="button">
              <MdArrowLeft size={20} />
              Back
            </Button>
            <Button type="submit" variant="tertiary" disabled={!isPaymentValid()}>
              Complete purchase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
