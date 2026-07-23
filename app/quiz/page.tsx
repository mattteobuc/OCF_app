import { PageShell } from "@/components/page-shell";
import { QuizClient } from "@/app/quiz/quiz-client";
import { getRandomQuestions } from "@/lib/question-service";

export const dynamic = "force-dynamic";

export default function QuizPage() {
  return (
    <PageShell quizMode>
      <QuizClient
        questions={getRandomQuestions(5)}
        exitHref="/dashboard"
        exitLabel="Torna alla dashboard"
      />
    </PageShell>
  );
}
