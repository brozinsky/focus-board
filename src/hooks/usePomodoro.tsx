import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import { useEffect, useRef } from "react";

const usePomodoro = () => {
  const {
    workTimeMin,
    breakTimeMin,
    longBreakTimeMin,
    timeLeft,
    isRunning,
    isWorkSession,
    currentSession,
    setTimeLeft,
    setProgress,
    setIsRunning,
    setIsWorkSession,
    setCurrentSession,
  } = usePomodoroStore();

  const timerRef = useRef<any>(null);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleRestart = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (isWorkSession) {
      setTimeLeft(workTimeMin * 60);
    } else if (currentSession === 4) {
      setTimeLeft(longBreakTimeMin * 60);
    } else {
      setTimeLeft(breakTimeMin * 60);
    }
    setProgress(100);
  };

  const handleNext = () => {
    setIsRunning(false);
    if (isWorkSession && currentSession < 4) {
      setIsWorkSession(false);
      setTimeLeft(breakTimeMin * 60);
    } else if (!isWorkSession && currentSession < 4) {
      setIsWorkSession(true);
      setCurrentSession(currentSession + 1);
      setTimeLeft(workTimeMin * 60);
    } else if (isWorkSession && currentSession === 4) {
      setIsWorkSession(false);
      setTimeLeft(longBreakTimeMin * 60);
    } else if (!isWorkSession && currentSession === 4) {
      setIsWorkSession(true);
      setCurrentSession(1);
      setTimeLeft(workTimeMin * 60);
    }
    setProgress(100);
  };

  const handleAdd10Minutes = () => {
    //@ts-ignore
    setTimeLeft((prevTimeLeft: number) => prevTimeLeft + 600);
    setProgress(
      //@ts-ignore
      (prevProgress: number) => (prevProgress * (timeLeft + 600)) / timeLeft
    );
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        //@ts-ignore
        setTimeLeft((prevTimeLeft: number) => prevTimeLeft - 1);
        if (isWorkSession) {
          setProgress(
            //@ts-ignore
            (prevProgress: number) => prevProgress - 100 / (workTimeMin * 60)
          );
        } else if (currentSession === 4) {
          setProgress(
            //@ts-ignore
            (prevProgress: number) =>
              prevProgress - 100 / (longBreakTimeMin * 60)
          );
        } else {
          setProgress(
            //@ts-ignore
            (prevProgress: number) => prevProgress - 100 / (breakTimeMin * 60)
          );
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    isRunning,
    isWorkSession,
    currentSession,
    workTimeMin,
    breakTimeMin,
    longBreakTimeMin,
    setTimeLeft,
    setProgress,
  ]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRunning(false);
      setTimeLeft(0);
      setProgress(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      handleNext();
    }
  }, [timeLeft, setIsRunning, setTimeLeft, setProgress, handleNext]);

  return {
    handleStart,
    handlePause,
    handleRestart,
    handleNext,
    handleAdd10Minutes,
  };
};

export default usePomodoro;
