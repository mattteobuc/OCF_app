"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ScoreCard } from "@/components/score-card";
import { saveQuizResult } from "@/lib/user-data";
import type { QuizResult } from "@/types/quiz";
export default function ResultPage() {
  const [result, setResult] = useState<QuizResult>();
  useEffect(() => {
    const saved = sessionStorage.getItem("ocf-quiz-result");
    if (!saved) return;
    const parsed = JSON.parse(saved) as QuizResult;
    setResult(parsed);
    const savedKey = `ocf-quiz-result-saved:${saved}`;
    if (sessionStorage.getItem(savedKey)) return;
    void saveQuizResult(parsed).then(({ saved: wasSaved }) => {
      if (wasSaved) sessionStorage.setItem(savedKey, "true");
    });
  }, []);
  if (!result)
    return (
      <PageShell>
        <p>Nessun risultato disponibile.</p>
      </PageShell>
    );
  return (
    <PageShell>
      <p className="text-sm font-semibold tracking-widest text-green-600 uppercase">
        Quiz completato
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {result.score}% corrette
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Ecco il riepilogo della tua sessione.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ScoreCard label="Corrette" value={result.correctAnswers} />
        <ScoreCard label="Errate" value={result.wrongAnswers} />
        <ScoreCard label="Domande" value={result.totalQuestions} />
        <ScoreCard label="Tempo" value={`${result.durationSeconds}s`} />
      </div>
      <Link className="mt-7 block" href="/quiz">
        <Button className="w-full">Nuovo quiz</Button>
      </Link>
      <Link
        className="mt-4 block text-center text-sm text-blue-700"
        href="/dashboard"
      >
        Torna alla dashboard
      </Link>
    </PageShell>
  );
}
