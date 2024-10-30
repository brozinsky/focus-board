import { Switch } from "@/components/ui/buttons/Switch";
import Select from "@/components/ui/dropdowns/Select";
import Slider from "@/components/ui/inputs/Slider";
import useSceneStore from "@/stores/zustand/useSceneStore";

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

  return (
    <>
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex justify-between items-center max-w-sm">
          <div>Background blur</div>
          <Switch checked={isBgBlur} onCheckedChange={setIsBgBlur} />
        </div>
        {isBgBlur && (
          <Slider
            className="max-w-sm mt-2"
            value={[blurValue]}
            min={0}
            max={10}
            step={1}
            onValueChange={(e: any) => setBlurValue(e[0])}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex justify-between items-center max-w-sm">
          <div>Background shadow</div>
          <Switch checked={isBgShadow} onCheckedChange={setIsBgShadow} />
        </div>
        {isBgShadow && (
          <Slider
            className="max-w-sm mt-2"
            value={[shadowValue]}
            min={0}
            max={0.6}
            step={0.1}
            onValueChange={(e: any) => setShadowValue(e[0])}
          />
        )}
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <div className="flex justify-between items-center max-w-sm">
          <div>Background noise</div>
          <Switch checked={isBgNoise} onCheckedChange={setIsBgNoise} />
        </div>
        {isBgNoise && (
          <Slider
            className="max-w-sm mt-2"
            value={[noiseValue]}
            min={0}
            max={0.6}
            step={0.1}
            onValueChange={(e: any) => setNoiseValue(e[0])}
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
