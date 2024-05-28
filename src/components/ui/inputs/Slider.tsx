import * as RxSlider from "@radix-ui/react-slider";
import clsx from "clsx";

interface IProps {
  onValueChange: (value: number[]) => void;
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  color?: string;
}

const Slider = ({
  onValueChange,
  value,
  min = 0,
  max = 100,
  step = 1,
  color = "default"
}: IProps) => {
  return (
    <div className="flex flex-row gap-2 items-center text-white w-full">
      <RxSlider.Root
        className="group relative flex items-center self-center select-none touch-none w-full h-5"
        defaultValue={value}
        value={value}
        onValueChange={onValueChange}
        max={max}
        min={min}
        step={step}
      >
        <RxSlider.Track className="bg-foreground relative grow rounded-full h-[4px]">
          <RxSlider.Range
            className={clsx(
              color === "default" && "transition bg-primary-500 opacity-40 group-hover:opacity-100",
              color === "gray" && "bg-white",
              "absolute rounded-full h-full"
            )}
          />
        </RxSlider.Track>
        <RxSlider.Thumb
          className="focus:outline-none block w-4 h-4 rounded-[10px] transition group-hover:bg-foreground"
          aria-label="Volume"
        />
      </RxSlider.Root>
    </div>
  );
};

export default Slider;
