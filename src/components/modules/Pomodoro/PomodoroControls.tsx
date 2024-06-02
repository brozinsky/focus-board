import AddTenSVG from "@/components/elements/svg/icons/media/AddTenSVG";
import NextTrackSVG from "@/components/elements/svg/icons/media/NextTrackSVG";
import PauseIconSVG from "@/components/elements/svg/icons/media/PauseIconSVG";
import PlayIconSVG from "@/components/elements/svg/icons/media/PlayIconSVG";
import RefreshSVG from "@/components/elements/svg/icons/media/RefreshSVG";
import Button from "@/components/ui/buttons/Button";

interface IProps {
  isRunning: boolean;
  handleRestart: () => void;
  handleStart: () => void;
  handlePause: () => void;
  handleNext: () => void;
  handleAdd10Minutes: () => void;
}

const PomodoroControls = ({
  isRunning,
  handleRestart,
  handleStart,
  handlePause,
  handleNext,
  handleAdd10Minutes,
}: IProps) => {
  return (
    <div className="mt-4 flex gap-4">
      <Button variant="glass" onClick={handleRestart}>
        <RefreshSVG />
      </Button>
      {!isRunning ? (
        <Button variant="glass" onClick={handleStart}>
          <PlayIconSVG />
        </Button>
      ) : (
        <Button variant="glass" onClick={handlePause}>
          <PauseIconSVG />
        </Button>
      )}
      <Button variant="glass" onClick={handleNext}>
        <NextTrackSVG />
      </Button>
      <Button variant="glass" onClick={handleAdd10Minutes}>
        +10m
      </Button>
    </div>
  );
};

export default PomodoroControls;
