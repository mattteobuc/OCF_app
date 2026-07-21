import questions from "@/data/questions.json";
import type { Question } from "@/types/question";

const allQuestions = questions as Question[];

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
