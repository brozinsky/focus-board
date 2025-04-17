import { TSVG } from "@/types/ui/svg.types";

export default function CheckSVG({
  pathClass = "stroke-foreground",
  className,
  width = "24",
}: TSVG) {
  return (
    <svg
      className={className}
      width={width}
      height={width}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        className={pathClass}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m7.75 12 2.83 2.83 5.67-5.66"
      />
    </svg>
  );
}
