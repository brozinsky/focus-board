import { TSVG } from "@/types/ui-types";
import React from "react";

const PlusSVG = ({
  className,
  width = 24,
  pathClass = "stroke-foreground",
}: TSVG) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={width}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        className={pathClass}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6 12h12M12 18V6"
      />
    </svg>
  );
};

export default PlusSVG;
