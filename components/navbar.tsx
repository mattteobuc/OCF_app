import Link from "next/link";
import { Moon, Sun, UserRound } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[color:var(--surface)]/90 backdrop-blur">
      <nav className="mx-auto flex h-[73px] max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link href="/dashboard" className="flex items-center gap-3 font-bold tracking-tight text-[var(--foreground)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-sm text-white shadow-sm">O</span>
          <span>Quiz OCF</span>
        </Link>
        <div className="flex items-center gap-2">
          <label className="theme-toggle" title="Cambia tema">
            <input id="theme-toggle" type="checkbox" aria-label="Attiva tema scuro" />
            <Sun className="h-4 w-4" aria-hidden="true" />
            <Moon className="h-4 w-4" aria-hidden="true" />
          </label>
          <Link href="/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]">
            <UserRound className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Profilo</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
