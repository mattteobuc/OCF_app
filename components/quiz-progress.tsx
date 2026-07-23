export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const value = total ? (current / total) * 100 : 0;
  return (
    <div className="px-1">
      <div className="mb-3 flex justify-between text-sm text-[var(--muted)]">
        <span>
          Domanda {current} di {total}
        </span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-200 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
