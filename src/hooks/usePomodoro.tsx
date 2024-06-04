import { useEffect, useRef, useState } from "react";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";

const TOTAL_SESSIONS = 4;

const usePomodoro = () => {
  const {
    workTimeMin,
    setWorkTimeMin,
    breakTimeMin,
    setBreakTimeMin,
    longBreakTimeMin,
    setLongBreakTimeMin,
    currentSession,
    setCurrentSession,
    isWorkSession,
    setIsWorkSession,
    timeOption,
    setTimeOption,
  } = usePomodoroStore();

  const [progress, setProgress] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(workTimeMin * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
      setProgress(100);
    } else if (currentSession === TOTAL_SESSIONS) {
      setTimeLeft(longBreakTimeMin * 60);
      setProgress(100);
    } else {
      setTimeLeft(breakTimeMin * 60);
      setProgress(100);
    }
  };

  useEffect(() => {
    handleRestart();
  }, [workTimeMin, breakTimeMin, longBreakTimeMin]);

  const handleNext = () => {
    if (isWorkSession && currentSession < TOTAL_SESSIONS) {
      setIsWorkSession(false);
      setTimeLeft(breakTimeMin * 60);
    } else if (!isWorkSession && currentSession < TOTAL_SESSIONS) {
      setIsWorkSession(true);
      setCurrentSession(currentSession + 1);
      setTimeLeft(workTimeMin * 60);
    } else if (isWorkSession && currentSession === TOTAL_SESSIONS) {
      setIsWorkSession(false);
      setTimeLeft(longBreakTimeMin * 60);
    } else if (!isWorkSession && currentSession === TOTAL_SESSIONS) {
      setIsWorkSession(true);
      setCurrentSession(1);
      setTimeLeft(workTimeMin * 60);
    }
    setProgress(100);
    setIsRunning(true);
  };

  useEffect(() => {
    if (timeOption === "25/5") {
      setWorkTimeMin(25);
      setBreakTimeMin(5);
      setLongBreakTimeMin(10);
    } else if (timeOption === "30/5") {
      setWorkTimeMin(30);
      setBreakTimeMin(10);
      setLongBreakTimeMin(20);
    } else if (timeOption === "50/10") {
      setWorkTimeMin(50);
      setBreakTimeMin(10);
      setLongBreakTimeMin(20);
    } else if (timeOption === "custom") {
    }

    handleRestart();
  }, [timeOption]);

  const handleAdd10Minutes = () => {
    setTimeLeft(timeLeft + 600);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        if (isWorkSession) {
          setProgress(
            (prevProgress) => prevProgress - 100 / (workTimeMin * 60)
          );
        } else if (currentSession === TOTAL_SESSIONS) {
          setProgress(
            (prevProgress) => prevProgress - 100 / (longBreakTimeMin * 60)
          );
        } else {
          setProgress(
            (prevProgress) => prevProgress - 100 / (breakTimeMin * 60)
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
  }, [timeLeft]);

  return {
    handleStart,
    handlePause,
    handleRestart,
    handleNext,
    handleAdd10Minutes,
    setTimeOption,
    progress,
    timeOption,
    timeLeft,
    isRunning,
  };
};

export default usePomodoro;
