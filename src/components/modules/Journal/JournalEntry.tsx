import { cn } from "@/lib/utils";
import React from "react";

const JournalEntry = ({
  title,
  date,
  id,
  setEntry,
  active,
}: {
  title: string;
  date: string;
  id: number;
  setEntry: (id: number) => void;
  active: boolean;
}) => {
  return (
    <div
      onClick={() => setEntry(id)}
      className={cn(
        "px-4 py-2 bg-input rounded-lg cursor-pointer opacity-40 transition duration-200 hover:opacity-90",
        active && "opacity-90"
      )}
    >
      <div className="text-lg mb-2 line-clamp-2">{title}</div>
      <div className="text-sm">{date}</div>
    </div>
  );
};

export default JournalEntry;
