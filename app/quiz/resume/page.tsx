import { ResumeQuiz } from "@/app/quiz/resume/resume-quiz";
import { PageShell } from "@/components/page-shell";
import { getAllQuestions } from "@/lib/question-service";

export default function ResumeQuizPage() {
  return (
    <PageShell quizMode>
      <ResumeQuiz allQuestions={getAllQuestions()} />
    </PageShell>
  );
}
