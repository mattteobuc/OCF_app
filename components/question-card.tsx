import { AnswerButton } from "@/components/answer-button";
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
    <article className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-semibold text-blue-700">
          {question.topic} · {question.subtopic}
        </p>
        <h1 className="text-xl leading-snug font-bold">{question.question}</h1>
      </div>
      <div className="space-y-3">
        {question.answers.map((answer) => (
          <AnswerButton
            key={answer.id}
            answer={answer}
            selected={answer.id === selectedAnswer}
            disabled={confirmed}
            onClick={() => onSelect(answer.id)}
          />
        ))}
      </div>
      {confirmed ? (
        <div
          className={`rounded-xl p-4 ${selected?.correct ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}
        >
          <p className="font-bold">
            {selected?.correct
              ? "Corretto!"
              : `Errato. Risposta corretta: ${correct?.id}`}
          </p>
          <p className="mt-2 text-sm">{question.explanation}</p>
          <p className="mt-2 text-xs font-medium">{question.reference}</p>
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
  );
}
