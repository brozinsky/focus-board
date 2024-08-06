import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { StickyNote } from "./StickyNote";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";
import { restrictToParentElement } from "@dnd-kit/modifiers";

const StickyNotes = () => {
  const { stickyNotes, setStickyNotes, areNotesVisible } =
    useStickyNotesStore();

  function handleDragEnd(e: DragEndEvent) {
    const note = stickyNotes.find((x) => x.id === e.active.id);
    if (note) {
      note.position.x += e.delta.x;
      note.position.y += e.delta.y;
      const _notes = stickyNotes.map((x) => {
        if (x.id === note.id) return note;
        return x;
      });
      setStickyNotes(_notes);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  if (!areNotesVisible) {
    return null;
  }
  return (
    <div className="absolute z-20 overflow-hidden top-4 right-4 left-4 bottom-4">
      <DndContext
        autoScroll={false}
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {stickyNotes.map((note) => (
          <StickyNote
            key={note.id}
            color={note.color}
            styles={{
              position: "absolute",
              left: `${note.position.x}px`,
              top: `${note.position.y}px`,
            }}
            id={note.id}
            content={note.content}
            title={note.title}
            isTitle={note.isTitle}
            isContent={note.isContent}
            isTodos={note.isTodos}
            todos={note.todos}
          />
        ))}
      </DndContext>
    </div>
  );
};

export default StickyNotes;
