import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

type SeparatorOrientation = "horizontal" | "vertical" | "vertical-panel";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    "orientation"
  > & {
    orientation?: SeparatorOrientation;
  }
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation === "vertical-panel" ? "vertical" : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        orientation === "vertical-panel" &&
          "h-[1px] w-full md:h-full md:w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
