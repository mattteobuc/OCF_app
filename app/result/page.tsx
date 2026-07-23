"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ScoreCard } from "@/components/score-card";
import { saveQuizSession } from "@/lib/quiz-service";
import type { QuizSession } from "@/types/quiz";
export default function ResultPage() {
  const [session, setSession] = useState<QuizSession>();
  useEffect(() => {
    const saved = sessionStorage.getItem("ocf-quiz-result");
    if (!saved) return;
    const parsed = JSON.parse(saved) as QuizSession;
    setSession(parsed);
    const savedKey = `ocf-quiz-result-saved:${saved}`;
    if (sessionStorage.getItem(savedKey)) return;
    void saveQuizSession(parsed.result, parsed.answers).then(
      ({ saved: wasSaved }) => {
        if (wasSaved) sessionStorage.setItem(savedKey, "true");
      },
    );
  }, []);
  if (!session)
    return (
      <PageShell>
        <p className="text-[var(--muted)]">
          Non troviamo un risultato da mostrare.
        </p>
      </PageShell>
    );
  return (
    <PageShell>
      <p className="text-sm font-medium text-[var(--accent)]">
        Sessione completata
      </p>
      <h1 className="mt-3 text-[34px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[42px]">
        {session.result.score}% di risposte corrette
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Un passo in più nella tua preparazione.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ScoreCard label="Corrette" value={session.result.correctAnswers} />
        <ScoreCard label="Errate" value={session.result.wrongAnswers} />
        <ScoreCard label="Domande" value={session.result.totalQuestions} />
        <ScoreCard label="Tempo" value={`${session.result.durationSeconds}s`} />
      </div>
      <Link className="mt-7 block" href="/quiz">
        <Button className="w-full">Inizia un altro quiz</Button>
      </Link>
      <Link
        className="mt-5 block text-center text-sm font-medium text-[var(--primary)]"
        href="/dashboard"
      >
        Torna alla tua preparazione
      </Link>
    </PageShell>
  );
}
