import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { StickyNote } from "./StickyNote";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useEffect } from "react";
import useStickyNotesDb from "@/stores/supabase/useStickyNotesDb";

const StickyNotesDb = () => {
  const {
    stickyNotes,
    dragStickyNote,
    stickyNotesPositions,
    areNotesVisible,
    fetchStickyNotes,
  } = useStickyNotesDb();

  useEffect(() => {
    fetchStickyNotes();
  }, []);

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
    <div className="absolute pointer-events-none z-20 overflow-hidden top-4 right-4 left-4 bottom-4">
      <DndContext
        autoScroll={false}
        modifiers={[restrictToParentElement]}
        onDragEnd={dragStickyNote}
        sensors={sensors}
      >
        {stickyNotes.map((note) => {
          const position = stickyNotesPositions.find(
            (x) => x.id === note.id
          ) || { x: 0, y: 0 };
          return (
            <StickyNote
              key={note.id}
              userStatus="online"
              color={note.color}
              styles={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
              }}
              id={note.id}
              content={note.content}
              title={note.title}
              isTitle={note.isTitle}
              isContent={note.isContent}
              isTodos={note.isTodos}
              todos={note.todos}
            />
          );
        })}
      </DndContext>
    </div>
  );
};

export default StickyNotesDb;
