import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useWindowsStore, {
  createHandleDragEnd,
} from "@/stores/zustand/useWindowsStore";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import WindowTimer from "./WindowTimer";

const Timer = () => {
  const { windowPosition } = useWindowsStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <div className="absolute pointer-events-none z-40 overflow-hidden top-4 right-4 left-4 bottom-4">
      <DndContext
        autoScroll={false}
        modifiers={[restrictToParentElement]}
        onDragEnd={createHandleDragEnd("timer")}
        sensors={sensors}
      >
        <WindowTimer
          styles={{
            position: "absolute",
            left: `${windowPosition.timer.x}px`,
            top: `${windowPosition.timer.y}px`,
          }}
        />
      </DndContext>
    </div>
  );
};

export default Timer;
