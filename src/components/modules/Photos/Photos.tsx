import Polaroid from "./Polaroid";
import usePolaroidStore from "@/stores/zustand/usePolaroidStore";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useEffect } from "react";

export default function Photos() {
  const { polaroids, setPolaroids, arePhotosVisible } = usePolaroidStore();

  function handleDragEnd(e: DragEndEvent) {
    const item = polaroids.find((x) => x.id === e.active.id);
    if (item) {
      item.position.x += e.delta.x;
      item.position.y += e.delta.y;
      const _items = polaroids.map((x) => {
        if (x.id === item.id) return item;
        return x;
      });
      setPolaroids(_items);
    }
  }
  useEffect(() => {
    console.log(polaroids);
  }, [polaroids]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    console.log(polaroids);
  }, [polaroids]);

  if (!arePhotosVisible) {
    return null;
  }
  return (
    <div className="absolute pointer-events-none z-20 overflow-hidden top-4 right-4 left-4 bottom-4">
      <DndContext
        autoScroll={false}
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {polaroids.map((polaroid) => (
          <Polaroid
            key={polaroid.id}
            {...polaroid}
            styles={{
              position: "absolute",
              left: `${polaroid.position.x}px`,
              top: `${polaroid.position.y}px`,
            }}
          />
        ))}
      </DndContext>
      <link
        href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
