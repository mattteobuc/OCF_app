"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { getCurrentUser, signOut } from "@/lib/auth-service";

export function Navbar({ quizMode = false }: { quizMode?: boolean }) {
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    getCurrentUser()
      .then((user) => setEmail(user?.email))
      .catch(() => setEmail(undefined));
  }, []);

  async function logout() {
    await signOut();
    setEmail(undefined);
  }

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[color:var(--surface)]/90 backdrop-blur">
      <nav className="mx-auto flex h-[73px] max-w-5xl items-center justify-between px-5 sm:px-8">
        {quizMode ? (
          <div className="flex items-center gap-3 font-bold tracking-tight text-[var(--foreground)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-sm text-white shadow-sm">
              O
            </span>
            <span>Quiz OCF</span>
          </div>
        ) : (
          <Link
            href="/dashboard"
            className="flex items-center gap-3 font-bold tracking-tight text-[var(--foreground)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-sm text-white shadow-sm">
              O
            </span>
            <span>Quiz OCF</span>
          </Link>
        )}
        {!quizMode ? (
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              title={email ?? "Profilo"}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              <span className="hidden max-w-[180px] truncate sm:inline">
                {email ?? "Profilo"}
              </span>
            </Link>
            {email ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-xl px-2 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              >
                Esci
              </button>
            ) : null}
          </div>
        ) : (
          <span className="text-sm font-medium text-[var(--muted)]">
            Sessione in corso
          </span>
        )}
      </nav>
    </header>
  );
}
