export type TTodo = {
  id: string;
  content: string;
  isCompleted: boolean;
};

export type TTimerTodoItem = {
  id: number;
  title: string;
  isCompleted: boolean;
  isRunning: boolean;
  timeElapsed: number;
  timeEstimation: number | null;
};
