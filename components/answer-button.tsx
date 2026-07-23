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
        "group flex min-h-14 w-full items-center gap-3 rounded-[var(--radius-control)] border bg-[var(--surface)] px-4 py-3.5 text-left text-[16px] leading-relaxed transition duration-200",
        selected
          ? "border-[var(--primary)] bg-[var(--primary-soft)] shadow-sm"
          : "border-[var(--border)] hover:border-[var(--muted)] hover:shadow-[var(--shadow-card)]",
        result === "correct" &&
          "border-[var(--success)] bg-[var(--success-soft)] text-[var(--success-foreground)]",
        result === "incorrect" &&
          "border-[var(--error)] bg-[var(--error-soft)] text-[var(--error-foreground)]",
        disabled && "cursor-default hover:translate-y-0 hover:shadow-none",
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-sm font-medium text-[var(--muted)]",
          selected && "border-[var(--primary)] bg-[var(--primary)] text-white",
          result === "correct" &&
            "border-[var(--success)] bg-[var(--success)] text-white",
          result === "incorrect" &&
            "border-[var(--error)] bg-[var(--error)] text-white",
        )}
      >
        {result === "correct" ? (
          <Check className="h-5 w-5" aria-hidden="true" />
        ) : result === "incorrect" ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          answer.id
        )}
      </span>
      <span className="flex-1">{answer.text}</span>
    </button>
  );
}
