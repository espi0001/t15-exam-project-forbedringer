"use client";
import { useState } from "react";
import { Button } from "./ui/button";

import { api } from "@/lib/api";
// import { useReservationTimer } from "@/hooks/useReservationTimer";
import TicketSelection from "./booking/TicketSelection"; // Trin 1
import CampingOptions from "./booking/CampingOptions"; // Trin 2
import PersonalInfo from "./booking/PersonalInfo"; // Trin 3
import Checkout from "./booking/Checkout"; // Trin 4
import Confirmation from "./booking/Confirmation"; // Trin 5

export default function BookingFlow() {
  const [step, setStep] = useState(1); // Hvilket trin er aktuelt
  // State til at gemme data fra de forskellige trin i bookingprocessen
  const [bookingData, setBookingData] = useState({
    ticketType: "", // Type billet
    ticketCount: 1, // Antal billetter
    campingArea: "", // Valgt campingområde
    greenCamping: false, // Indikerer om grøn camping er valgt
    tentSetup: "", // Valg af teltopsætning
    personalInfo: [], // Liste med personlige oplysninger
  });

  //   const [startTime, setStartTime] = useState(null);
  //   const { timeLeft, isExpired } = useReservationTimer(startTime);

  // State til at holde reservationens ID, hvis det genereres
  const [reservationId, setReservationId] = useState("");

  // Håndtering af trinændring
  const handleStepChange = (newStep) => setStep(newStep);

  // Håndtering af formularens indsendelse
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 3) {
      // Valider personalInfo-data
      if (bookingData.personalInfo.length !== bookingData.ticketCount || !bookingData.personalInfo.every((info) => info.name && info.email)) {
        alert("Please complete all personal information before proceeding.");
        return;
      }
      handleStepChange(4); // Gå til næste trin
    } else if (step === 4) {
      console.log("Booking data submitted:", bookingData);
      setStep(5);
    } else {
      handleStepChange(step + 1);
    }
  };

  // Funktion til at håndtere ændring af trin
  // const handleStepChange = async (newStep) => {
  //   if (newStep === 2 && step === 1) {
  //     // Hvis brugeren går fra trin 1 til trin 2, kunne vi starte en timer (kommenteret ud her)
  //     //   setStartTime(Date.now());
  //   }
  //   setStep(newStep); // Opdaterer det aktuelle trin
  // };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Tid tilbage til reservationen vises, hvis en timer blev brugt */}
      {/* {timeLeft && step > 1 && step < 5 && <div className="mb-4 text-white text-center">Time remaining: {Math.ceil(timeLeft / 1000)}s</div>} */}
      {/* Trin 1: Valg af billetter */}
      {step === 1 && (
        <TicketSelection
          bookingData={bookingData}
          setBookingData={setBookingData}
          onNext={() => handleStepChange(2)} // Går videre til trin 2
        />
      )}

      {/* Trin 2: Valg af campingmuligheder */}
      {step === 2 && (
        <CampingOptions
          bookingData={bookingData}
          setBookingData={setBookingData}
          onNext={() => handleStepChange(3)} // Går videre til trin 3
          onBack={() => handleStepChange(1)} // Går videre til trin 1
        />
      )}

      {/* Trin 3: Indtastning af personlige oplysninger */}
      {step === 3 && (
        <PersonalInfo
          bookingData={bookingData}
          setBookingData={setBookingData}
          onNext={() => handleStepChange(4)} // Går videre til trin 4
          onBack={() => handleStepChange(2)} // Går tilbage til trin 2
        />
      )}

      {/* Trin 4: Checkout */}
      {step === 4 && (
        <Checkout
          bookingData={bookingData}
          setReservationId={setReservationId}
          onNext={() => handleStepChange(5)} // Går videre til trin 5
          onBack={() => handleStepChange(3)} // Går tilbage til trin 3
        />
      )}

      {/* Trin 5: Bekræftelse */}
      {step === 5 && (
        <Confirmation
          reservationId={reservationId} // Viser bekræftelses-ID
          onReset={() => {
            setStep(1);
            setBookingData({
              ticketType: "",
              ticketCount: 1,
              campingArea: "",
              greenCamping: false,
              tentSetup: "",
              personalInfo: [],
            });
            setReservationId(""); // Fjerner reservationens ID
            // setStartTime(null); // Nulstiller timeren (hvis brugt)
          }}
        />
      )}
    </form>
  );
}
