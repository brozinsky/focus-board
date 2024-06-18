import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import SettingsIconSVG from "@/components/elements/svg/icons/interface/SettingsIconSVG";
import { Switch } from "@/components/ui/buttons/Switch";
import useSceneStore from "@/stores/zustand/useSceneStore";
import Select from "@/components/ui/dropdowns/Select";
import useQuoteStore from "@/stores/zustand/useQuoteStore";
import { useClockStore } from "@/stores/zustand/useClockStore";

const options = [
  {
    id: 0,
    value: "glass-frame",
    name: "Glass",
  },
  {
    id: 1,
    value: "none",
    name: "None",
  },
];

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

const SceneSettings = () => {
  const {
    frameType,
    blurValue,
    shadowValue,
    isBgBlur,
    isBgShadow,
    isSceneModalOpen,
    setBlurValue,
    setShadowValue,
    setIsBgBlur,
    setIsBgShadow,
    setIsSceneModalOpen,
    setFrameType,
  } = useSceneStore();

  const { isQuoteActive, setIsQuoteActive } = useQuoteStore();

  const { timeFormat, setTimeFormat, clockPosition, setClockPosition } = useClockStore();

  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlurValue(Number(event.target.value));
  };
  const handleShadowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShadowValue(Number(event.target.value));
  };

  if (!isSceneModalOpen) return;

  return (
    <div
      id="SceneSettings"
      className={"modal modal--centered"}
      onClick={() => setIsSceneModalOpen(false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={"modal__card modal__card--overflow-visible !w-[400px]"}
      >
        <div className={"p-8 gap-6 flex flex-col"}>
          <h3 className="flex flex-row items-center text-xl gap-3 tracking-wide">
            <SettingsIconSVG /> Settings
          </h3>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div>Show quotes</div>
              <Switch
                checked={isQuoteActive}
                onCheckedChange={setIsQuoteActive}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <label htmlFor="time-option">Clock position</label>
            <Select
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

          <div className="flex flex-row justify-between">
            <label htmlFor="time-option">Time format</label>
            <Select
              size={"sm"}
              variant={"glass"}
              options={timeFormatOptions}
              displayValue={`${timeFormat} hours`}
              state={timeFormat}
              setState={setTimeFormat}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div>Background blur</div>
              <Switch checked={isBgBlur} onCheckedChange={setIsBgBlur} />
            </div>
            {isBgBlur && (
              <input
                id="blurValue"
                type="range"
                min="0"
                max="10"
                step={1}
                value={blurValue}
                onChange={handleBlurChange}
                style={{
                  top: "10px",
                  left: "10px",
                  zIndex: "9999999",
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div>Background shadow</div>
              <Switch checked={isBgShadow} onCheckedChange={setIsBgShadow} />
            </div>
            {isBgShadow && (
              <input
                type="range"
                min="0"
                max="0.6"
                step={0.1}
                value={shadowValue}
                onChange={handleShadowChange}
                style={{
                  top: "40px",
                  left: "10px",
                  zIndex: "9999999",
                }}
              />
            )}
          </div>

          <div className="flex flex-row justify-between">
            <label htmlFor="time-option">Frame type</label>
            <Select
              size={"sm"}
              variant={"glass"}
              contentType={"tonic"}
              options={options}
              displayValue={
                options.find((item) => item.value === frameType)?.name
              }
              state={frameType}
              setState={setFrameType}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SceneSettings;
