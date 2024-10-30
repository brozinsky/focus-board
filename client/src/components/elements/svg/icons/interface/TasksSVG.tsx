import { TSVG } from "@/types/ui-types";
import React from "react";

export default function TasksSVG({
  pathClass = "stroke-foreground",
  className,
  width = "24",
}: TSVG) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      fill="none"
      className={className}
    >
      <path
        className={pathClass}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 19.5h10M11 12.5h10M11 5.5h10M3 5.5l1 1 3-3M3 12.5l1 1 3-3M3 19.5l1 1 3-3"
      />
    </svg>
  );
}
