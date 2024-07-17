import React, { useEffect, useRef } from "react";
import TimeInput from "../Pomodoro/TimeInput";
import Select from "@/components/ui/dropdowns/Select";
import { Switch } from "@/components/ui/buttons/Switch";
import usePomodoro from "@/hooks/usePomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";
import { Separator } from "@/components/ui/Separator/Separator";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import ButtonIcon from "@/components/ui/buttons/ButtonIcon";
import bellRingMP3 from "@/assets/audio/one-shots/bell-ring.mp3";

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

  const notificationSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    notificationSoundRef.current = new Howl({
      src: [bellRingMP3],
    });
  }, []);

  const playNotificationSound = () => {
    notificationSoundRef.current?.play();
  };

  return (
    <>
      <Separator className="my-4 bg-white/30" />
      <p className="text-xl mb-2">Pomodoro</p>
      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Focus / break durations (mins)</label>
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
      <div className="flex justify-between items-center max-w-sm min-h-8">
        <div>Play sound notification</div>
        <div className="flex flex-row gap-2 items-center">
          {isSoundNotification && (
            <ButtonIcon
              onClick={() => {
                playNotificationSound();
              }}
              size="sm"
              icon={<PlayIconSVG />}
              tooltip={"Play audio"}
            />
          )}
          <Switch
            checked={isSoundNotification}
            onCheckedChange={setIsSoundNotification}
          />
        </div>
      </div>
    </>
  );
};

export default PomodoroSettings;
