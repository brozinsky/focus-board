import { Switch } from "@/components/ui/buttons/Switch";
import Select from "@/components/ui/dropdowns/Select";
import useSceneStore from "@/stores/zustand/useSceneStore";
import React from "react";

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

const SceneSettings = () => {
  const {
    frameType,
    blurValue,
    shadowValue,
    noiseValue,
    isBgBlur,
    isBgShadow,
    isBgNoise,
    setBlurValue,
    setNoiseValue,
    setShadowValue,
    setIsBgBlur,
    setIsBgShadow,
    setIsBgNoise,
    setFrameType,
  } = useSceneStore();

  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlurValue(Number(event.target.value));
  };
  const handleShadowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShadowValue(Number(event.target.value));
  };
  const handleNoiseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoiseValue(Number(event.target.value));
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center max-w-sm">
          <div>Background blur</div>
          <Switch checked={isBgBlur} onCheckedChange={setIsBgBlur} />
        </div>
        {isBgBlur && (
          <input
            className="max-w-sm mt-2"
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
        <div className="flex justify-between items-center max-w-sm">
          <div>Background shadow</div>
          <Switch checked={isBgShadow} onCheckedChange={setIsBgShadow} />
        </div>
        {isBgShadow && (
          <input
            className="max-w-sm mt-2"
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

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center max-w-sm">
          <div>Background noise</div>
          <Switch checked={isBgNoise} onCheckedChange={setIsBgNoise} />
        </div>
        {isBgNoise && (
          <input
            className="max-w-sm mt-2"
            type="range"
            min="0"
            max="0.6"
            step={0.1}
            value={noiseValue}
            onChange={handleNoiseChange}
            style={{
              top: "40px",
              left: "10px",
              zIndex: "9999999",
            }}
          />
        )}
      </div>

      <div className="flex flex-row justify-between max-w-sm">
        <label htmlFor="time-option">Frame type</label>
        <Select
          buttonClassName="w-[160px]"
          size={"sm"}
          variant={"glass"}
          contentType={"tonic"}
          options={options}
          displayValue={options.find((item) => item.value === frameType)?.name}
          state={frameType}
          setState={setFrameType}
        />
      </div>
    </>
  );
};

export default SceneSettings;
