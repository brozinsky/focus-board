import { TSVG } from "@/types/ui-types";

export default function SmileySVG(props: TSVG) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      fill="#000"
      {...props}
    >
      <path
        fill="inherit"
        d="M525 350a75.004 75.004 0 0 1-69.291-46.299 75.003 75.003 0 0 1 16.258-81.734 75.002 75.002 0 0 1 115.393 11.365A75.002 75.002 0 0 1 525 350Zm0-125a49.997 49.997 0 0 0-49.039 59.754 49.994 49.994 0 0 0 39.285 39.285 50.003 50.003 0 0 0 51.328-21.261 49.997 49.997 0 0 0-6.219-63.133A49.997 49.997 0 0 0 525 225ZM275 350a75.004 75.004 0 0 1-69.291-46.299 75.003 75.003 0 0 1 16.258-81.734 75.002 75.002 0 0 1 115.393 11.365A75.002 75.002 0 0 1 275 350Zm0-125a49.997 49.997 0 0 0-49.039 59.754 49.994 49.994 0 0 0 39.285 39.285 50.003 50.003 0 0 0 51.328-21.261 49.997 49.997 0 0 0-6.219-63.133A49.997 49.997 0 0 0 275 225Zm326.75 227.75 6.625-5.875a12.56 12.56 0 0 0 4.176-8.668 12.568 12.568 0 0 0-7.094-12.032 12.573 12.573 0 0 0-13.832 1.95L585 434.25c-32.375 29.25-86.5 78.25-185 78.25s-152.625-49-185-78.25l-6.625-6.125a12.569 12.569 0 0 0-13.831-1.95 12.57 12.57 0 0 0-2.919 20.7l6.625 5.875c35 31.625 93.625 84.75 201.75 84.75s166.75-53.125 201.75-84.75ZM400 762.5a362.499 362.499 0 0 1-70.72-718.035 362.5 362.5 0 0 1 327.046 611.861A362.5 362.5 0 0 1 400 762.5Zm0-700a337.5 337.5 0 1 0 0 675.001A337.5 337.5 0 0 0 400 62.5Z"
      />
    </svg>
  );
}