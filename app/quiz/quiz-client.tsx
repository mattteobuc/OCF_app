"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { QuizProgress } from "@/components/quiz-progress";
import type { Question } from "@/types/question";

export function QuizClient({ questions }: { questions: Question[] }) { const router = useRouter(); const [index, setIndex] = useState(0); const [answer, setAnswer] = useState<string>(); const [confirmed, setConfirmed] = useState(false); const [correct, setCorrect] = useState(0); const [startedAt] = useState(() => Date.now()); const question = questions[index]; const total = questions.length; const results = useMemo(() => ({ totalQuestions: total, correctAnswers: correct, wrongAnswers: total - correct, score: total ? Math.round((correct / total) * 100) : 0, durationSeconds: Math.round((Date.now() - startedAt) / 1000) }), [correct, startedAt, total]);
  function confirm() { setConfirmed(true); if (question.answers.find((item) => item.id === answer)?.correct) setCorrect((value) => value + 1); }
  function next() { if (index + 1 >= total) { sessionStorage.setItem("ocf-quiz-result", JSON.stringify(results)); router.push("/result"); return; } setIndex((value) => value + 1); setAnswer(undefined); setConfirmed(false); }
  if (!question) return <p>Nessuna domanda disponibile.</p>;
  return <div><QuizProgress current={index + 1} total={total} /><div className="mt-7"><QuestionCard question={question} selectedAnswer={answer} confirmed={confirmed} onSelect={setAnswer} onConfirm={confirm} onNext={next} /></div></div>;
}
