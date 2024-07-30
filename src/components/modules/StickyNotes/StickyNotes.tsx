import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { StickyNote } from "./StickyNote";
import { TStickyNote } from "@/types/model-types";
import useStickyNotesStore from "@/stores/zustand/useStickyNotesStore";

const StickyNotes = () => {
  const { stickyNotes, setStickyNotes } = useStickyNotesStore();

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
  return (
    <div className="flex flex-wrap absolute top-1/2 -translate-y-1/2 right-1/2 z-20 translate-x-1/2 gap-6">
      {stickyNotes.map((note) => (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
          />
        </DndContext>
      ))}
    </div>
  );
};

export default StickyNotes;
