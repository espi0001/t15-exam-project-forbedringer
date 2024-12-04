"use client";

import { useState } from "react";
import { api } from "@/lib/api";
// import { useReservationTimer } from "@/hooks/useReservationTimer";
import TicketSelection from "./booking/TicketSelection";
import CampingOptions from "./booking/CampingOptions";
import PersonalInfo from "./booking/PersonalInfo";
import Checkout from "./booking/Checkout";
import Confirmation from "./booking/Confirmation";

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    ticketType: "",
    ticketCount: 1,
    campingArea: "",
    greenCamping: false,
    tentSetup: "",
    personalInfo: [],
  });
  const [reservationId, setReservationId] = useState("");
  //   const [startTime, setStartTime] = useState(null);
  //   const { timeLeft, isExpired } = useReservationTimer(startTime);

  const handleStepChange = async (newStep) => {
    if (newStep === 2 && step === 1) {
      //   setStartTime(Date.now());
    }
    setStep(newStep);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* {timeLeft && step > 1 && step < 5 && <div className="mb-4 text-white text-center">Time remaining: {Math.ceil(timeLeft / 1000)}s</div>} */}

      {step === 1 && <TicketSelection bookingData={bookingData} setBookingData={setBookingData} onNext={() => handleStepChange(2)} />}

      {step === 2 && <CampingOptions bookingData={bookingData} setBookingData={setBookingData} onNext={() => handleStepChange(3)} onBack={() => handleStepChange(1)} />}

      {step === 3 && <PersonalInfo bookingData={bookingData} setBookingData={setBookingData} onNext={() => handleStepChange(4)} onBack={() => handleStepChange(2)} />}

      {step === 4 && <Checkout bookingData={bookingData} setReservationId={setReservationId} onNext={() => handleStepChange(5)} onBack={() => handleStepChange(3)} />}

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
          }}
        />
      )}
    </div>
  );
}
