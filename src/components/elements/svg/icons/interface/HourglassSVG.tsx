import { TSVG } from "@/types/ui/svg.types";
import React from "react";

export default function HourglassSVG({
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
        d="M15.24 2H8.76C5 2 4.71 5.38 6.74 7.22l10.52 9.56C19.29 18.62 19 22 15.24 22H8.76C5 22 4.71 18.62 6.74 16.78l10.52-9.56C19.29 5.38 19 2 15.24 2Z"
      />
    </svg>
  );
}
