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
