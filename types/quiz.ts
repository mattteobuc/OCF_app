export type QuizResult = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  durationSeconds: number;
};

export type QuizAnswer = {
  questionId: number;
  selectedAnswer: string;
  correct: boolean;
};

export type QuizSession = { result: QuizResult; answers: QuizAnswer[] };

export type ActiveQuiz = {
  questionIds: number[];
  answerOrders: string[][];
  currentIndex: number;
  correctAnswers: number;
  answers: QuizAnswer[];
  elapsedSeconds: number;
};
