"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getAuthErrorMessage, updatePassword } from "@/lib/auth-service";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmation) {
      setMessage("Le password non coincidono.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await updatePassword(password);
      setMessage("Password aggiornata. Ora puoi continuare.");
      setTimeout(() => router.push("/dashboard"), 700);
    } catch (error) {
      setMessage(
        getAuthErrorMessage(error instanceof Error ? error.message : ""),
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <p className="text-sm font-medium text-[var(--accent)]">Nuova password</p>
      <h1 className="mt-4 text-[32px] leading-[1.15] font-semibold tracking-[-0.035em]">
        Metti al sicuro il tuo account
      </h1>
      <form className="mt-8" onSubmit={submit}>
        <label className="block text-sm font-medium">
          Nuova password
          <input
            required
            minLength={6}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Ripeti la password
          <input
            required
            minLength={6}
            type="password"
            autoComplete="new-password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <Button
          className="mt-5 w-full"
          disabled={saving || password.length < 6}
        >
          {saving ? "Aggiornamento…" : "Salva la password"}
        </Button>
      </form>
      {message ? (
        <p className="mt-4 text-sm text-[var(--muted)]" role="status">
          {message}
        </p>
      ) : null}
    </main>
  );
}
