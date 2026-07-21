"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { ScoreCard } from "@/components/score-card";
import type { QuizResult } from "@/types/quiz";
export default function ResultPage() { const [result, setResult] = useState<QuizResult>(); useEffect(() => { const saved = sessionStorage.getItem("ocf-quiz-result"); if (saved) setResult(JSON.parse(saved)); }, []); if (!result) return <PageShell><p>Nessun risultato disponibile.</p></PageShell>; return <PageShell><p className="font-semibold text-emerald-600">QUIZ COMPLETATO</p><h1 className="mt-1 text-3xl font-bold">{result.score}% corrette</h1><div className="mt-6 grid grid-cols-2 gap-3"><ScoreCard label="Corrette" value={result.correctAnswers} /><ScoreCard label="Errate" value={result.wrongAnswers} /><ScoreCard label="Domande" value={result.totalQuestions} /><ScoreCard label="Tempo" value={`${result.durationSeconds}s`} /></div><Link className="mt-7 block" href="/quiz"><Button className="w-full">Nuovo quiz</Button></Link><Link className="mt-4 block text-center text-sm text-blue-700" href="/dashboard">Torna alla dashboard</Link></PageShell>; }
