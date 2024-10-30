import { TSVG } from "@/types/ui-types";

export default function MinimizeSVG({
  className,
  width = "24",
  pathClass = "stroke-neutral-100",
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
        d="M6 12h12"
      />
    </svg>
  );
}
