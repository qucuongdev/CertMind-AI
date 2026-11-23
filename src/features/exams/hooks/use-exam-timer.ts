"use client";

import { useState, useEffect, useRef } from "react";

interface UseExamTimerOptions {
  durationMinutes: number;
  onTimeExpired: () => void;
  isRunning?: boolean;
}

export function useExamTimer({
  durationMinutes,
  onTimeExpired,
  isRunning = true,
}: UseExamTimerOptions) {
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);
  const onTimeExpiredRef = useRef(onTimeExpired);

  useEffect(() => {
    onTimeExpiredRef.current = onTimeExpired;
  }, [onTimeExpired]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpiredRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = secondsRemaining <= 300; // less than 5 minutes

  return {
    secondsRemaining,
    formattedTime,
    isUrgent,
    percentageRemaining: Math.round((secondsRemaining / (durationMinutes * 60)) * 100),
  };
}
