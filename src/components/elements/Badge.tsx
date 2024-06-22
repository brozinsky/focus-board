import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

function Badge({ className, variant, ...props }) {
  return (
    <a
      href="#projects"
      className="relative inline-flex items-center justify-center h-12 px-10 overflow-hidden font-medium duration-500 bg-transparent border rounded-md bg-neutral-900 border-primary-500 group text-primary-500 border-1"
    >
      <span className="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">
        See my projects
      </span>
      <div className="button-shine">
        <div className="relative w-20 h-full bg-primary-500/30"></div>
      </div>
      <span className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </a>
  );
}

export default Badge;
