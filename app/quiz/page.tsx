import { PageShell } from "@/components/page-shell";
import { QuizClient } from "@/app/quiz/quiz-client";
import { getRandomQuestions } from "@/lib/question-service";
export default function QuizPage() {
  return (
    <PageShell>
      <QuizClient questions={getRandomQuestions(5)} />
    </PageShell>
  );
}
