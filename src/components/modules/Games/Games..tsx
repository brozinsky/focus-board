import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import useWindowsStore, {
  createHandleDragEnd,
} from "@/stores/zustand/useWindowsStore";
import Saper from "./Saper/Saper";

const Games = () => {
  const { windowPosition, isOpen } = useWindowsStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  if (!isOpen.saper) {
    return null;
  }

  return (
    <>
      <div className="absolute pointer-events-none z-40 overflow-hidden top-4 right-4 left-4 bottom-4">
        <DndContext
          autoScroll={false}
          modifiers={[restrictToParentElement]}
          onDragEnd={createHandleDragEnd("saper")}
          sensors={sensors}
        >
          {isOpen.saper && (
            <Saper
              styles={{
                position: "absolute",
                left: `${windowPosition.saper.x}px`,
                top: `${windowPosition.saper.y}px`,
              }}
            />
          )}
        </DndContext>
      </div>
    </>
  );
};

export default Games;
