import { getWeekDays } from "@/utils/functions/fn-date";
import React from "react";

const HabitHead = () => {
  const weekDays = getWeekDays();

  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="min-w-[33%]">Habit</div>
      <div className="grid grid-cols-7 gap-2 w-full items-center justify-center">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`text-center p-2 ${
              day.toDateString() === new Date().toDateString()
                ? "bg-white/20 text-white rounded"
                : ""
            }`}
          >
            <div>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div>{day.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitHead;
