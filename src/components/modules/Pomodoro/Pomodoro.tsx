import GaugeCircle from "@/components/ui/GaugeCircle/GaugeCircle";
import usePomodoro from "@/hooks/usePomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import { formatDuration } from "@/utils/functions/fn-clock";
import PomodoroControls from "./PomodoroControls";
import PomodoroSessions from "./PomodoroSessions";
import PomodoroTimeOptions from "./PomodoroTimeOptions";

const TOTAL_SESSIONS = 4;

const Pomodoro = () => {
  const {
    handleStart,
    handlePause,
    handleRestart,
    handleNext,
    handleAdd10Minutes,
    handleOptionChange,
    progress,
    timeOption,
    timeLeft,
    isRunning,
  } = usePomodoro();

  const { currentSession, isWorkSession } = usePomodoroStore();

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
          displayValue={formatDuration(timeLeft)}
        />
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
        <PomodoroTimeOptions
          {...{
            timeOption,
            handleOptionChange,
          }}
        />
      </div>
    </div>
  );
};

export default Pomodoro;
