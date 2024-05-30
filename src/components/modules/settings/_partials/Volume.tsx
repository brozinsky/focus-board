import Slider from "@/components/ui/inputs/Slider";

interface IProps {
  handleVolumeChange: (value: number[]) => void;
  volume: number;
  disabled?: boolean;
}

const Volume = ({ volume, handleVolumeChange, disabled }: IProps) => {
  return (
    <div className="flex flex-row gap-2 items-center text-white w-full">
      <Slider
        disabled={disabled}
        value={[volume]}
        min={0}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
      />
      <div className="w-6">{Math.round(volume)}</div>
    </div>
  );
};

export default Volume;
