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
    <div className="absolute flex items-end right-[3%] h-[6rem] top-0 text-neutral-100 z-20">
      <div className="flex flex-col gap-1 cursor-default rounded-lg py-2">
        <div
          className="text-4xl font-light tracking-widest"
          dangerouslySetInnerHTML={{ __html: getFormattedTime(date, hours24) }}
        />
        {/* <p className="text-xs text-center tracking-widest">{getFormattedDate(date, MONTHS)}</p> */}
      </div>
    </div>
  );
};

export default Clock;
