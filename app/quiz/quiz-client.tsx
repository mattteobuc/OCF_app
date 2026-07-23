"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pause, Play, X } from "lucide-react";
import { QuestionCard } from "@/components/question-card";
import { QuizProgress } from "@/components/quiz-progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Question } from "@/types/question";
import type { ActiveQuiz, QuizAnswer } from "@/types/quiz";
import { clearActiveQuiz, saveActiveQuiz } from "@/lib/active-quiz-service";

export function QuizClient({
  questions,
  exitHref,
  exitLabel,
  initialQuiz,
}: {
  questions: Question[];
  exitHref: string;
  exitLabel: string;
  initialQuiz?: ActiveQuiz;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(initialQuiz?.currentIndex ?? 0);
  const [answer, setAnswer] = useState<string>();
  const [confirmed, setConfirmed] = useState(false);
  const [correct, setCorrect] = useState(initialQuiz?.correctAnswers ?? 0);
  const [answers, setAnswers] = useState<QuizAnswer[]>(
    initialQuiz?.answers ?? [],
  );
  const [activeStartedAt, setActiveStartedAt] = useState(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(
    initialQuiz?.elapsedSeconds ?? 0,
  );
  const [pausedAt, setPausedAt] = useState<number>();
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const question = questions[index];
  const total = questions.length;

  function getElapsedSeconds() {
    return elapsedSeconds + Math.floor((Date.now() - activeStartedAt) / 1000);
  }

  function persistProgress(
    nextIndex = index,
    nextCorrect = correct,
    nextAnswers = answers,
  ) {
    void saveActiveQuiz({
      questionIds: questions.map((item) => item.id),
      answerOrders: questions.map((item) =>
        item.answers.map((itemAnswer) => itemAnswer.text),
      ),
      currentIndex: nextIndex,
      correctAnswers: nextCorrect,
      answers: nextAnswers,
      elapsedSeconds: getElapsedSeconds(),
    }).catch(() => undefined);
  }

  useEffect(() => {
    if (!initialQuiz) return;
    persistProgress();
    // The session is saved after state changes; questions are immutable for the current quiz.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, correct, answers]);

  function resume() {
    if (pausedAt) {
      setActiveStartedAt(Date.now());
    }
    setPausedAt(undefined);
  }

  function exitQuiz() {
    persistProgress();
    router.push(exitHref);
  }

  function confirm() {
    if (!answer) return;
    const isCorrect = Boolean(
      question.answers.find((item) => item.id === answer)?.correct,
    );
    setConfirmed(true);
    const nextCorrect = correct + Number(isCorrect);
    const nextAnswers = [
      ...answers,
      { questionId: question.id, selectedAnswer: answer, correct: isCorrect },
    ];
    if (isCorrect) setCorrect(nextCorrect);
    setAnswers(nextAnswers);
    persistProgress(index, nextCorrect, nextAnswers);
  }
  function next() {
    if (index + 1 >= total) {
      const durationSeconds = getElapsedSeconds();
      sessionStorage.setItem(
        "ocf-quiz-result",
        JSON.stringify({
          result: {
            totalQuestions: total,
            correctAnswers: correct,
            wrongAnswers: total - correct,
            score: total ? Math.round((correct / total) * 100) : 0,
            durationSeconds,
          },
          answers,
        }),
      );
      void clearActiveQuiz().catch(() => undefined);
      router.push("/result");
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setAnswer(undefined);
    setConfirmed(false);
    persistProgress(nextIndex);
  }
  if (!question)
    return (
      <Card className="mx-auto max-w-xl text-center">
        <p className="font-semibold">
          Nessuna domanda disponibile per questa selezione.
        </p>
        <Button className="mt-5" onClick={exitQuiz}>
          Torna alla dashboard
        </Button>
      </Card>
    );
  return (
    <div className="mx-auto max-w-[720px]">
      <div className="mb-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setExitDialogOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] px-3 text-sm font-medium text-[var(--muted)] transition duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {exitLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            persistProgress();
            setElapsedSeconds(getElapsedSeconds());
            setPausedAt(Date.now());
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] px-3 text-sm font-medium text-[var(--muted)] transition duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
        >
          <Pause className="h-4 w-4" aria-hidden="true" />
          Pausa
        </button>
      </div>
      <QuizProgress current={index + 1} total={total} />
      <div className="mt-8">
        <QuestionCard
          question={question}
          selectedAnswer={answer}
          confirmed={confirmed}
          onSelect={setAnswer}
          onConfirm={confirm}
          onNext={next}
        />
      </div>
      {pausedAt ? (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-[#17212b]/45 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pause-title"
        >
          <Card className="w-full max-w-sm text-center">
            <Pause
              className="mx-auto h-8 w-8 text-[var(--primary)]"
              aria-hidden="true"
            />
            <h2
              id="pause-title"
              className="mt-4 text-xl font-semibold tracking-[-0.02em]"
            >
              Prenditi una pausa
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Il tempo resta fermo. Riprendi quando vuoi.
            </p>
            <Button className="mt-6 w-full" onClick={resume}>
              <Play className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Riprendi il quiz
            </Button>
            <button
              type="button"
              onClick={() => setExitDialogOpen(true)}
              className="mt-4 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Esci dal quiz
            </button>
          </Card>
        </div>
      ) : null}
      {exitDialogOpen ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-[#17212b]/45 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
        >
          <Card className="w-full max-w-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="exit-title"
                  className="text-xl font-semibold tracking-[-0.02em]"
                >
                  Mettere in pausa e uscire?
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Salveremo l’avanzamento. Potrai riprendere dalla tua
                  preparazione.
                </p>
              </div>
              <X
                className="h-5 w-5 shrink-0 text-[var(--muted)]"
                aria-hidden="true"
              />
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setExitDialogOpen(false)}
                className="flex-1 rounded-[var(--radius-control)] border border-[var(--border)] px-4 py-3 text-sm font-medium"
              >
                Resta qui
              </button>
              <Button className="flex-1" onClick={exitQuiz}>
                Salva ed esci
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
