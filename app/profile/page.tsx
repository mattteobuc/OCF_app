"use client";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { ScoreCard } from "@/components/score-card";
import { EmptyState } from "@/components/empty-state";
import { getQuizStats, type QuizStats } from "@/lib/quiz-service";

export default function ProfilePage() {
  const [stats, setStats] = useState<QuizStats | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getQuizStats()
      .then(setStats)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const hasStats = Boolean(stats?.completedQuizzes);
  return (
    <PageShell>
      <p className="text-sm font-medium text-[var(--accent)]">
        Il tuo percorso
      </p>
      <h1 className="mt-3 text-[34px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[42px]">
        I tuoi progressi
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        {loading
          ? "Stiamo preparando il tuo riepilogo."
          : stats
            ? "Ogni sessione completata rende più chiaro il tuo percorso."
            : "Accedi per ritrovare qui il tuo andamento."}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <ScoreCard
          label="Sessioni concluse"
          value={loading ? "..." : (stats?.completedQuizzes ?? "—")}
        />
        <ScoreCard
          label="Quesiti affrontati"
          value={loading ? "..." : (stats?.answeredQuestions ?? "—")}
        />
        <ScoreCard
          label="Accuratezza"
          value={loading ? "..." : stats ? `${stats.accuracy}%` : "—"}
        />
        <ScoreCard
          label="Tempo medio"
          value={loading ? "..." : stats ? `${stats.averageDuration}s` : "—"}
        />
      </div>
      <div className="mt-5">
        {error ? (
          <EmptyState message="Non è stato possibile caricare le statistiche. Controlla la configurazione Supabase." />
        ) : hasStats && stats?.latestQuiz ? (
          <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
            <p className="text-sm font-medium text-[var(--muted)]">
              Ultima sessione
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {stats.latestQuiz.score}%
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {stats.latestQuiz.totalQuestions} quesiti completati
            </p>
          </div>
        ) : !loading ? (
          <EmptyState message="Non hai ancora sessioni salvate. Inizia un allenamento e qui troverai i tuoi progressi." />
        ) : null}
      </div>
    </PageShell>
  );
}
