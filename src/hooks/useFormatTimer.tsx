import { cn } from "@/lib/utils";
import React from "react";

const useFormatTimer = () => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return (
      <>
        <span className={cn(hrs === 0 ? "opacity-30" : "")}>
          <span className="w-10 inline-flex justify-start">
            {hrs < 10 ? "0" : ""}
            {hrs}
          </span>
          <span>:</span>
        </span>
        <span className={cn(mins === 0 && hrs === 0 ? "opacity-30" : "")}>
          <span className="w-10 inline-flex justify-center">
            {mins < 10 ? "0" : ""}
            {mins}
          </span>
          <span>:</span>
        </span>
        <span
          className={cn(
            secs === 0 && mins === 0 && hrs === 0 ? "opacity-30" : ""
          )}
        >
          <span className="w-10 inline-flex justify-left ml-0.5">
            {secs < 10 ? "0" : ""}
            {secs}
          </span>
        </span>
      </>
    );
  };
  return { formatTime };
};

export default useFormatTimer;
