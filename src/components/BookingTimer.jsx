import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";

// Custom hook til at styre timerens logik
const useBookingTimer = (initialMinutes = 15) => {
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60); // Sætter tiden i sekunder
  const [isTimerActive, setIsTimerActive] = useState(true); // Om timeren kører

  useEffect(() => {
    let interval;
    if (isTimerActive && timeRemaining > 0) {
      // Starter intervallet, hvis timeren er aktiv og der er tid tilbage
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1); // Reducerer tiden hvert sekund
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerActive(false); // Stopper timeren, når tiden løber ud
    }

    return () => clearInterval(interval); // Rydder intervallet, når komponenten unmountes
  }, [isTimerActive, timeRemaining]);

  // Nulstiller timeren
  const resetTimer = () => {
    setTimeRemaining(initialMinutes * 60);
    setIsTimerActive(true);
  };

  // Pauser timeren
  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  // Genoptager timeren
  const resumeTimer = () => {
    setIsTimerActive(true);
  };

  // Formater tid som minutter og sekunder
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    timeRemaining,
    isTimerActive,
    formatTime,
    resetTimer,
    pauseTimer,
    resumeTimer,
  };
};

// Timer-komponenten, der viser en visuel nedtælling
const BookingTimer = ({ initialMinutes = 15 }) => {
  const { timeRemaining, isTimerActive, formatTime } = useBookingTimer(initialMinutes);

  // Skifter farven afhængigt af tid tilbage
  const getTimerColor = () => {
    if (timeRemaining > 180) return "text-green-800"; // Over 3 minutter tilbage
    if (timeRemaining > 60) return "text-yellow-800"; // Mellem 1 og 3 minutter tilbage
    return "text-red-800"; // Mindre end 1 minut tilbage
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
      <Timer className={`${getTimerColor()} w-6 h-6`} /> {/* Timer-ikon */}
      <span className={`font-bold text-lg ${getTimerColor()}`}>
        {formatTime(timeRemaining)} {/* Viser formateret tid */}
      </span>
      {!isTimerActive && <span className="text-red-600 ml-2">Your session expired!</span>} {/* Besked hvis tiden er udløbet */}
    </div>
  );
};

export default BookingTimer;
