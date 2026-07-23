import { PageShell } from "@/components/page-shell";
import { QuizClient } from "@/app/quiz/quiz-client";
import { getQuestionsByTopic } from "@/lib/question-service";

export const dynamic = "force-dynamic";

export default async function TopicQuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  return (
    <PageShell quizMode>
      <QuizClient
        questions={getQuestionsByTopic(decodeURIComponent(topic))}
        exitHref="/dashboard#argomenti"
        exitLabel="Torna agli argomenti"
      />
    </PageShell>
  );
}
