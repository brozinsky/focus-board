export type THabitsForm = {
  title: string;
  startDate: Date;
  endDate: Date | null;
  selectedDays: { [key: number]: boolean };
};
