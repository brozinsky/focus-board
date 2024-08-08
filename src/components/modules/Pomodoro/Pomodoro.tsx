import usePomodoro from "@/hooks/usePomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import { useEffect, useRef, useState } from "react";
import bellRingMP3 from "@/assets/audio/one-shots/bell-ring.mp3";
import PomodoroSettings from "./PomodoroSettings";
import PomodoroSm from "./PomodoroSm";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { TPosition } from "@/types/model-types";

const Pomodoro = () => {
  const soundRef = useRef<Howl | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { timeOption, timeLeft, setTimeOption } = usePomodoro();
  const { isSoundNotification, windowPosition, setWindowPosition } =
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

  function handleDragEnd(e: DragEndEvent) {
    const { delta } = e;
    setWindowPosition((prevPosition: TPosition) => ({
      x: prevPosition.x + delta.x,
      y: prevPosition.y + delta.y,
    }));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <>
      <div className="absolute pointer-events-none z-40 overflow-hidden top-4 right-4 left-4 bottom-4">
        <DndContext
          autoScroll={false}
          modifiers={[restrictToParentElement]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <PomodoroSm
            styles={{
              position: "absolute",
              left: `${windowPosition.x}px`,
              top: `${windowPosition.y}px`,
            }}
            setIsOpen={setIsModalOpen}
          />
        </DndContext>
      </div>

      <PomodoroSettings
        handleOptionChange={setTimeOption}
        {...{
          timeOption,
        }}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
};

export default Pomodoro;
