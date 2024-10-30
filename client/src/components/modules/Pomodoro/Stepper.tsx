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
          "border-transparent bg-input border-[2px] text-foreground w-8 h-8 shrink-0 flex items-center justify-center rounded-md",
          isCurrent && isWorkSession && "bg-primary text-foreground-primary",
          isCompleted && "bg-primary rounded-full text-foreground-primary",
          isCurrent &&
            !isWorkSession &&
            "bg-primary rounded-full text-foreground-primary"
        )}
      >
        <span className="text-base font-medium">
          {isCompleted || (isCurrent && !isWorkSession) ? (
            <CheckSVG pathClass={"stroke-foreground-primary"} />
          ) : (
            step
          )}
        </span>
      </div>
      {!isLast && (
        <div
          className={cn(
            "h-1 w-4 bg-input",
            !isWorkSession && isCurrent && !isLast && "bg-primary",
            isCompleted && "bg-primary"
          )}
        ></div>
      )}
    </div>
  );
};

export default Stepper;
