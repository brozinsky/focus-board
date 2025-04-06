import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useFormatTimer from "@/hooks/useFormatTimer";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import RefreshSVG from "@/components/elements/svg/icons/media/RefreshSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import { Input } from "@/components/ui/inputs/Input";
import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import bellRingMP3 from "@/assets/audio/one-shots/bell-ring.mp3";
import Progress from "@/components/ui/progress/Progress";

const TimerSm = () => {
  const { formatTime } = useFormatTimer();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [timeInput, setTimeInput] = useState<number>(1500);
  const [mode, setMode] = useState<"stopwatch" | "timer">("stopwatch");
  const timerRef = useRef<number | null>(null);
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [bellRingMP3],
    });
  }, []);

  useEffect(() => {
    if (mode === "timer" && timeElapsed === 0 && isRunning) {
      soundRef.current?.play();
    }
  }, [timeElapsed]);

  useEffect(() => {
    if (mode === "timer" && timeElapsed <= 0 && isRunning) {
      clearInterval(timerRef.current!);
      setIsRunning(false);
      setIsCompleted(true);
    }
  }, [timeElapsed, mode, isRunning]);

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current!);
      setIsRunning(false);
    } else {
      if (mode === "stopwatch") {
        timerRef.current = window.setInterval(() => {
          setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000);
      } else if (mode === "timer") {
        timerRef.current = window.setInterval(() => {
          setTimeElapsed((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);
      }
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setIsCompleted(false);
    if (mode === "stopwatch") {
      setTimeElapsed(0);
    } else if (mode === "timer") {
      setTimeElapsed(timeInput);
    }
  };

  const handleModeSwitch = (newMode: "stopwatch" | "timer") => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setIsCompleted(false);
    setMode(newMode);
    if (newMode === "stopwatch") {
      setTimeElapsed(0);
      setShowInputs(false);
    } else if (newMode === "timer") {
      setTimeElapsed(timeInput);
    }
  };

  const handleTimeInputChange = (
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeInput(totalSeconds);
    if (mode === "timer") {
      setTimeElapsed(totalSeconds);
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-2 min-w-[291px]">
      <div className="flex gap-2">
        <button
          className={cn(
            "font-regular transition-opacity hover:bg-white/20 p-2"
          )}
          onClick={() => handleModeSwitch("stopwatch")}
        >
          <span
            className={cn(mode === "stopwatch" ? "opacity-100" : "opacity-40")}
          >
            Stopwatch
          </span>
        </button>
        <button
          className={cn(
            "font-regular transition-opacity hover:bg-white/20 p-2"
          )}
          onClick={() => handleModeSwitch("timer")}
        >
          <span className={cn(mode === "timer" ? "opacity-100" : "opacity-40")}>
            Timer
          </span>
        </button>
      </div>

      <div
        className={cn(
          isCompleted ? "opacity-50" : "",
          "flex items-center gap-2 relative"
        )}
      >
        <div
          onClick={() => mode === "timer" && setShowInputs(true)}
          className={cn(
            showInputs && "opacity-0",
            mode === "timer" && "cursor-pointer user-select-none",
            "text-3xl text-center"
          )}
        >
          {formatTime(timeElapsed)}
        </div>
        <ButtonIcon
          className={cn(
            "hover:opacity-100 opacity-30 transition",
            showInputs && "opacity-0"
          )}
          onClick={handleReset}
          icon={<RefreshSVG />}
          variant="ghost"
          tooltip={"Restart"}
        />
        <ButtonIcon
          className={cn("ml-auto rounded-full", showInputs && "opacity-0")}
          size="lg"
          variant="glass"
          rounded="circle"
          onClick={handleStartPause}
          icon={isRunning ? <PauseIconSVG /> : <PlayIconSVG />}
          tooltip={isRunning ? "Pause" : "Play"}
        />
        {mode === "timer" && !isRunning && showInputs && (
          <div className="flex items-center gap-2 absolute inset-0">
            <Input
              className="w-14 text-center"
              type="number"
              min={0}
              max={23}
              value={Math.floor(timeInput / 3600)}
              onChange={(e) =>
                handleTimeInputChange(
                  Number(e.target.value),
                  Math.floor((timeInput % 3600) / 60),
                  timeInput % 60
                )
              }
              placeholder="hh"
            />
            <span>:</span>
            <Input
              className="w-14 text-center"
              type="number"
              min={0}
              max={59}
              value={Math.floor((timeInput % 3600) / 60)}
              onChange={(e) =>
                handleTimeInputChange(
                  Math.floor(timeInput / 3600),
                  Number(e.target.value),
                  timeInput % 60
                )
              }
              placeholder="mm"
            />
            <span>:</span>
            <Input
              className="w-14 text-center"
              type="number"
              min={0}
              max={59}
              value={timeInput % 60}
              onChange={(e) =>
                handleTimeInputChange(
                  Math.floor(timeInput / 3600),
                  Math.floor((timeInput % 3600) / 60),
                  Number(e.target.value)
                )
              }
              placeholder="ss"
            />
            <ButtonIcon
              type="button"
              className={cn(
                "ml-auto bg-background hover:bg-primary hover:opacity-100"
              )}
              onClick={() => {
                setShowInputs(false);
              }}
              icon={
                <CheckSVG pathClass="group-hover/edit:stroke-foreground-primary stroke-foreground" />
              }
              tooltip={"Confirm"}
            />
          </div>
        )}
      </div>
      {mode === "timer" && (
        <div className="flex items-center gap-2 mt-4">
          <Progress
            value={(1 - timeElapsed / timeInput) * 100}
          />
            <div className="w-10">
              {timeInput > 0
                ? `${Math.floor((1 - timeElapsed / timeInput) * 100)}%`
                : "0%"}
            </div>
        </div>
      )}
    </div>
  );
};

export default TimerSm;
