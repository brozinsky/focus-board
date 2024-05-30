import { TSVG } from "@/types/ui-types";

export default function CitySVG({ className, width = "24" }: TSVG) {
  return (
    <svg
      className={className}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="stroke-neutral-100"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M13 22H5c-2 0-3-1-3-3v-8c0-2 1-3 3-3h5v11c0 2 1 3 3 3ZM10.11 4c-.08.3-.11.63-.11 1v3H5V6c0-1.1.9-2 2-2h3.11ZM14 8v5M18 8v5M17 17h-2c-.55 0-1 .45-1 1v4h4v-4c0-.55-.45-1-1-1ZM6 13v4"
      />
      <path
        className="stroke-neutral-100"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M10 19V5c0-2 1-3 3-3h6c2 0 3 1 3 3v14c0 2-1 3-3 3h-6c-2 0-3-1-3-3Z"
      />
    </svg>
  );
}
