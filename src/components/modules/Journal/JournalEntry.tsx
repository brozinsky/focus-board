import { cn } from "@/lib/utils";
import React from "react";

const JournalEntry = ({
  title,
  date,
  id,
  setEntry,
  active,
  disabled,
}: {
  title: string;
  date: string;
  id: number;
  setEntry: (id: number) => void;
  active: boolean;
  disabled: boolean;
}) => {
  return (
    <div
      onClick={() => !disabled && setEntry(id)}
      className={cn(
        "px-4 py-2 bg-input rounded-lg opacity-40 transition duration-200",
        active && "opacity-90",
        disabled ? "cursor-default" : "hover:opacity-90 cursor-pointer"
      )}
    >
      <div className="text-lg mb-2 line-clamp-2">{title}</div>
      <div className="text-sm">{date}</div>
    </div>
  );
};

export default JournalEntry;
