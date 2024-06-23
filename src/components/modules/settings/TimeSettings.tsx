import Select from "@/components/ui/dropdowns/Select";
import { useClockStore } from "@/stores/zustand/useClockStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import React from "react";
import PomodoroSettings from "./PomodoroSettings";

const clockOptions = [
  {
    id: 0,
    value: "top-right",
    name: "Top right",
  },
  {
    id: 1,
    value: "center",
    name: "Center",
  },
];

const timeFormatOptions = [
  {
    id: 0,
    value: "24",
    name: "24 hours",
  },
  {
    id: 1,
    value: "12",
    name: "12 hours",
  },
];

const TimeSettings = () => {
  const { timeFormat, setTimeFormat, clockPosition, setClockPosition } =
    useClockStore();
  const { frameType } = useSceneStore();

  return (
    <>
      <p className="text-xl mb-2">Clock</p>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Clock position</label>
        <Select
          buttonClassName="w-[120px]"
          size={"sm"}
          variant={"glass"}
          options={clockOptions}
          displayValue={
            clockOptions.find((item) => item.value === frameType)?.name
          }
          state={clockPosition}
          setState={setClockPosition}
        />
      </div>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Time format</label>
        <Select
          buttonClassName="w-[120px]"
          size={"sm"}
          variant={"glass"}
          options={timeFormatOptions}
          displayValue={`${timeFormat} hours`}
          state={timeFormat}
          setState={setTimeFormat}
        />
      </div>
      <PomodoroSettings />
    </>
  );
};

export default TimeSettings;
