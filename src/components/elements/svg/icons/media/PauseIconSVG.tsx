import { TSVG } from "@/types/ui-types";

export default function PauseIconSVG({
  className,
  width = "24",
  pathClass = "stroke-foreground",
}: TSVG) {
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
        d="M10.65 19.11V4.89c0-1.35-.57-1.89-2.01-1.89H5.01C3.57 3 3 3.54 3 4.89v14.22C3 20.46 3.57 21 5.01 21h3.63c1.44 0 2.01-.54 2.01-1.89ZM21.002 19.11V4.89c0-1.35-.57-1.89-2.01-1.89h-3.63c-1.43 0-2.01.54-2.01 1.89v14.22c0 1.35.57 1.89 2.01 1.89h3.63c1.44 0 2.01-.54 2.01-1.89Z"
      />
    </svg>
  );
}
