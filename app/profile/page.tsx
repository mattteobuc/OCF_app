"use client";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { ScoreCard } from "@/components/score-card";
import { EmptyState } from "@/components/empty-state";
import { getQuizStats, type QuizStats } from "@/lib/quiz-service";
import {
  getAuthErrorMessage,
  getCurrentUser,
  signOut,
  updateProfile,
} from "@/lib/auth-service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [stats, setStats] = useState<QuizStats | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getQuizStats()
      .then(setStats)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    getCurrentUser()
      .then((user) => {
        setIsGuest(!user);
        setFullName(
          (user?.user_metadata.full_name as string | undefined) ?? "",
        );
        setEmail(user?.email ?? "");
      })
      .catch(() => setIsGuest(true));
  }, []);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setProfileMessage("");
    try {
      await updateProfile({ fullName: fullName.trim(), email: email.trim() });
      setProfileMessage("Modifiche salvate.");
    } catch (saveError) {
      setProfileMessage(
        getAuthErrorMessage(
          saveError instanceof Error ? saveError.message : "",
        ),
      );
    } finally {
      setSaving(false);
    }
  }
  async function logout() {
    await signOut();
    router.push("/");
  }

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
      {isGuest && !loading ? (
        <section className="mt-8 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--primary-soft)] p-5">
          <h2 className="font-medium">Stai usando la modalità demo</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Accedi per conservare risultati e progressi oltre questo
            dispositivo.
          </p>
          <Link
            href="/login?next=/profile"
            className="mt-4 inline-block text-sm font-medium text-[var(--primary)]"
          >
            Accedi o crea un account
          </Link>
        </section>
      ) : null}
      {!isGuest ? (
        <>
          <section className="mt-14 border-t border-[var(--border)] pt-8">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">
              I tuoi dati
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Mantieni aggiornate le informazioni del tuo account.
            </p>
            <form className="mt-6 space-y-4" onSubmit={saveProfile}>
              <label className="block text-sm font-medium">
                Nome
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  autoComplete="name"
                  className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--accent)]"
                  placeholder="Il tuo nome"
                />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <p className="text-sm text-[var(--muted)]">
                Se modifichi l’email, potresti dover confermare il nuovo
                indirizzo.
              </p>
              <button
                type="submit"
                disabled={saving}
                className="min-h-11 rounded-[var(--radius-control)] bg-[var(--primary)] px-5 text-sm font-medium text-white disabled:opacity-50"
              >
                {saving ? "Salvataggio…" : "Salva modifiche"}
              </button>
              {profileMessage ? (
                <p className="text-sm text-[var(--muted)]" role="status">
                  {profileMessage}
                </p>
              ) : null}
            </form>
          </section>
          <section className="mt-12 border-t border-[var(--border)] pt-8">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">
              Sicurezza
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Puoi aggiornare la password in qualsiasi momento.
            </p>
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="mt-5 min-h-11 rounded-[var(--radius-control)] border border-[var(--border)] px-5 text-sm font-medium"
            >
              Reimposta password
            </button>
            <button
              type="button"
              onClick={logout}
              className="ml-3 min-h-11 px-3 text-sm font-medium text-[var(--muted)]"
            >
              Esci dall’account
            </button>
          </section>
        </>
      ) : null}
      <section className="mt-12 border-t border-[var(--border)] pt-8">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">Account</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          L’eliminazione dell’account non è ancora disponibile. Richiede una
          procedura server-side sicura per rimuovere profilo, risultati e
          risposte.
        </p>
      </section>
    </PageShell>
  );
}
