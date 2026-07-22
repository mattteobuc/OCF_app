import questions from "@/data/questions.json";
import type { Question } from "@/types/question";

type SourceQuestion = {
  id: string;
  domanda: string;
  risposte: string[];
  "risposta corretta": string;
  livello: string;
  categoria: string;
  "sub-contenuto": string;
  explanation?: string;
  reference?: string;
};

const answerIds = ["A", "B", "C", "D"];

function shuffle<T>(items: T[]) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

function shuffleQuestion(question: Question): Question {
  const shuffledAnswers = shuffle(question.answers);
  return {
    ...question,
    answers: shuffledAnswers.map((answer, index) => ({
      ...answer,
      id: answerIds[index],
    })),
  };
}

const allQuestions: Question[] = (questions as SourceQuestion[]).map(
  (question) => ({
    id: Number(question.id),
    topic: question.categoria,
    subtopic: question["sub-contenuto"],
    difficulty: Number(question.livello),
    question: question.domanda,
    explanation: question.explanation,
    reference: question.reference,
    answers: question.risposte.map((text, index) => ({
      id: answerIds[index],
      text,
      correct: text === question["risposta corretta"],
    })),
    updatedAt: "2026-07-21",
  }),
);

export const getAllQuestions = () => allQuestions;
export const getQuestionById = (id: number) =>
  allQuestions.find((question) => question.id === id);
export const getRandomQuestions = (count: number) =>
  shuffle(allQuestions)
    .slice(0, count)
    .map(shuffleQuestion);
export const getQuestionsByTopic = (topic: string) =>
  shuffle(
    allQuestions.filter(
      (question) => question.topic.toLowerCase() === topic.toLowerCase(),
    ),
  ).map(shuffleQuestion);
export const getTopics = () => [
  ...new Set(allQuestions.map((question) => question.topic)),
];
