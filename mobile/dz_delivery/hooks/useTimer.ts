import { useState, useEffect, useCallback } from "react";

export const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((current) => current - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = useCallback(() => {
    setTime(initialTime);
    setIsActive(true);
  }, [initialTime]);

  return { time, startTimer, isActive };
};
