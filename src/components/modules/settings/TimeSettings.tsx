import Select from "@/components/ui/dropdowns/Select";
import { useClockStore } from "@/stores/zustand/useClockStore";
import useSceneStore from "@/stores/zustand/useSceneStore";
import React from "react";
import PomodoroSettings from "./PomodoroSettings";
import { Switch } from "@/components/ui/buttons/Switch";

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
  const {
    timeFormat,
    setTimeFormat,
    clockPosition,
    setClockPosition,
    isSecondsVisible,
    setIsSecondsVisible,
  } = useClockStore();
  const { frameType } = useSceneStore();

  return (
    <>
      <p className="text-xl mb-2">Clock</p>
      <div className="settings__label">
        <label htmlFor="time-option">Clock position</label>
        {/* <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <img
              className="rounded-lg mb-2"
              src="https://picsum.photos/160/90"
              alt=""
            />
            <p>Center</p>
          </div>
          <div className="flex flex-col">
            <img
              className="rounded-lg mb-2"
              src="https://picsum.photos/160/90"
              alt=""
            />
            <p>Center</p>
          </div>
        </div> */}
        <Select
          buttonClassName="w-[160px]"
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
      <div className="settings__label">
        <label htmlFor="time-option">Time format</label>
        <Select
          buttonClassName="w-[160px]"
          size={"sm"}
          variant={"glass"}
          options={timeFormatOptions}
          displayValue={`${timeFormat} hours`}
          state={timeFormat}
          setState={setTimeFormat}
        />
      </div>
      <div className="settings__label">
        <label htmlFor="time-option">Show seconds</label>
        <Switch
          checked={isSecondsVisible}
          onCheckedChange={setIsSecondsVisible}
        />
      </div>
      <PomodoroSettings />
    </>
  );
};

export default TimeSettings;
