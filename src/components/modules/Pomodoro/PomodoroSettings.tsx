import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import { Switch } from "@/components/ui/buttons/Switch";
import usePomodoroStore from "@/stores/zustand/timer/pomodoro.store";
import Select from "@/components/ui/dropdowns/Select";
import TimeInput from "./TimeInput";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/global/theme.store";

type TProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  timeOption: string;
  handleOptionChange: (value: string) => void;
};

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

const PomodoroSettings = ({
  isOpen,
  setIsOpen,
  timeOption,
  handleOptionChange,
}: TProps) => {
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
  const { themeStyle } = useThemeStore();

  if (!isOpen) return;

  return (
    <div
      id="PomodoroSettings"
      className={"modal modal--centered"}
      onClick={() => setIsOpen(false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "modal__card modal__card--overflow-visible !w-[400px]",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        <div className={"p-8 gap-6 flex flex-col"}>
          <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
            <SettingsIconSVG /> Timer settings
          </h3>
          <div className="flex flex-col gap-6">
            <div className="gap-4">
              <div className="flex flex-row justify-between">
                <label htmlFor="time-option">Time option</label>
                <Select
                  size={"sm"}
                  variant={"glass"}
                  contentType={"tonic"}
                  options={options}
                  state={timeOption}
                  setState={handleOptionChange}
                />
              </div>
              {timeOption === "custom" && (
                <div className="flex flex-col gap-4 mb-4 mt-4">
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
            </div>
            <div className="flex justify-between items-center">
              <div>Play sound notification</div>
              <Switch
                checked={isSoundNotification}
                onCheckedChange={setIsSoundNotification}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PomodoroSettings;
