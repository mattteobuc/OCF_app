"use client";

import { useEffect, useState } from "react";
import { QuizClient } from "@/app/quiz/quiz-client";
import { EmptyState } from "@/components/empty-state";
import { Loading } from "@/components/loading";
import { getActiveQuiz } from "@/lib/active-quiz-service";
import type { Question } from "@/types/question";
import type { ActiveQuiz } from "@/types/quiz";

function restoreQuestions(quiz: ActiveQuiz, allQuestions: Question[]) {
  const byId = new Map(allQuestions.map((question) => [question.id, question]));
  return quiz.questionIds
    .map((id, index) => {
      const question = byId.get(id);
      if (!question) return null;
      const answerOrder = quiz.answerOrders[index];
      return {
        ...question,
        answers: answerOrder
          .map((text) =>
            question.answers.find((answer) => answer.text === text),
          )
          .filter((answer): answer is Question["answers"][number] =>
            Boolean(answer),
          ),
      };
    })
    .filter((question): question is Question => Boolean(question));
}

export function ResumeQuiz({ allQuestions }: { allQuestions: Question[] }) {
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>();

  useEffect(() => {
    getActiveQuiz()
      .then(setActiveQuiz)
      .catch(() => setActiveQuiz(null));
  }, []);

  if (activeQuiz === undefined) return <Loading />;
  if (!activeQuiz)
    return <EmptyState message="Non hai quiz in sospeso da riprendere." />;

  const questions = restoreQuestions(activeQuiz, allQuestions);
  if (questions.length !== activeQuiz.questionIds.length)
    return (
      <EmptyState message="Non è stato possibile ricostruire questo quiz. Avviane uno nuovo dalla dashboard." />
    );

  return (
    <QuizClient
      questions={questions}
      exitHref="/dashboard"
      exitLabel="Torna alla dashboard"
      initialQuiz={activeQuiz}
    />
  );
}
