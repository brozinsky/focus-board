import React from "react";
import PomodoroSessions from "./PomodoroSessions";
import PomodoroControls from "./PomodoroControls";
import GaugeCircle from "@/components/ui/GaugeCircle/GaugeCircle";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import usePomodoro from "@/hooks/usePomodoro";
import { formatDuration } from "@/utils/functions/fn-clock";
import { useDraggable } from "@dnd-kit/core";

const TOTAL_SESSIONS = 4;

type TProps = {
  setIsOpen: (value: boolean) => void;
  styles: any;
};

const PomodoroSm = ({ setIsOpen, styles }: TProps) => {
  const { setIsPomodoroOpen, currentSession, isWorkSession } =
    usePomodoroStore();

  const {
    handleStart,
    handlePause,
    handleRestart,
    handleNext,
    handleAdd10Minutes,
    progress,
    timeLeft,
    isRunning,
  } = usePomodoro();

  const id = "pomodoro";

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      data-no-dnd="true"
      {...listeners}
      {...attributes}
      style={{ ...style, ...styles }}
      className="pointer-events-auto"
    >
      <div className="group/timer bg-background-glass rounded-lg absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 text-neutral-100 z-20">
        <ButtonIcon
          className="right-0 top-0 absolute group-hover/timer:flex hidden transition opacity-50"
          variant="glass"
          size="sm"
          onClick={() => setIsPomodoroOpen(false)}
          icon={<CloseIconSVG />}
          tooltip={"Close timer"}
        />
        <ButtonIcon
          className="right-10 top-0 absolute group-hover/timer:flex hidden transition opacity-50"
          variant="glass"
          size="sm"
          onClick={() => setIsOpen(true)}
          icon={<SettingsIconSVG />}
          tooltip={"Timer settings"}
        />
        <div className="flex flex-col items-center gap-1 cursor-default p-8">
          <div className="relative">
            <GaugeCircle
              max={100}
              min={0}
              value={progress}
              gaugePrimaryColor="var(--color-primary)"
              gaugeSecondaryColor="var(--color-neutral-200)"
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
    </div>
  );
};

export default PomodoroSm;
