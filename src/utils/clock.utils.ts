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

export const getFormattedTime = (
  date: Date,
  isTimeFormat24: boolean
): string => {
  if (!isTimeFormat24) {
    if (date.getHours() < 12) {
      return (
        formatTime(date, 0, "am") +
        "<span class='text-2xl tracking-normal'> am</span>"
      );
    } else if (date.getHours() === 12) {
      return (
        formatTime(date, 0, "pm") +
        "<span class='text-2x  l tracking-normal'> pm</span>"
      );
    } else {
      return (
        formatTime(date, 12, "pm") +
        "<span class='text-2xl tracking-normal'> pm</span>"
      );
    }
  } else {
    return formatTime(date, 0, "");
  }
};

export const getFormattedDate = (date: Date, months: string[]): string => {
  return date.getDate() + "-" + months[date.getMonth()];
};
