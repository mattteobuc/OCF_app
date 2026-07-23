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
      <Card className="group border-[var(--accent)]/25 bg-[var(--primary-soft)] py-4 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
            <Play className="h-5 w-5 fill-current" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Riprendi da dove eri arrivato</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Domanda {quiz.currentIndex + 1} di {quiz.questionIds.length}
            </p>
          </div>
          <span className="text-sm font-medium text-[var(--accent)]">
            Riprendi
          </span>
        </div>
      </Card>
    </Link>
  );
}
