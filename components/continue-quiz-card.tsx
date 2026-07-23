"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { getActiveQuiz } from "@/lib/active-quiz-service";
import { Card } from "@/components/ui/card";
import type { ActiveQuiz } from "@/types/quiz";

export function ContinueQuizCard() {
  const [quiz, setQuiz] = useState<ActiveQuiz | null>();

  useEffect(() => {
    getActiveQuiz()
      .then(setQuiz)
      .catch(() => setQuiz(null));
  }, []);

  if (!quiz) return null;

  return (
    <Link href="/quiz/resume" className="mt-5 block">
      <Card className="group border-[var(--primary)] bg-[var(--primary-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <Play className="h-5 w-5 fill-current" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-bold">Riprendi quiz</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Domanda {quiz.currentIndex + 1} di {quiz.questionIds.length}
            </p>
          </div>
          <span className="text-sm font-semibold text-[var(--primary)]">
            Riprendi
          </span>
        </div>
      </Card>
    </Link>
  );
}
