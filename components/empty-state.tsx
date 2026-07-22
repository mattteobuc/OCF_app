export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted)]">
      {message}
    </div>
  );
}
