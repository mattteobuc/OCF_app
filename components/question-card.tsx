import { AnswerButton } from "@/components/answer-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenText, Lightbulb } from "lucide-react";
import type { Question } from "@/types/question";
export function QuestionCard({
  question,
  selectedAnswer,
  confirmed,
  onSelect,
  onConfirm,
  onNext,
}: {
  question: Question;
  selectedAnswer?: string;
  confirmed: boolean;
  onSelect: (id: string) => void;
  onConfirm: () => void;
  onNext: () => void;
}) {
  const correct = question.answers.find((answer) => answer.correct);
  const selected = question.answers.find(
    (answer) => answer.id === selectedAnswer,
  );
  return (
    <Card className="mx-auto max-w-[720px] p-5 sm:p-9">
      <article className="space-y-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
          <span className="font-medium text-[var(--accent)]">
            {question.topic}
          </span>
          <span aria-hidden="true">·</span>
          <span>{question.subtopic}</span>
        </div>
        <div>
          <p className="mb-4 text-sm text-[var(--muted)]">
            Quesito {question.id} · Livello {question.difficulty}
          </p>
          <h1 className="text-[24px] leading-[1.35] font-semibold tracking-[-0.025em] sm:text-[28px]">
            {question.question}
          </h1>
        </div>
        <div className="space-y-3">
          {question.answers.map((answer) => (
            <AnswerButton
              key={answer.id}
              answer={answer}
              selected={answer.id === selectedAnswer}
              result={
                confirmed
                  ? answer.correct
                    ? "correct"
                    : answer.id === selectedAnswer
                      ? "incorrect"
                      : undefined
                  : undefined
              }
              disabled={confirmed}
              onClick={() => onSelect(answer.id)}
            />
          ))}
        </div>
        {confirmed ? (
          <div
            className={`rounded-[var(--radius-control)] border p-4 ${selected?.correct ? "border-[var(--success)] bg-[var(--success-soft)] text-[var(--success-foreground)]" : "border-[var(--error)] bg-[var(--error-soft)] text-[var(--error-foreground)]"}`}
          >
            <p className="font-medium">
              {selected?.correct
                ? "Risposta corretta."
                : `La risposta corretta è ${correct?.id}.`}
            </p>
          </div>
        ) : null}
        {confirmed && (question.explanation || question.reference) ? (
          <div className="space-y-4 border-t border-[var(--border)] pt-6">
            {question.explanation ? (
              <div className="flex gap-3">
                <Lightbulb
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--warning)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium">Perché è corretta</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {question.explanation}
                  </p>
                </div>
              </div>
            ) : null}
            {question.reference ? (
              <div className="flex gap-3 border-t border-[var(--border)] pt-4">
                <BookOpenText
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium">Riferimento normativo</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {question.reference}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <Button
          className="w-full"
          disabled={!selectedAnswer}
          onClick={confirmed ? onNext : onConfirm}
        >
          {confirmed ? "Domanda successiva" : "Conferma risposta"}
        </Button>
      </article>
    </Card>
  );
}
