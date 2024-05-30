import { MONTHS } from "@/lib/constants/const-clock";
import { useClockStore } from "@/stores/zustand/useClockStore";
import { getFormattedDate, getFormattedTime } from "@/utils/functions/fn-clock";
import React, { useEffect } from "react";

const Clock: React.FC = () => {
  const { date, hours24, setDate } = useClockStore();

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000);

    return () => clearInterval(intervalId);
  }, [setDate]);

  return (
    <div className="absolute right-4 top-4 p-4 text-neutral-100 z-20">
      <div className="flex flex-col gap-1 hover-glass-dark cursor-default p-4 rounded-lg">
        <div
          className="text-5xl font-light tracking-widest"
          dangerouslySetInnerHTML={{ __html: getFormattedTime(date, hours24) }}
        />
        <p className="text-xs text-center tracking-widest">{getFormattedDate(date, MONTHS)}</p>
      </div>
    </div>
  );
};

export default Clock;
