import WindowHabitTracker from "./WindowHabitTracker";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useWindowsStore, {
  createHandleDragEnd,
} from "@/stores/zustand/global/windows.store";
import { restrictToParentElement } from "@dnd-kit/modifiers";

const HabitTracker = () => {
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
        onDragEnd={createHandleDragEnd("habitTracker")}
        sensors={sensors}
      >
        <WindowHabitTracker
          styles={{
            position: "absolute",
            left: `${windowPosition.habitTracker.x}px`,
            top: `${windowPosition.habitTracker.y}px`,
          }}
        />
      </DndContext>
    </div>
  );
};

export default HabitTracker;
