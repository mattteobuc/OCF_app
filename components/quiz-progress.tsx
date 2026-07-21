export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const value = total ? (current / total) * 100 : 0;
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-slate-500">
        <span>
          Domanda {current} di {total}
        </span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
