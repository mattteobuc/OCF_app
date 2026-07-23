"use client";

import { createClient } from "@/lib/supabase/client";

export const isSupabaseConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await createClient().auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function signOut() {
  if (!isSupabaseConfigured()) return;
  const { error } = await createClient().auth.signOut();
  if (error) throw error;
}
