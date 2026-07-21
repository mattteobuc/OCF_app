export type Answer = { id: string; text: string; correct: boolean };

export type Question = {
  id: number;
  topic: string;
  subtopic: string;
  difficulty: number;
  question: string;
  answers: Answer[];
  explanation: string;
  reference: string;
  updatedAt: string;
};
