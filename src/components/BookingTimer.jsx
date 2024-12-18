import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

// Custom hook til at bruge timeren across components
const useBookingTimer = (initialMinutes = 15) => {
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const resetTimer = () => {
    setTimeRemaining(initialMinutes * 60);
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resumeTimer = () => {
    setIsTimerActive(true);
  };

  // Formater tid som minutter og sekunder
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    timeRemaining,
    isTimerActive,
    formatTime,
    resetTimer,
    pauseTimer,
    resumeTimer
  };
};

// Timer Component på 15 minutter
const BookingTimer = ({ initialMinutes = 15 }) => {
  const { timeRemaining, isTimerActive, formatTime } = useBookingTimer(initialMinutes);

  // Farveændring baseret på tid tilbage
  const getTimerColor = () => {
    if (timeRemaining > 180) return 'text-green-800'; // More than 3 minutes
    if (timeRemaining > 60) return 'text-yellow-800'; // Between 1-3 minutes
    return 'text-red-800'; // Less than 1 minute
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
      <Timer className={`${getTimerColor()} w-6 h-6`} />
      <span className={`font-bold text-lg ${getTimerColor()}`}>
        {formatTime(timeRemaining)}
      </span>
      {!isTimerActive && (
        <span className="text-red-600 ml-2">Your session expired!</span>
      )}
    </div>
  );
};

export default BookingTimer;