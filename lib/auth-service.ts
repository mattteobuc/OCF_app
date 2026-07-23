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

export function getAuthErrorMessage(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials"))
    return "Email o password non corrette.";
  if (
    normalized.includes("already registered") ||
    normalized.includes("already been registered")
  )
    return "Esiste già un account con questa email. Prova ad accedere.";
  if (normalized.includes("email not confirmed"))
    return "Conferma prima il tuo indirizzo email, poi riprova.";
  if (normalized.includes("expired") || normalized.includes("invalid"))
    return "Il link non è più valido. Richiedine uno nuovo.";
  if (normalized.includes("rate limit"))
    return "Hai fatto troppi tentativi. Aspetta un momento e riprova.";
  return "Non siamo riusciti a completare l’operazione. Riprova.";
}

export async function requestPasswordReset(email: string) {
  if (!isSupabaseConfigured()) return;
  const { error } = await createClient().auth.resetPasswordForEmail(email, {
    redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
  });
  if (error) throw error;
}

export async function updatePassword(password: string) {
  const { error } = await createClient().auth.updateUser({ password });
  if (error) throw error;
}

export async function updateProfile({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const supabase = createClient();
  const user = await getCurrentUser();
  if (!user) throw new Error("not-authenticated");

  const { error: authError } = await supabase.auth.updateUser({
    email: email === user.email ? undefined : email,
    data: { full_name: fullName },
  });
  if (authError) throw authError;

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ full_name: fullName, email })
    .eq("id", user.id);
  if (profileError) throw profileError;
}
