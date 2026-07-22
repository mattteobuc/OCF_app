"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  async function login() {
    if (!supabase) {
      router.push("/dashboard");
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/dashboard` },
    });
    setMessage(error ? error.message : "Controlla la tua email per accedere.");
  }
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] font-bold text-white shadow-sm">O</div>
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">Quiz OCF</p>
      <h1 className="text-3xl font-bold tracking-tight">Accedi e continua a studiare</h1>
      <p className="mt-3 text-[var(--muted)]">Riceverai un link sicuro via email.</p>
      <label className="mt-8 text-sm font-medium">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="nome@email.it"
          className="mt-2 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
        />
      </label>
      <Button className="mt-4" disabled={!email} onClick={login}>
        Invia link di accesso
      </Button>
      {message && <p className="mt-4 text-sm text-[var(--muted)]">{message}</p>}
      <button
        className="mt-6 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
        onClick={() => router.push("/dashboard")}
      >
        Continua in modalità demo
      </button>
    </main>
  );
}
