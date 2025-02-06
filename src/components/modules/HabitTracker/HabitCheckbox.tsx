import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const HabitCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    isChecked: boolean;
    onChange: (checked: boolean) => void;
  }
>(({ className, isChecked, onChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    checked={isChecked}
    onCheckedChange={onChange}
    className={cn(
      "hover:bg-white/10 transition peer h-8 w-8 shrink-0 rounded-full border border-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:hover:bg-transparent disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-primary-foreground")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
HabitCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { HabitCheckbox };
