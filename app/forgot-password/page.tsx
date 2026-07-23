"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAuthErrorMessage, requestPasswordReset } from "@/lib/auth-service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      await requestPasswordReset(email);
      setStatus("sent");
      setMessage(
        "Se esiste un account con questa email, riceverai un link per scegliere una nuova password.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        getAuthErrorMessage(error instanceof Error ? error.message : ""),
      );
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <p className="text-sm font-medium text-[var(--accent)]">
        Recupera accesso
      </p>
      <h1 className="mt-4 text-[32px] leading-[1.15] font-semibold tracking-[-0.035em]">
        Scegli una nuova password
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        Inserisci l’email usata per il tuo account. Ti invieremo un link sicuro.
      </p>
      <form className="mt-8" onSubmit={submit}>
        <label className="block text-sm font-medium">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--border)] bg-[var(--surface)] px-4 outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            placeholder="nome@email.it"
          />
        </label>
        <Button className="mt-5 w-full" disabled={status === "sending"}>
          {status === "sending" ? "Invio del link…" : "Invia il link"}
        </Button>
      </form>
      {message ? (
        <p className="mt-4 text-sm text-[var(--muted)]" role="status">
          {message}
        </p>
      ) : null}
      <Link
        href="/login"
        className="mt-7 text-sm font-medium text-[var(--primary)]"
      >
        Torna all’accesso
      </Link>
    </main>
  );
}
