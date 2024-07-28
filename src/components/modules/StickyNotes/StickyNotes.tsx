import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { StickyNote } from "./StickyNote";

const notesData = [
  {
    id: "1",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "yellow",
  },
  {
    id: "0",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "cyan",
  },
  {
    id: "2",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "purple",
  },
  {
    id: "3",
    title: "Note",
    content: "Study English",
    position: {
      x: 0,
      y: 0,
    },
    color: "green",
  },
];

const StickyNotes = () => {
  const [notes, setNotes] = useState(notesData);

  function handleDragEnd(e: DragEndEvent) {
    const note = notes.find((x) => x.id === e.active.id);
    if (note) {
      note.position.x += e.delta.x;
      note.position.y += e.delta.y;
      const _notes = notes.map((x) => {
        if (x.id === note.id) return note;
        return x;
      });
      setNotes(_notes);
    }
  }

  return (
    <div className="flex flex-wrap absolute top-1/2 -translate-y-1/2 right-1/2 z-20 translate-x-1/2 gap-6">
      <DndContext onDragEnd={handleDragEnd}>
        {notes.map((note) => (
          <StickyNote
            color={note.color}
            styles={{
              position: "absolute",
              left: `${note.position.x}px`,
              top: `${note.position.y}px`,
            }}
            key={note.id}
            id={note.id}
            content={note.content}
            title={note.title}
          />
        ))}
      </DndContext>
    </div>
  );
};

export default StickyNotes;
