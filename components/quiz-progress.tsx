export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const value = total ? (current / total) * 100 : 0;
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex justify-between text-sm font-medium text-[var(--muted)]">
        <span>
          Domanda {current} di {total}
        </span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
        <div
          className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
