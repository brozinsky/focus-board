import CheckSVG from "@/components/elements/svg/icons/interface/CheckSVG";
import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  step: number;
  isCurrent: boolean;
  isCompleted: boolean;
  isLast: boolean;
  isWorkSession: boolean;
}

const Stepper = ({
  step,
  isCurrent,
  isCompleted,
  isLast,
  isWorkSession,
}: IProps) => {
  return (
    <div className="flex items-center w-full">
      <div
        className={cn(
          "border-transparent glass-dark-lighter border-[2px] text-white w-8 h-8 shrink-0 flex items-center justify-center rounded-full",
          isCurrent && isWorkSession && "glass-dark-solid",
          isCompleted && "glass-dark",
          isCurrent && !isWorkSession && "glass-dark"
        )}
      >
        <span className="text-base font-medium">
          {isCompleted || (isCurrent && !isWorkSession) ? <CheckSVG /> : step}
        </span>
      </div>
      {!isLast && (
        <div
          className={cn(
            "h-1 w-4 glass-dark-lighter",
            !isWorkSession && isCurrent && !isLast && "glass-dark-solid",
            isCompleted && "glass-dark"
          )}
        ></div>
      )}
    </div>
  );
};

export default Stepper;
