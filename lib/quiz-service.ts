"use client";

import { isSupabaseConfigured, getCurrentUser } from "@/lib/auth-service";
import { createClient } from "@/lib/supabase/client";
import type { QuizAnswer, QuizResult } from "@/types/quiz";

export type QuizStats = {
  completedQuizzes: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageDuration: number;
  latestQuiz?: { score: number; totalQuestions: number; createdAt: string };
};

type QuizHistoryRow = {
  score: number;
  total_questions: number;
  correct_answers: number;
  duration_seconds: number;
  created_at: string;
};

export async function saveQuizSession(
  result: QuizResult,
  answers: QuizAnswer[],
) {
  if (!isSupabaseConfigured())
    return { saved: false, reason: "not-configured" as const };

  const user = await getCurrentUser();
  if (!user) return { saved: false, reason: "not-authenticated" as const };

  const supabase = createClient();
  const { error: historyError } = await supabase.from("quiz_history").insert({
    user_id: user.id,
    score: result.score,
    total_questions: result.totalQuestions,
    correct_answers: result.correctAnswers,
    wrong_answers: result.wrongAnswers,
    duration_seconds: result.durationSeconds,
  });
  if (historyError) throw historyError;

  if (answers.length) {
    const { error: answersError } = await supabase.from("user_answers").insert(
      answers.map((answer) => ({
        user_id: user.id,
        question_id: answer.questionId,
        selected_answer: answer.selectedAnswer,
        correct: answer.correct,
      })),
    );
    if (answersError) throw answersError;
  }

  return { saved: true, reason: null };
}

export async function getQuizStats(): Promise<QuizStats | null> {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await createClient()
    .from("quiz_history")
    .select(
      "score, total_questions, correct_answers, duration_seconds, created_at",
    )
    .order("created_at", { ascending: false });
  if (error) throw error;

  const history = (data ?? []) as QuizHistoryRow[];
  const answeredQuestions = history.reduce(
    (sum, quiz) => sum + quiz.total_questions,
    0,
  );
  const correctAnswers = history.reduce(
    (sum, quiz) => sum + quiz.correct_answers,
    0,
  );
  const totalDuration = history.reduce(
    (sum, quiz) => sum + quiz.duration_seconds,
    0,
  );

  return {
    completedQuizzes: history.length,
    answeredQuestions,
    correctAnswers,
    accuracy: answeredQuestions
      ? Math.round((correctAnswers / answeredQuestions) * 100)
      : 0,
    averageDuration: history.length
      ? Math.round(totalDuration / history.length)
      : 0,
    latestQuiz: history[0]
      ? {
          score: history[0].score,
          totalQuestions: history[0].total_questions,
          createdAt: history[0].created_at,
        }
      : undefined,
  };
}
