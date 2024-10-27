import { TSVG } from "@/types/ui-types";

const HeartSVG = (props: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={287}
    height={238}
    fill="none"
    viewBox="0 0 287 238" 
    {...props}
  >
    <path
      className="stroke-red-500"
      strokeLinecap="round"
      strokeWidth={15}
      d="M29.076 20.607c72.081-30.154 115.451 74.26 119.895 74.71 4.444.45 62.559-108.464 118.422-83.26 55.863 25.203-103.785 227.509-118.422 217.881C90.056 191.185-43.005 50.762 29.076 20.608Z"
    />
  </svg>
);

export default HeartSVG;
