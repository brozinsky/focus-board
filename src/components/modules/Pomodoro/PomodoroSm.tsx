import PomodoroSessions from "./PomodoroSessions";
import PomodoroControls from "./PomodoroControls";
import GaugeCircle from "@/components/ui/GaugeCircle/GaugeCircle";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import usePomodoro from "@/hooks/usePomodoro";
import { formatDuration } from "@/utils/clock.utils";

const TOTAL_SESSIONS = 4;

const PomodoroSm = () => {
  const { currentSession, isWorkSession } = usePomodoroStore();

  const {
    handleStart,
    handlePause,
    handleRestart,
    handleNext,
    handlePrev,
    handleAdd10Minutes,
    progress,
    timeLeft,
    isRunning,
  } = usePomodoro();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <GaugeCircle
          max={100}
          min={0}
          value={progress}
          gaugePrimaryColor="var(--color-primary)"
          gaugeSecondaryColor="var(--color-primary)"
          className="h-80 w-80 glass-blur rounded-full"
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
      </div>
      <PomodoroControls
        {...{
          handleStart,
          handlePause,
          handleRestart,
          handleNext,
          handlePrev,
          handleAdd10Minutes,
          isRunning,
          currentSession,
          isWorkSession
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
  );
};

export default PomodoroSm;
