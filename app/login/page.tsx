"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/auth-service";
import { createClient } from "@/lib/supabase/client";

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
    if (!isSupabaseConfigured()) {
      router.push("/dashboard");
      return;
    }
    const supabase = createClient();
    setLoading(true);
    setMessage("");

    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName.trim() || null },
          emailRedirectTo: `${location.origin}/auth/callback`,
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
    if (!isSupabaseConfigured()) {
      router.push("/dashboard");
      return;
    }
    const supabase = createClient();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setMessage(error ? error.message : "Controlla la tua email per accedere.");
    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-semibold tracking-tight text-white">
        OCF
      </div>
      <p className="mb-4 text-sm font-medium text-[var(--accent)]">
        Il tuo spazio di studio
      </p>
      <h1 className="text-[32px] leading-[1.15] font-semibold tracking-[-0.035em]">
        {mode === "login"
          ? "Riprendi il tuo percorso"
          : "Inizia con il tuo account"}
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        {mode === "login"
          ? "I tuoi progressi sono qui, pronti quando lo sei tu."
          : "Conserva i risultati e studia con continuità."}
      </p>

      <div
        className="mt-9 grid grid-cols-2 rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface-muted)] p-1"
        role="tablist"
        aria-label="Modalità autenticazione"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "login"}
          onClick={() => switchMode("login")}
          className={`min-h-10 rounded-[8px] px-3 text-sm font-medium transition duration-200 ${mode === "login" ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted)]"}`}
        >
          Accedi
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "register"}
          onClick={() => switchMode("register")}
          className={`min-h-10 rounded-[8px] px-3 text-sm font-medium transition duration-200 ${mode === "register" ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted)]"}`}
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
              className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--foreground)] transition outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
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
            className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--foreground)] transition outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
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
            className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--foreground)] transition outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
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
              : "Crea il tuo account"}
        </Button>
      </form>

      {mode === "login" ? (
        <button
          type="button"
          className="mt-5 text-sm font-medium text-[var(--primary)] transition duration-200 hover:text-[var(--primary-hover)] disabled:opacity-50"
          disabled={loading || !email}
          onClick={sendMagicLink}
        >
          Inviami invece un link di accesso
        </button>
      ) : null}
      {message && (
        <p className="mt-4 text-sm text-[var(--muted)]" role="status">
          {message}
        </p>
      )}
      <button
        type="button"
        className="mt-8 text-sm font-medium text-[var(--muted)] transition duration-200 hover:text-[var(--foreground)]"
        onClick={() => router.push("/dashboard")}
      >
        Esplora prima in modalità demo
      </button>
    </main>
  );
}
