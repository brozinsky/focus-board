import usePomodoroStore from "@/stores/zustand/usePomodoroStore";

interface IProps {
  timeOption: string;
  handleOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const PomodoroTimeOptions = ({ timeOption, handleOptionChange }: IProps) => {
  const {
    workTimeMin,
    setWorkTimeMin,
    breakTimeMin,
    setBreakTimeMin,
    longBreakTimeMin,
    setLongBreakTimeMin,
  } = usePomodoroStore();

  return (
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
            <label htmlFor="long-break-time">Long Break Time (minutes):</label>
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
  );
};

export default PomodoroTimeOptions;
