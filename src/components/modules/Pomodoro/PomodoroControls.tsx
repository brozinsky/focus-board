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
      <button
        onClick={handleRestart}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Restart
      </button>
      {!isRunning ? (
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Start
        </button>
      ) : (
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Pause
        </button>
      )}
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
      <button
        onClick={handleAdd10Minutes}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        +10
      </button>
    </div>
  );
};

export default PomodoroControls;
