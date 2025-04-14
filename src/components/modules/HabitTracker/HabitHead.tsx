import { getWeekDays } from "@/utils/functions/fn-date";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  RefreshCcw,
  RotateCcw,
} from "lucide-react";
import useHabitWeekStore from "@/stores/zustand/useHabitWeekStore";

const HabitHead = () => {
  const { weekOffset, incrementWeek, decrementWeek, resetWeek } =
    useHabitWeekStore();
  const weekDays = useMemo(() => getWeekDays(weekOffset), [weekOffset]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-2">
        <button
          onClick={decrementWeek}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-md font-normal">
          {weekDays[0].toLocaleDateString("en-US", { month: "long" })}
        </div>
        <div>
          {weekOffset !== 0 && (
            <button
              onClick={resetWeek}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Next week"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={incrementWeek}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Next week"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <div className="min-w-[33%]">Habit</div>
        <div className="flex items-center gap-2 relative">
          <div className="absolute -top-3 -right-3 text-xs">x2</div>
          <Flame className="w-4 h-4" />
        </div>
        <div className="grid grid-cols-7 gap-2 w-full items-center justify-center">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-2",
                day.getTime() > new Date().getTime() && "opacity-50",
                day.toDateString() === new Date().toDateString() &&
                  "bg-white/20 text-white rounded"
              )}
            >
              <div>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div>{day.getDate()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitHead;
