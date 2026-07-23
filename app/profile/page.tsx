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
      <p className="text-sm font-semibold tracking-widest text-[var(--primary)] uppercase">
        Il tuo spazio
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Profilo e statistiche
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        {loading
          ? "Caricamento delle tue statistiche..."
          : stats
            ? "I tuoi progressi vengono aggiornati dopo ogni simulazione."
            : "Accedi per memorizzare i risultati e visualizzare i tuoi progressi."}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <ScoreCard
          label="Quiz svolti"
          value={loading ? "..." : (stats?.completedQuizzes ?? "—")}
        />
        <ScoreCard
          label="Domande risposte"
          value={loading ? "..." : (stats?.answeredQuestions ?? "—")}
        />
        <ScoreCard
          label="Percentuale corrette"
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
            <p className="text-sm font-semibold text-[var(--muted)]">
              Ultimo quiz
            </p>
            <p className="mt-2 text-2xl font-bold">{stats.latestQuiz.score}%</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {stats.latestQuiz.totalQuestions} domande completate
            </p>
          </div>
        ) : !loading ? (
          <EmptyState message="Nessun quiz salvato. Completa una simulazione per iniziare a costruire le tue statistiche." />
        ) : null}
      </div>
    </PageShell>
  );
}
