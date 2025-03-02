export const getWeekDays = () => {
  const today = new Date();
  const weekDays = [];
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(today.getDate() + mondayOffset + i);
    weekDays.push(day);
  }

  return weekDays;
};

export const formatJournalDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return formattedDate.replace(/\d+/, `${day}${suffix}`);
};
