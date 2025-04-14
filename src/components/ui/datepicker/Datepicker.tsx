import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../buttons/ButonCn";
import { Calendar } from "./Calendar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  displayValue?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
  displayValue,
}: DatePickerProps) {
  return (
    <Popover className="relative">
      <PopoverButton
        className={cn(
          "w-[150px] bg-input px-4 py-2 rounded-md flex items-center",
          !date && "text-muted-foreground",
          className
        )}
        disabled={disabled}
      >
        <CalendarIcon className="mr-2 w-4 h-4" />
        {displayValue
          ? displayValue
          : date
          ? format(date, "dd/MM/yyyy")
          : placeholder}
        {/* {date ? format(date, "PPP") : <span>{placeholder}</span>} */}
      </PopoverButton>
      <PopoverPanel className="absolute z-10 mt-2 shadow-md rounded bg-background">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          className="rounded-md border"
          initialFocus
        />
      </PopoverPanel>
    </Popover>
  );
}

{
  /* <Popover>
<PopoverTrigger asChild>
  <Button
    variant={"outline"}
    className={cn(
      "w-[280px] justify-start text-left font-normal",
      !date && "text-muted-foreground",
      className
    )}
    disabled={disabled}
  >
    <CalendarIcon className="mr-2 h-4 w-4" />
    {date ? format(date, "PPP") : <span>{placeholder}</span>}
  </Button>
</PopoverTrigger>
<PopoverContent className="w-auto p-0">
  <Calendar
    mode="single"
    selected={date}
    onSelect={onDateChange}
    initialFocus
  />
</PopoverContent>
</Popover> */
}
