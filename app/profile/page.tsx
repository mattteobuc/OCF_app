import { PageShell } from "@/components/page-shell";
import { ScoreCard } from "@/components/score-card";
import { EmptyState } from "@/components/empty-state";
export default function ProfilePage() {
  return (
    <PageShell>
      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">Il tuo spazio</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Profilo e statistiche</h1>
      <p className="mt-3 text-[var(--muted)]">
        Le tue statistiche compariranno qui dopo il primo quiz autenticato.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <ScoreCard label="Quiz svolti" value="—" />
        <ScoreCard label="Domande risposte" value="—" />
        <ScoreCard label="Percentuale corrette" value="—" />
        <ScoreCard label="Tempo medio" value="—" />
      </div>
      <div className="mt-5">
        <EmptyState message="Nessun ultimo quiz da mostrare." />
      </div>
    </PageShell>
  );
}
