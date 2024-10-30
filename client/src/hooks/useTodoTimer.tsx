import React, { useEffect, useState } from "react";

const useTodoTimer = (timerRef: React.MutableRefObject<number | null>) => {
  const maxTime = 1500;

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((prev) => {
          if (prev < maxTime) {
            return prev + 1;
          } else {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsCompleted(true);
            return maxTime;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
    }
    return () => clearInterval(timerRef.current!);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
    isCompleted && setIsCompleted(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current!);
    setTimeElapsed(0);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const handleTask = () => {
    setIsCompleted(!isCompleted);
    setIsRunning(false);
  };
  return {
    maxTime,
    isRunning,
    isCompleted,
    handleTask,
    handleReset,
    handleStartPause,
    timeElapsed,
  };
};

export default useTodoTimer;
