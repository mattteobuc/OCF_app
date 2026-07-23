"use client";

import { getCurrentUser, isSupabaseConfigured } from "@/lib/auth-service";
import { createClient } from "@/lib/supabase/client";
import type { ActiveQuiz } from "@/types/quiz";

const storageKey = "ocf-active-quiz";

function saveLocally(quiz: ActiveQuiz) {
  localStorage.setItem(storageKey, JSON.stringify(quiz));
}

function readLocalQuiz(): ActiveQuiz | null {
  const saved = localStorage.getItem(storageKey);
  return saved ? (JSON.parse(saved) as ActiveQuiz) : null;
}

export async function saveActiveQuiz(quiz: ActiveQuiz) {
  saveLocally(quiz);
  if (!isSupabaseConfigured()) return;

  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await createClient().from("active_quiz_sessions").upsert({
    user_id: user.id,
    question_ids: quiz.questionIds,
    answer_orders: quiz.answerOrders,
    current_index: quiz.currentIndex,
    correct_answers: quiz.correctAnswers,
    answers: quiz.answers,
    elapsed_seconds: quiz.elapsedSeconds,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function getActiveQuiz(): Promise<ActiveQuiz | null> {
  const localQuiz = readLocalQuiz();
  if (localQuiz) return localQuiz;
  if (!isSupabaseConfigured()) return null;

  const user = await getCurrentUser();
  if (!user) return null;
  const { data, error } = await createClient()
    .from("active_quiz_sessions")
    .select(
      "question_ids, answer_orders, current_index, correct_answers, answers, elapsed_seconds",
    )
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const quiz: ActiveQuiz = {
    questionIds: data.question_ids,
    answerOrders: data.answer_orders,
    currentIndex: data.current_index,
    correctAnswers: data.correct_answers,
    answers: data.answers,
    elapsedSeconds: data.elapsed_seconds,
  };
  saveLocally(quiz);
  return quiz;
}

export async function clearActiveQuiz() {
  localStorage.removeItem(storageKey);
  if (!isSupabaseConfigured()) return;
  const user = await getCurrentUser();
  if (!user) return;
  const { error } = await createClient()
    .from("active_quiz_sessions")
    .delete()
    .eq("user_id", user.id);
  if (error) throw error;
}
