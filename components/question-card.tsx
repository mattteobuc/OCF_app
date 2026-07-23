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
    <Card className="mx-auto max-w-3xl p-5 sm:p-8">
      <article className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
          <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[var(--primary)]">
            {question.topic}
          </span>
          <span>{question.subtopic}</span>
          <span className="ml-auto rounded-full bg-[var(--surface-muted)] px-3 py-1">
            Livello {question.difficulty}
          </span>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--muted)]">
            Domanda {question.id}
          </p>
          <h1 className="text-[22px] leading-relaxed font-bold tracking-tight sm:text-2xl">
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
            className={`rounded-[var(--radius-control)] border p-4 ${selected?.correct ? "border-green-500 bg-[var(--success-soft)] text-[var(--success-foreground)]" : "border-red-500 bg-[var(--error-soft)] text-[var(--error-foreground)]"}`}
          >
            <p className="font-bold">
              {selected?.correct
                ? "Corretto!"
                : `Errato. Risposta corretta: ${correct?.id}`}
            </p>
          </div>
        ) : null}
        {confirmed && (question.explanation || question.reference) ? (
          <div className="space-y-3 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            {question.explanation ? (
              <div className="flex gap-3">
                <Lightbulb
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--warning)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold">Spiegazione</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {question.explanation}
                  </p>
                </div>
              </div>
            ) : null}
            {question.reference ? (
              <div className="flex gap-3 border-t border-[var(--border)] pt-3">
                <BookOpenText
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold">Riferimento normativo</p>
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
          {confirmed ? "Successiva" : "Conferma risposta"}
        </Button>
      </article>
    </Card>
  );
}
