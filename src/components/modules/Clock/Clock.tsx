import { MONTHS } from "@/lib/constants/clock.constants";
import { cn } from "@/lib/utils";
import { useClockStore } from "@/stores/zustand/useClockStore";
import { getFormattedDate } from "@/utils/clock.utils";
import React, { useEffect } from "react";
import FlipNumbers from "react-flip-numbers";

const Clock = ({
  display = "default",
}: {
  display: "settings" | "default";
}) => {
  const { date, setDate, clockPosition, isSecondsVisible } = useClockStore();
  // const { isBgBlur } = useSceneStore();

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000);

    return () => clearInterval(intervalId);
  }, [setDate]);

  const padTime = (time: number) => time.toString().padStart(2, "0");

  const hours = padTime(date.getHours());
  const minutes = padTime(date.getMinutes());
  const seconds = padTime(date.getSeconds());

  const numberHeight = clockPosition === "center" ? 120 : 60;
  const numberWidth = clockPosition === "center" ? 90 : 45;

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
          // isBgBlur && "glass-blur",
          clockPosition === "top-right" &&
            "p-4 right-0 top-0 text-4xl font-light",
          "absolute flex items-end  text-white z-20",
          display === "settings" && "!scale-[33%]"
        )}
      >
        <div className="flex flex-col gap-1 cursor-default rounded-lg opacity-80">
          <div className="scale-[65%] transform sm:scale-100 flex font-normal">
            <FlipNumbers
              height={numberHeight}
              width={numberWidth}
              color="#fff"
              play
              perspective={1000}
              numbers={hours.toString()}
            />
            <div
              className={cn(
                "text-white",
                clockPosition == "center" ? "px-2 pb-4 " : "px-2 pt-1"
              )}
            >
              :
            </div>
            <FlipNumbers
              height={numberHeight}
              width={numberWidth}
              color="#fff"
              play
              perspective={1000}
              duration={2}
              numbers={minutes.toString()}
            />
            {isSecondsVisible && (
              <div
                className={cn(
                  "opacity-70",
                  clockPosition == "center" ? "pl-2 pt-6 " : "pl-1 pt-1"
                )}
              >
                <FlipNumbers
                  height={numberHeight / 2}
                  width={numberWidth / 2}
                  color="#fff"
                  play
                  perspective={1000}
                  duration={1}
                  numbers={seconds.toString()}
                />
              </div>
            )}
          </div>
          <p className="text-base sm:text-2xl text-center tracking-widest">
            {getFormattedDate(date, MONTHS)}
          </p>
        </div>
      </div>
    </>
  );
};

export default Clock;
