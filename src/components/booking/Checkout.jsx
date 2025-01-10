"use client";
import { useState } from "react";
import { api } from "@/lib/api"; // API-funktioner til backend-kommunikation
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // UI-komponenter til layout
import { Label } from "../ui/label"; // Label-komponent
import { Input } from "../ui/input"; // Input-komponent
import { Button } from "../ui/button"; // Knapkomponent
import { Alert, AlertDescription } from "../ui/alert"; // Advarsel-komponent
import { CreditCard } from "lucide-react";
import { MdArrowLeft } from "react-icons/md";

export default function Checkout({ bookingData, setReservationId, onNext, onBack }) {
  // Lokal state til betalingsoplysninger
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Beregner totalprisen baseret på brugerens valg
  const calculateTotal = () => {
    const ticketPrice = bookingData.ticketType === "vip" ? 1299 : 799; // Pris pr. billet afhængigt af type
    let total = bookingData.ticketCount * ticketPrice; // Total billetpris

    if (bookingData.greenCamping) total += 249; // Tillæg for green camping
    if (bookingData.tentSetup === "2person") total += 299 * Math.ceil(bookingData.ticketCount / 2); // pris for 2-personers telt
    if (bookingData.tentSetup === "3person") total += 399 * Math.ceil(bookingData.ticketCount / 3); // pris for 3-personers telt
    total += 99; // Fast booking gebyr
    return total;
  };
  // Håndterer ændringer i betalingsoplysninger
  const handleInputChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value })); // Opdaterer feltet i `paymentData`
  };

  // Validerer betalingsoplysninger
  const isPaymentValid = () => {
    return (
      paymentData.cardNumber.length === 16 && // Tjekker længden af kortnummer
      /^[0-9]{2}\/[0-9]{2}$/.test(paymentData.expiry) && // Validerer MM/YY format
      /^[0-9]{3}$/.test(paymentData.cvv) // Validerer 3-cifret CVV
    );
  };

  // Håndterer indsendelse af checkout
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPaymentValid()) {
      alert("Please provide valid payment details.");
      return;
    }

    // Reserverer plads via API (I glitch)
    const reservation = await api.createReservation(bookingData.campingArea, bookingData.ticketCount);

    if (!reservation || !reservation.id) {
      console.log("No reservation ID received");
      return;
    }

    setReservationId(reservation.id); // Gemmer reservations-ID

    // Gemmer bookingdata i Supabase
    const bookingSaved = await api.saveBooking({
      reservationId: reservation.id,
      personalInfo: bookingData.personalInfo,
      ticketType: bookingData.ticketType,
      campingArea: bookingData.campingArea,
      greenCamping: bookingData.greenCamping,
      tentSetup: bookingData.tentSetup,
      ticketCount: bookingData.ticketCount,
    });

    if (!bookingSaved) {
      alert("Der opstod en fejl ved gem af booking. Prøv venligst igen.");
      return;
    }

    onNext(); // Går videre til bekræftelse
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-step_h4 lg:text-step_h2">
          <CreditCard size={50} />
          Checkout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Ordresammendrag */}
          <div className="border-b pb-4">
            <h3 className="font-semibold pb-2 text-step_h5 lg:text-step_h4">Order summary</h3>
            <article className="space-y-2">
              <p>
                {bookingData.ticketCount}x {bookingData.ticketType} {bookingData.ticketCount > 1 ? "Tickets" : "Ticket"}
              </p>
              {bookingData.tentSetup && <p>Tent setup: {bookingData.tentSetup}</p>}
              {/* Green Camping option */}
              {bookingData.greenCamping && (
                <p>
                  Green Camping option <span className="ml-2">249,-</span>
                </p>
              )}

              {/* Tent setup prisen */}
              <div>
                {bookingData.personalInfo.map((info, index) => (
                  <p key={index} className="">
                    <span className="font-[500]">Ticket #{index + 1}:</span>{" "}
                    {info.tentSetup ? (
                      <>
                        {" "}
                        Tent setup: {info.tentSetup} <span className="ml-2 text-">{info.tentSetup === "2person" ? "299,-" : "399,-"}</span>
                      </>
                    ) : (
                      " No tent setup"
                    )}
                  </p>
                ))}
              </div>
              <p>Booking fee: 99,-</p>
            </article>
            <p className="text-xl font-bold mt-2">Total: {calculateTotal()},-</p> {/* Totalpris */}
          </div>

          {/* Betalingsinformation */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="**** **** **** ****"
              value={paymentData.cardNumber} // Forvalgt værdi
              onChange={(e) => handleInputChange("cardNumber", e.target.value)} // Opdaterer kortnummer
              className="mt-1 placeholder:text-grey_color"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry date</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                value={paymentData.expiry} // Forvalgt værdi
                onChange={(e) => handleInputChange("expiry", e.target.value)} // Opdaterer udløbsdato
                className="mt-1 placeholder:text-grey_color"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="***"
                value={paymentData.cvv} // Forvalgt værdi
                onChange={(e) => handleInputChange("cvv", e.target.value)} // Opdaterer CVV
                className="mt-1 placeholder:text-grey_color"
              />
            </div>
          </div>

          <Alert>
            <AlertDescription>This is a demo checkout. No actual payment will be processed.</AlertDescription>
          </Alert>
          {/* Tilbage og Fortsæt */}
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={onBack} type="button">
              <MdArrowLeft size={20} />
              Back {/* Tilbage til forrige trin */}
            </Button>
            <Button
              className="text-white"
              type="submit"
              variant="tertiary"
              disabled={!isPaymentValid()} // Deaktiveret uden gyldige betalingsdata
              onClick={handleSubmit}
            >
              Complete purchase {/* Fuldfør betaling */}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
