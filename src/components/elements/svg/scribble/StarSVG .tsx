import { TSVG } from "@/types/ui-types";

const StarSVG = (props: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={237}
    height={208}
    viewBox="0 0 237 208"
    fill="none"
    {...props}
  >
    <path
      className="stroke-yellow-500"
      strokeLinecap="round"
      strokeWidth={15}
      d="M164.096 83.455c-11.55-5.095-44.874-82.606-52.83-74.709-7.957 7.897-32.073 70.061-39.515 70.061-7.443 0-67.423-1.976-63.574 4.648 3.85 6.624 59.107 47.789 58.85 57.724-.256 9.936-13.026 58.527-5.583 58.527s50.122-45.366 60.132-44.856c10.009.509 47.953 50.715 52.83 44.856 4.876-5.859-11.241-51.394-8.161-58.527 3.08-7.133 71.346-53.828 61.85-53.828-9.497 0-52.45 1.199-63.999-3.896Z"
    />
  </svg>
);

export default StarSVG;