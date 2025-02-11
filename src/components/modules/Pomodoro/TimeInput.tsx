import { Input } from "@/components/ui/inputs/Input";
import React from "react";

interface IProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const TimeInput: React.FC<IProps> = ({ id, label, value, onChange }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <label className="block mb-2 items-end" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-end gap-2">
        <Input
          id={id}
          className="max-w-[50px]"
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="mb-1 text-xs">min</span>
      </div>
    </div>
  );
};

export default TimeInput;
