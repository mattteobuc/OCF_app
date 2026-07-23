"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { getCurrentUser, signOut } from "@/lib/auth-service";

export function Navbar({ quizMode = false }: { quizMode?: boolean }) {
  const [email, setEmail] = useState<string>();
  const [isDemo, setIsDemo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "1")
      localStorage.setItem("ocf-demo", "true");
    setIsDemo(localStorage.getItem("ocf-demo") === "true");
    getCurrentUser()
      .then((user) => {
        setEmail(user?.email);
        if (user) localStorage.removeItem("ocf-demo");
      })
      .catch(() => setEmail(undefined));
  }, []);

  async function logout() {
    try {
      await signOut();
    } finally {
      localStorage.removeItem("ocf-demo");
      setEmail(undefined);
      setIsDemo(false);
      router.replace("/");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[color:var(--background)]/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[800px] items-center justify-between px-5 sm:px-8">
        {quizMode ? (
          <div className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-[var(--foreground)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-semibold tracking-tight text-white">
              OCF
            </span>
            <span>Studio</span>
          </div>
        ) : (
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-[var(--foreground)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-semibold tracking-tight text-white">
              OCF
            </span>
            <span>Studio</span>
          </Link>
        )}
        {!quizMode ? (
          <div className="flex items-center gap-2">
            {email ? (
              <Link
                href="/profile"
                title={email}
                className="flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] px-3 text-sm font-medium text-[var(--muted)] transition duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              >
                <UserRound className="h-4 w-4" aria-hidden="true" />
                <span className="hidden max-w-[180px] truncate sm:inline">
                  {email}
                </span>
              </Link>
            ) : isDemo ? (
              <span className="hidden text-sm text-[var(--muted)] sm:inline">
                Modalità demo
              </span>
            ) : null}
            {email ? (
              <button
                type="button"
                onClick={logout}
                className="min-h-11 rounded-[var(--radius-control)] px-3 text-sm font-medium text-[var(--muted)] transition duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              >
                Esci
              </button>
            ) : (
              <>
                {isDemo ? (
                  <Link
                    href="/"
                    onClick={() => localStorage.removeItem("ocf-demo")}
                    className="hidden min-h-11 items-center px-2 text-sm font-medium text-[var(--muted)] sm:inline-flex"
                  >
                    Esci demo
                  </Link>
                ) : null}
                <Link
                  href="/login"
                  className="min-h-11 rounded-[var(--radius-control)] bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white"
                >
                  {isDemo ? "Salva i progressi" : "Accedi"}
                </Link>
              </>
            )}
          </div>
        ) : (
          <span className="text-sm text-[var(--muted)]">Quiz in corso</span>
        )}
      </nav>
    </header>
  );
}
