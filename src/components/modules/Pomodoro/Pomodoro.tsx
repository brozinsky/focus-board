import GaugeCircle from "@/components/ui/GaugeCircle/GaugeCircle";
import usePomodoro from "@/hooks/usePomodoro";
import usePomodoroStore from "@/stores/zustand/usePomodoroStore";

const TOTAL_SESSIONS = 4;

const Pomodoro = () => {
  const {
    handleStart,
    handlePause,
    handleRestart,
    handleNext,
    handleAdd10Minutes,
    handleOptionChange,
    progress,
    timeOption,
    timeLeft,
    isRunning,
  } = usePomodoro();

  const {
    workTimeMin,
    setWorkTimeMin,
    breakTimeMin,
    setBreakTimeMin,
    longBreakTimeMin,
    setLongBreakTimeMin,
    currentSession,
    isWorkSession,
  } = usePomodoroStore();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="glass-blur absolute translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2 text-neutral-100 z-20">
      <div className="flex flex-col items-center gap-1 cursor-default p-8">
        <GaugeCircle
          max={100}
          min={0}
          value={progress}
          gaugePrimaryColor="var(--color-primary-200)"
          gaugeSecondaryColor="var(--color-neutral-200)"
          className="h-80 w-80 glass-blur glass-bg-dark rounded-full"
          displayValue={formatTime(timeLeft)}
        />
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
        <div className="mt-4">
          <p>
            Session: {currentSession}/{TOTAL_SESSIONS}
          </p>
          <p>
            {isWorkSession
              ? "Work Session"
              : currentSession === TOTAL_SESSIONS
              ? "Long Break"
              : "Break"}
          </p>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4">
          <div>
            <label htmlFor="time-option">Select Time Option:</label>
            <select
              id="time-option"
              value={timeOption}
              onChange={handleOptionChange}
              className="ml-2 p-1 rounded"
            >
              <option value="25/5">25/5</option>
              <option value="30/10">30/5</option>
              <option value="50/10">50/10</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {timeOption === "custom" && (
            <div className="flex gap-4">
              <div>
                <label htmlFor="work-time">Focus Time (minutes):</label>
                <input
                  id="work-time"
                  type="number"
                  value={workTimeMin}
                  onChange={(e) => setWorkTimeMin(Number(e.target.value))}
                  className="ml-2 p-1 rounded"
                />
              </div>
              <div>
                <label htmlFor="break-time">Break Time (minutes):</label>
                <input
                  id="break-time"
                  type="number"
                  value={breakTimeMin}
                  onChange={(e) => setBreakTimeMin(Number(e.target.value))}
                  className="ml-2 p-1 rounded"
                />
              </div>
              <div>
                <label htmlFor="long-break-time">
                  Long Break Time (minutes):
                </label>
                <input
                  id="long-break-time"
                  type="number"
                  value={longBreakTimeMin}
                  onChange={(e) => setLongBreakTimeMin(Number(e.target.value))}
                  className="ml-2 p-1 rounded"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
