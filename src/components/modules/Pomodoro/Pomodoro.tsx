import GaugeCircle from "@/components/ui/GaugeCircle/GaugeCircle";
import React, { useState, useEffect, useRef } from "react";

const Pomodoro = () => {
  const TIME_MIN = 5;
  const [progress, setProgress] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(TIME_MIN * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        setProgress((prevProgress) => prevProgress - 100 / (TIME_MIN * 60)); // Decrease progress
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRunning(false);
      setTimeLeft(0);
      setProgress(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="glass-blur absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 text-neutral-100 z-20">
      <div className="flex flex-col items-center gap-1 cursor-default p-8">
        <GaugeCircle
          max={100}
          min={0}
          value={progress}
          gaugePrimaryColor="var(--color-primary-200)"
          gaugeSecondaryColor="var(--color-neutral-200)"
          className="h-80 w-80 glass-blur glass-bg-dark rounded-full"
          displayValue={formatTime(timeLeft)}
        />
        <button onClick={handleStart} className="mt-4">
          Start
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
