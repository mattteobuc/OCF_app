"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "register";

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setMessage("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      router.push("/dashboard");
      return;
    }
    setLoading(true);
    setMessage("");

    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName.trim() || null },
          emailRedirectTo: `${location.origin}/dashboard`,
        },
      });
      if (error) {
        setMessage(error.message);
      } else if (data.session) {
        router.push("/dashboard");
      } else {
        setMessage(
          "Registrazione completata. Controlla la tua email per confermare l'account.",
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage("Email o password non valide.");
      } else {
        router.push("/dashboard");
      }
    }
    setLoading(false);
  }

  async function sendMagicLink() {
    if (!supabase) {
      router.push("/dashboard");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/dashboard` },
    });
    setMessage(error ? error.message : "Controlla la tua email per accedere.");
    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] font-bold text-white shadow-sm">
        O
      </div>
      <p className="mb-3 text-sm font-semibold tracking-widest text-[var(--primary)] uppercase">
        Quiz OCF
      </p>
      <h1 className="text-3xl font-bold tracking-tight">
        {mode === "login"
          ? "Accedi e continua a studiare"
          : "Crea il tuo account"}
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        {mode === "login"
          ? "Accedi per ritrovare i tuoi progressi."
          : "Salva i risultati e monitora la tua preparazione."}
      </p>

      <div
        className="mt-8 grid grid-cols-2 rounded-[var(--radius-control)] bg-[var(--surface-muted)] p-1"
        role="tablist"
        aria-label="Modalità autenticazione"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          onClick={() => switchMode("login")}
          className={`rounded-[10px] px-3 py-2 text-sm font-semibold transition ${mode === "login" ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted)]"}`}
        >
          Accedi
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "register"}
          onClick={() => switchMode("register")}
          className={`rounded-[10px] px-3 py-2 text-sm font-semibold transition ${mode === "register" ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted)]"}`}
        >
          Registrati
        </button>
      </div>

      <form className="mt-6" onSubmit={submit}>
        {mode === "register" ? (
          <label className="block text-sm font-medium">
            Nome e cognome{" "}
            <span className="font-normal text-[var(--muted)]">(opzionale)</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Mario Rossi"
              autoComplete="name"
              className="mt-2 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] transition outline-none focus:border-[var(--primary)]"
            />
          </label>
        ) : null}
        <label className="mt-4 block text-sm font-medium">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nome@email.it"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] transition outline-none focus:border-[var(--primary)]"
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Almeno 6 caratteri"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            minLength={6}
            required
            className="mt-2 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] transition outline-none focus:border-[var(--primary)]"
          />
        </label>
        <Button
          className="mt-5 w-full"
          type="submit"
          disabled={loading || !email || password.length < 6}
        >
          {loading
            ? "Attendi..."
            : mode === "login"
              ? "Accedi"
              : "Crea account"}
        </Button>
      </form>

      {mode === "login" ? (
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)] disabled:opacity-50"
          disabled={loading || !email}
          onClick={sendMagicLink}
        >
          Oppure inviami un magic link
        </button>
      ) : null}
      {message && (
        <p className="mt-4 text-sm text-[var(--muted)]" role="status">
          {message}
        </p>
      )}
      <button
        type="button"
        className="mt-6 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
        onClick={() => router.push("/dashboard")}
      >
        Continua in modalità demo
      </button>
    </main>
  );
}
