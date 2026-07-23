"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pause, Play, X } from "lucide-react";
import { QuestionCard } from "@/components/question-card";
import { QuizProgress } from "@/components/quiz-progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Question } from "@/types/question";

export function QuizClient({
  questions,
  exitHref,
  exitLabel,
}: {
  questions: Question[];
  exitHref: string;
  exitLabel: string;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string>();
  const [confirmed, setConfirmed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [pausedAt, setPausedAt] = useState<number>();
  const [pausedDuration, setPausedDuration] = useState(0);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const question = questions[index];
  const total = questions.length;

  function resume() {
    if (pausedAt)
      setPausedDuration((duration) => duration + Date.now() - pausedAt);
    setPausedAt(undefined);
  }

  function exitQuiz() {
    router.push(exitHref);
  }

  function confirm() {
    setConfirmed(true);
    if (question.answers.find((item) => item.id === answer)?.correct)
      setCorrect((value) => value + 1);
  }
  function next() {
    if (index + 1 >= total) {
      const durationSeconds = Math.round(
        (Date.now() - startedAt - pausedDuration) / 1000,
      );
      sessionStorage.setItem(
        "ocf-quiz-result",
        JSON.stringify({
          totalQuestions: total,
          correctAnswers: correct,
          wrongAnswers: total - correct,
          score: total ? Math.round((correct / total) * 100) : 0,
          durationSeconds,
        }),
      );
      router.push("/result");
      return;
    }
    setIndex((value) => value + 1);
    setAnswer(undefined);
    setConfirmed(false);
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
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setExitDialogOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {exitLabel}
        </button>
        <button
          type="button"
          onClick={() => setPausedAt(Date.now())}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
        >
          <Pause className="h-4 w-4" aria-hidden="true" />
          Pausa
        </button>
      </div>
      <QuizProgress current={index + 1} total={total} />
      <div className="mt-7">
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
          className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/45 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pause-title"
        >
          <Card className="w-full max-w-sm text-center">
            <Pause
              className="mx-auto h-8 w-8 text-[var(--primary)]"
              aria-hidden="true"
            />
            <h2 id="pause-title" className="mt-4 text-xl font-bold">
              Quiz in pausa
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Il tempo non scorre finché non riprendi.
            </p>
            <Button className="mt-6 w-full" onClick={resume}>
              <Play className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Riprendi il quiz
            </Button>
            <button
              type="button"
              onClick={() => setExitDialogOpen(true)}
              className="mt-3 text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Esci dal quiz
            </button>
          </Card>
        </div>
      ) : null}
      {exitDialogOpen ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
        >
          <Card className="w-full max-w-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="exit-title" className="text-xl font-bold">
                  Uscire dal quiz?
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  I progressi di questa sessione non verranno salvati.
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
                className="flex-1 rounded-[var(--radius-control)] border border-[var(--border)] px-4 py-3 text-sm font-semibold"
              >
                Continua
              </button>
              <Button className="flex-1" onClick={exitQuiz}>
                Esci
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
