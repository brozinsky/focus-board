import ArrowSmSVG from "@/components/elements/svg/icons/interface/ArrowSmSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import { MONTHS } from "@/lib/constants/const-clock";
import { cn } from "@/lib/utils";
import { useClockStore } from "@/stores/zustand/useClockStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import { getFormattedDate, getFormattedTime } from "@/utils/functions/fn-clock";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const { date, setDate, timeFormat, clockPosition } = useClockStore();
  const { isBgBlur } = useSceneStore();

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000);

    return () => clearInterval(intervalId);
  }, [setDate]);

  return (
    <>
      {/* TODO - add discrete toggle position button  */}
      {/* <div title="Reset clock" className="absolute p-4 right-0 top-0">
        <ButtonIcon
          // onClick={handleForward}
          icon={<ArrowSmSVG />}
          tooltip={"Reset clock position"}
        />
      </div> */}
      <div
        className={cn(
          clockPosition === "center" &&
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-9xl p-10",
          isBgBlur && "glass-blur",
          clockPosition === "top-right" &&
            "p-4 right-0 top-0 text-4xl font-light",
          "absolute flex items-end  text-neutral-100 z-20"
        )}
      >
        <div className="flex flex-col gap-1 cursor-default rounded-lg">
          <div
            className="tracking-widest"
            dangerouslySetInnerHTML={{
              __html: getFormattedTime(date, timeFormat === "24"),
            }}
          />
          <p className="text-2xl text-center tracking-widest">
            {getFormattedDate(date, MONTHS)}
          </p>
        </div>
      </div>
    </>
  );
};

export default Clock;
