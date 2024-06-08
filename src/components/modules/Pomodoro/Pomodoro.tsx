import GaugeCircle from "@/components/ui/GaugeCircle/GaugeCircle";
import usePomodoro from "@/hooks/usePomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import { formatDuration } from "@/utils/functions/fn-clock";
import PomodoroControls from "./PomodoroControls";
import PomodoroSessions from "./PomodoroSessions";
import { useEffect, useRef, useState } from "react";
// import PomodoroTimeOptions from "./PomodoroTimeOptions";
import bellRingMP3 from "@/assets/audio/one-shots/bell-ring.mp3";
import Button from "@/components/ui/buttons/Button";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import PomodoroSettings from "./PomodoroSettings";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";

const TOTAL_SESSIONS = 4;

const Pomodoro = () => {
  const soundRef = useRef<Howl | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleStart,
    handlePause,
    handleRestart,
    handleNext,
    handleAdd10Minutes,
    progress,
    timeOption,
    timeLeft,
    isRunning,
    setTimeOption,
  } = usePomodoro();

  const { currentSession, isWorkSession, isSoundNotification } =
    usePomodoroStore();

  useEffect(() => {
    soundRef.current = new Howl({
      src: [bellRingMP3],
    });
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && isSoundNotification) {
      soundRef.current?.play();
    }
  }, [timeLeft]);

  return (
    <>
      <PomodoroSettings
        handleOptionChange={setTimeOption}
        {...{
          timeOption,
        }}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <div className="border-[2px] border-white/30 rounded-lg glass-dark absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 text-neutral-100 z-20">
        <button className={"button-close"} onClick={() => setIsModalOpen(false)}>
          <CloseIconSVG />
        </button>
        <div className="flex flex-col items-center gap-1 cursor-default p-8">
          <div className="relative">
            <GaugeCircle
              max={100}
              min={0}
              value={progress}
              gaugePrimaryColor="var(--color-primary-200)"
              gaugeSecondaryColor="var(--color-neutral-200)"
              className="h-80 w-80 glass-blur glass-bg-dark rounded-full"
              displayValue={formatDuration(timeLeft)}
              sessionName={
                isWorkSession
                  ? "Focus"
                  : currentSession === TOTAL_SESSIONS
                  ? "Long Break"
                  : "Break"
              }
              {...{
                handleStart,
                handlePause,
                isRunning,
              }}
            />
            <div className="flex justify-end absolute bottom-0 right-0">
              <Button
                variant="glass-ghost"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                <SettingsIconSVG />
              </Button>
            </div>
          </div>
          <PomodoroControls
            {...{
              handleStart,
              handlePause,
              handleRestart,
              handleNext,
              handleAdd10Minutes,
              isRunning,
            }}
          />
          <PomodoroSessions
            {...{
              isWorkSession,
              currentSession,
              totalSessions: TOTAL_SESSIONS,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Pomodoro;
