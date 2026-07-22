import { AnswerButton } from "@/components/answer-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-blue-700">{question.topic}</span>
          <span>{question.subtopic}</span>
          <span className="ml-auto rounded-full bg-[var(--surface-muted)] px-3 py-1">Livello {question.difficulty}</span>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--muted)]">Domanda {question.id}</p>
          <h1 className="text-[22px] leading-relaxed font-bold tracking-tight sm:text-2xl">{question.question}</h1>
        </div>
      <div className="space-y-3">
        {question.answers.map((answer) => (
          <AnswerButton
            key={answer.id}
            answer={answer}
            selected={answer.id === selectedAnswer}
            result={confirmed ? (answer.correct ? "correct" : answer.id === selectedAnswer ? "incorrect" : undefined) : undefined}
            disabled={confirmed}
            onClick={() => onSelect(answer.id)}
          />
        ))}
      </div>
      {confirmed ? (
        <div
          className={`rounded-[var(--radius-control)] border p-4 ${selected?.correct ? "border-green-200 bg-[var(--success-soft)] text-green-900" : "border-red-200 bg-[var(--error-soft)] text-red-900"}`}
        >
          <p className="font-bold">
            {selected?.correct
              ? "Corretto!"
              : `Errato. Risposta corretta: ${correct?.id}`}
          </p>
          {question.explanation ? (
            <p className="mt-2 text-sm">{question.explanation}</p>
          ) : null}
          {question.reference ? (
            <p className="mt-2 text-xs font-medium">{question.reference}</p>
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
