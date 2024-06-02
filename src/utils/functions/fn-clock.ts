export const formatTime = (
  date: Date,
  hourChange: number,
  suffix: string
): string => {
  return (
    date.getHours() - hourChange + ":" + ("0" + date.getMinutes()).slice(-2)
  );
};

export const formatDuration = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const getFormattedTime = (date: Date, hours24: boolean): string => {
  if (!hours24) {
    if (date.getHours() < 12) {
      return formatTime(date, 0, "am") + "<span class='text-sm'> am</span>";
    } else if (date.getHours() === 12) {
      return formatTime(date, 0, "pm") + "<span class='text-sm'> pm</span>";
    } else {
      return formatTime(date, 12, "pm") + "<span class='text-sm'> pm</span>";
    }
  } else {
    return formatTime(date, 0, "");
  }
};

export const getFormattedDate = (date: Date, months: string[]): string => {
  return date.getDate() + "-" + months[date.getMonth()];
};
