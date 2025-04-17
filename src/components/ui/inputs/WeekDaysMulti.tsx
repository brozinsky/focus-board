import React from "react";
import ButtonIcon from "../buttons/ButtonIcon";
import { DAYS_OF_WEEK } from "@/lib/constants/habits.constants";

type TSelectedDays = {
  [key: number]: boolean;
};

interface IWeekDaysMultiProps {
  setDays: React.Dispatch<React.SetStateAction<TSelectedDays>>;
  days: TSelectedDays;
}

const WeekDaysMulti: React.FC<IWeekDaysMultiProps> = ({ setDays, days }) => {
  const handleDayToggle = (dayId: number): void => {
    setDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {DAYS_OF_WEEK.map((day) => (
        <ButtonIcon
          key={day.id}
          size="sm"
          variant="toggle"
          onClick={() => handleDayToggle(day.id)}
          icon={<span>{day.name}</span>}
          className={days[day.id] ? "active" : ""}
        />
      ))}
    </div>
  );
};

export default WeekDaysMulti;
