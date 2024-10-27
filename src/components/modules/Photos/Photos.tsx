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

export default function Photos() {
  const { polaroids, setPolaroids } = usePolaroidStore();

  function handleDragEnd(e: DragEndEvent) {
    const item = polaroids.find((x) => x.id === e.active.id);
    if (item) {
      item.position.x += e.delta.x;
      item.position.y += e.delta.y;
      const _items = polaroids.map((x) => {
        if (x.id === item.id) return item;
        return x;
      });
      // setStickyNotes(_notes);
      setPolaroids(_items);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

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
            {...polaroid}
            styles={{
              position: "absolute",
              left: `${polaroid.position.x}px`,
              top: `${polaroid.position.y}px`,
            }}
          />
        ))}
      </DndContext>
    </div>

    // <div className="z-50 absolute top-0 left-0 right-0 bottom-10 flex flex-col items-center justify-center min-h-screen p-4">
    //   <div className="w-full max-w-3xl overflow-x-auto">
    //     <div className="flex space-x-4 p-20">
    //       {polaroids.map((polaroid) => (
    //         <Polaroid {...polaroid} />
    //       ))}
    //       <Button
    //         className="w-16 h-16 rounded-full flex-shrink-0 self-center"
    //         onClick={addNewPolaroid}
    //       >
    //         <Plus className="h-6 w-6" />
    //       </Button>
    //     </div>
    //   </div>
    //   <link
    //     href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"
    //     rel="stylesheet"
    //   />
    // </div>
  );
}
