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
};

const answerIds = ["A", "B", "C", "D"];
const allQuestions: Question[] = (questions as SourceQuestion[]).map(
  (question) => ({
    id: Number(question.id),
    topic: question.categoria,
    subtopic: question["sub-contenuto"],
    difficulty: Number(question.livello),
    question: question.domanda,
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
  [...allQuestions].sort(() => Math.random() - 0.5).slice(0, count);
export const getQuestionsByTopic = (topic: string) =>
  allQuestions.filter(
    (question) => question.topic.toLowerCase() === topic.toLowerCase(),
  );
export const getTopics = () => [
  ...new Set(allQuestions.map((question) => question.topic)),
];
