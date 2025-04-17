export type TJournalPrompt = {
  name: string;
  id: number;
  value: number;
};

export type TJournalData = {
  id: number;
  title: string;
  created_at: string;
  content: string;
  question_prompt: number;
  user_id: string;
};
