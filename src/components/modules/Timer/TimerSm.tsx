import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useFormatTimer from "@/hooks/useFormatTimer";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import RefreshSVG from "@/components/elements/svg/icons/media/RefreshSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";

const TimerSm = () => {
  const { formatTime } = useFormatTimer();
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timeEstimation = 1500;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeElapsed >= timeEstimation) {
      clearInterval(timerRef.current!);
      setIsRunning(false);
      setIsCompleted(true);
    }
  }, [timeElapsed, timeEstimation]);

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current!);
      setIsRunning(false);
    } else {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current!);
    setTimeElapsed(0);
    setIsRunning(false);
    setIsCompleted(false);
  };

  return (
    <div className="flex-between gap-4 mb-2 min-w-[291px]">
      <div
        className={cn(
          isCompleted ? "opacity-50" : "",
          "flex items-center gap-2"
        )}
      >
        <div className="text-3xl text-center">{formatTime(timeElapsed)}</div>
        <ButtonIcon
          className="hover:opacity-100 opacity-30 transition"
          onClick={handleReset}
          icon={<RefreshSVG />}
          variant="ghost"
          tooltip={"Restart timer"}
        />
      </div>

      <ButtonIcon
        className="rounded-full"
        size="lg"
        variant="glass"
        rounded="circle"
        onClick={handleStartPause}
        icon={isRunning ? <PauseIconSVG /> : <PlayIconSVG />}
        tooltip={isRunning ? "Pause" : "Play"}
      />
    </div>
  );
};

export default TimerSm;
