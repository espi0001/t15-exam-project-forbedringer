"use client";
import { useState, useEffect } from "react";

import { api } from "@/lib/api";
// import { useReservationTimer } from "@/hooks/useReservationTimer";
import TicketSelection from "./booking/TicketSelection"; // Trin 1
import CampingOptions from "./booking/CampingOptions"; // Trin 2
import PersonalInfo from "./booking/PersonalInfo"; // Trin 3
import Checkout from "./booking/Checkout"; // Trin 4
import Confirmation from "./booking/Confirmation"; // Trin 5
import BookingTimer from "./BookingTimer";

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

  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  // Timer logic
  useEffect(() => {
    let intervalId;
    const RESERVATION_TIME = 5 * 60; // 15 minutes in seconds

    if (startTime && step > 1 && step < 5) {
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        const remaining = RESERVATION_TIME - elapsedSeconds;

        if (remaining <= 0) {
          setTimeLeft(0);
          setIsExpired(true);
          clearInterval(intervalId);
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [startTime, step]);

  // State til at holde reservationens ID, hvis det genereres
  const [reservationId, setReservationId] = useState("");

  // Håndtering af trinændring
  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  // Custom setter for booking data that starts the timer when tickets are chosen
  const setBookingDataWithTimer = (newData) => {
    // If ticket type and count are set, start the timer
    if (newData.ticketType && newData.ticketCount > 0 && !startTime) {
      setStartTime(Date.now());
    }
    setBookingData(newData);
  };

  // Håndtering af formularens indsendelse
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isExpired) {
      alert("Reservation time has expired. Please start over.");
      return;
    }

    if (step === 3) {
      // Validering forbliver den samme
      if (bookingData.personalInfo.length !== bookingData.ticketCount || !bookingData.personalInfo.every((info) => info.name && info.email)) {
        alert("Please complete all personal information before proceeding.");
        return;
      }
      handleStepChange(4);
    } else if (step === 4) {
      handleStepChange(5); // Lad Checkout.jsx håndtere reservationen
    } else {
      handleStepChange(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Tid tilbage til reservationen vises, hvis en timer blev brugt */}
      {timeLeft !== null && step > 1 && step < 5 && !isExpired && (
        <div className="mb-4 text-white text-center">
          <BookingTimer initialMinutes={15} timeRemaining={timeLeft} isExpired={isExpired} />
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
          setReservationId={setReservationId}
          onNext={() => handleStepChange(5)} // Går videre til trin 5
          onBack={() => handleStepChange(3)} // Går tilbage til trin 3
        />
      )}

      {/* Trin 5: Bekræftelse */}
      {step === 5 && (
        <Confirmation
          reservationId={reservationId}
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
