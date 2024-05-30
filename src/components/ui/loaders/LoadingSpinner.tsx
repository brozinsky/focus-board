import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  className?: string;
}

const LoadingSpinner = ({className}: IProps) => {
  return (
    <div
      className={cn(className, "inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-neutral-200 motion-reduce:animate-[spin_1.5s_linear_infinite] ")}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
