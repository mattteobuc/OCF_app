import { cn } from "@/lib/utils";
import type { Answer } from "@/types/question";
export function AnswerButton({ answer, selected, disabled, onClick }: { answer: Answer; selected: boolean; disabled?: boolean; onClick: () => void }) {
  return <button disabled={disabled} onClick={onClick} className={cn("flex w-full items-center gap-3 rounded-xl border p-4 text-left transition", selected ? "border-blue-700 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300", disabled && "cursor-default")}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">{answer.id}</span><span>{answer.text}</span></button>;
}
