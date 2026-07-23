import { supabase } from "@/lib/supabase";
import type { QuizResult } from "@/types/quiz";

type AuthenticatedUser = { id: string };
type QuizHistoryRow = {
  score: number;
  total_questions: number;
  correct_answers: number;
  duration_seconds: number;
  created_at: string;
};

export type QuizStats = {
  completedQuizzes: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageDuration: number;
  latestQuiz?: {
    score: number;
    totalQuestions: number;
    createdAt: string;
  };
};

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function saveQuizResult(
  result: QuizResult,
  user?: AuthenticatedUser | null,
) {
  if (!supabase) return { saved: false, error: null };
  const currentUser = user ?? (await getCurrentUser());
  if (!currentUser) return { saved: false, error: null };

  const { error } = await supabase.from("quiz_history").insert({
    user_id: currentUser.id,
    score: result.score,
    total_questions: result.totalQuestions,
    correct_answers: result.correctAnswers,
    wrong_answers: result.wrongAnswers,
    duration_seconds: result.durationSeconds,
  });

  return { saved: !error, error };
}

export async function getQuizStats(): Promise<QuizStats | null> {
  if (!supabase) return null;
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("quiz_history")
    .select(
      "score, total_questions, correct_answers, duration_seconds, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  const history = (data ?? []) as QuizHistoryRow[];
  const answeredQuestions = history.reduce(
    (total, quiz) => total + quiz.total_questions,
    0,
  );
  const correctAnswers = history.reduce(
    (total, quiz) => total + quiz.correct_answers,
    0,
  );
  const totalDuration = history.reduce(
    (total, quiz) => total + quiz.duration_seconds,
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
