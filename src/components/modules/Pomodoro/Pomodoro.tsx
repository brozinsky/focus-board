import usePomodoro from "@/hooks/usePomodoro";
import usePomodoroStore from "@/stores/zustand/timer/pomodoro.store";
import { useEffect, useRef, useState } from "react";
import bellRingMP3 from "@/assets/audio/one-shots/bell-ring.mp3";
import PomodoroSettings from "./PomodoroSettings";
import PomodoroSm from "./PomodoroSm";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import useWindowsStore, {
  createHandleDragEnd,
} from "@/stores/zustand/global/windows.store";
import PomodoroMobile from "./PomodoroMobile";
import PomodoroWindow from "./PomodoroWindow";

const Pomodoro = () => {
  const soundRef = useRef<Howl | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { timeOption, timeLeft, setTimeOption } = usePomodoro();
  const { isSoundNotification } = usePomodoroStore();
  const { windowPosition } = useWindowsStore();

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <>
      <div className="absolute md:pointer-events-none z-40 overflow-hidden top-4 right-4 left-4 bottom-4">
        {window.innerWidth >= 768 ? (
          <DndContext
            autoScroll={false}
            modifiers={[restrictToParentElement]}
            onDragEnd={createHandleDragEnd("pomodoro")}
            sensors={sensors}
          >
            <PomodoroWindow
              styles={{
                position: "absolute",
                left: `${windowPosition.pomodoro.x}px`,
                top: `${windowPosition.pomodoro.y}px`,
              }}
              setIsSettingsOpen={setIsSettingsOpen}
            />
          </DndContext>
        ) : (
          <PomodoroMobile />
        )}
      </div>
      <PomodoroSettings
        handleOptionChange={setTimeOption}
        {...{
          timeOption,
        }}
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
      />
    </>
  );
};

export default Pomodoro;
