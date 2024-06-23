import React from "react";
import TimeInput from "../Pomodoro/TimeInput";
import Select from "@/components/ui/dropdowns/Select";
import { Switch } from "@/components/ui/buttons/Switch";
import usePomodoro from "@/hooks/usePomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import { Separator } from "@/components/ui/Separator/Separator";

const options = [
  {
    id: 0,
    value: "25/5",
    name: "25/5",
  },
  {
    id: 1,
    value: "30/5",
    name: "30/5",
  },
  {
    id: 2,
    value: "50/10",
    name: "50/10",
  },
  {
    id: 3,
    value: "custom",
    name: "custom",
  },
];

const PomodoroSettings = () => {
  const { timeOption, setTimeOption } = usePomodoro();
  const {
    workTimeMin,
    setWorkTimeMin,
    breakTimeMin,
    setBreakTimeMin,
    longBreakTimeMin,
    setLongBreakTimeMin,
    isSoundNotification,
    setIsSoundNotification,
  } = usePomodoroStore();

  return (
    <>
      <Separator className="my-4 bg-white/30" />
      <p className="text-xl mb-2">Timer</p>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Time option</label>
        <Select
          buttonClassName="w-[120px]"
          size={"sm"}
          variant={"glass"}
          contentType={"tonic"}
          options={options}
          state={timeOption}
          setState={setTimeOption}
        />
      </div>
      {timeOption === "custom" && (
        <div className="flex flex-col gap-4 mb-4 mt-4 max-w-sm">
          <TimeInput
            id="work-time"
            label="Focus Time"
            value={workTimeMin}
            onChange={setWorkTimeMin}
          />
          <TimeInput
            id="break-time"
            label="Break Time"
            value={breakTimeMin}
            onChange={setBreakTimeMin}
          />
          <TimeInput
            id="long-break-time"
            label="Long Break Time"
            value={longBreakTimeMin}
            onChange={setLongBreakTimeMin}
          />
        </div>
      )}
      <div className="flex justify-between items-center max-w-sm">
        <div>Sound notification</div>
        <Switch
          checked={isSoundNotification}
          onCheckedChange={setIsSoundNotification}
        />
      </div>
    </>
  );
};

export default PomodoroSettings;
