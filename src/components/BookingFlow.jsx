"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
// Trin komponenter for bookingprocessen + timer
import TicketSelection from "./booking/TicketSelection"; // Trin 1
import CampingOptions from "./booking/CampingOptions"; // Trin 2
import PersonalInfo from "./booking/PersonalInfo"; // Trin 3
import Checkout from "./booking/Checkout"; // Trin 4
import Confirmation from "./booking/Confirmation"; // Trin 5
import BookingTimer from "./BookingTimer";

export default function BookingFlow() {
  const [step, setStep] = useState(1); // Hvilket trin brugeren er op (starter på 1)

  // State til at gemme data fra de forskellige trin i bookingprocessen
  const [bookingData, setBookingData] = useState({
    ticketType: "", // Type billet
    ticketCount: 1, // Antal billetter
    campingArea: "", // Valgt campingområde
    greenCamping: false, // Om grøn camping er valgt
    tentSetup: "", // Valg af teltopsætning
    personalInfo: [], // Liste med personlige oplysninger
  });

  // Timer-relateret state
  const [startTime, setStartTime] = useState(null); // Starttidspunkt for timeren
  const [timeLeft, setTimeLeft] = useState(null); // Tid tilbage
  const [isExpired, setIsExpired] = useState(false); // Om tiden er udløbet

  // Håndterer timerlogik
  useEffect(() => {
    let intervalId;
    const RESERVATION_TIME = 5 * 60; // 5 min reservationstid

    if (startTime && step > 1 && step < 5) {
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000); // Beregner forløbne sek
        const remaining = RESERVATION_TIME - elapsedSeconds; // Beregner tid tilbage

        // Hvis tiden er udløbet, markerer vi det og stopper timeren
        if (remaining <= 0) {
          setTimeLeft(0); // Sætter tiden til 0, når tiden løber ud
          setIsExpired(true); // Marker, at tiden er udløbet
          clearInterval(intervalId); // Stopper timeren
        } else {
          setTimeLeft(remaining); // Opdaterer tid tilbage
        }
      }, 1000); // Opdateres hvert sekund
    }

    return () => clearInterval(intervalId); // Ryd op i komponentet når det fjernes
  }, [startTime, step]); // Afhængig af starttid og trin

  // State til at gemme reservationens ID, hvis det genereres
  const [reservationId, setReservationId] = useState("");

  // Håndtering af trinændring
  const handleStepChange = (newStep) => {
    setStep(newStep); // Opdaterer hvilket trin brugeren er på
  };

  // Opdaterer bookingData og starter timer, hvis det er nødvendigt
  const setBookingDataWithTimer = (newData) => {
    if (newData.ticketType && newData.ticketCount > 0 && !startTime) {
      setStartTime(Date.now()); // Starter timer når billetter vælges
    }
    setBookingData(newData);
  };

  // Håndtering af formularens indsendelse og validering
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isExpired) {
      alert("Reservation time has expired. Please start over.");
      return;
    }

    if (step === 3) {
      // Validering af personlige oplysninger
      if (bookingData.personalInfo.length !== bookingData.ticketCount || !bookingData.personalInfo.every((info) => info.name && info.email)) {
        alert("Please complete all personal information before proceeding.");
        return;
      }
      handleStepChange(4); // Går viedre til trin 4, Checkout.jsx
    } else if (step === 4) {
      handleStepChange(5); // Går videre til trin 5, Checkout.jsx (håndtere reservationen)
    } else {
      handleStepChange(step + 1); // Går til næste trin
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Viser timeren hvis den tæller ned */}
      {timeLeft !== null && step > 1 && step < 5 && !isExpired && (
        <div className="mb-4 text-white text-center">
          {/* Timeren som man kan se på en side */}
          <BookingTimer
            initialMinutes={5} // Timerens varighed
            timeRemaining={timeLeft} // Tid tilbage
            isExpired={isExpired} // Om tiden er udløbet
          />
        </div>
      )}

      {/* Trin 1: Valg af billetter */}
      {step === 1 && (
        <TicketSelection
          bookingData={bookingData}
          setBookingData={setBookingDataWithTimer}
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
          setReservationId={setReservationId} // Gemmer reservations-ID
          onNext={() => handleStepChange(5)} // Går videre til trin 5
          onBack={() => handleStepChange(3)} // Går tilbage til trin 3
        />
      )}

      {/* Trin 5: Bekræftelse */}
      {step === 5 && (
        <Confirmation
          reservationId={reservationId}
          onReset={() => {
            // Nulstiller bookingflowet og starter forfra
            setStep(1);
            setBookingData({
              ticketType: "",
              ticketCount: 1,
              campingArea: "",
              greenCamping: false,
              tentSetup: "",
              personalInfo: [],
            });
            setReservationId("");
            setStartTime(null);
            setTimeLeft(null);
            setIsExpired(false);
          }}
        />
      )}
    </form>
  );
}
