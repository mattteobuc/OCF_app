import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import type { Answer } from "@/types/question";
export function AnswerButton({
  answer,
  selected,
  result,
  disabled,
  onClick,
}: {
  answer: Answer;
  selected: boolean;
  result?: "correct" | "incorrect";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-[var(--radius-control)] border bg-[var(--surface)] p-4 text-left text-[17px] leading-relaxed transition duration-200",
        selected
          ? "border-[var(--primary)] bg-[var(--primary-soft)] shadow-sm"
          : "border-[var(--border)] hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[var(--shadow-hover)]",
        result === "correct" && "border-green-500 bg-[var(--success-soft)] text-green-900",
        result === "incorrect" && "border-red-500 bg-[var(--error-soft)] text-red-900",
        disabled && "cursor-default hover:translate-y-0 hover:shadow-none",
      )}
    >
      <span className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-sm font-bold text-[var(--muted)]",
        selected && "bg-blue-100 text-blue-700",
        result === "correct" && "bg-green-100 text-green-700",
        result === "incorrect" && "bg-red-100 text-red-700",
      )}>
        {result === "correct" ? <Check className="h-5 w-5" aria-hidden="true" /> : result === "incorrect" ? <X className="h-5 w-5" aria-hidden="true" /> : answer.id}
      </span>
      <span className="flex-1">{answer.text}</span>
    </button>
  );
}
