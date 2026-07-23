import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
export function PageShell({
  children,
  quizMode = false,
}: {
  children: ReactNode;
  quizMode?: boolean;
}) {
  return (
    <>
      <Navbar quizMode={quizMode} />
      <main className="mx-auto min-h-[calc(100vh-73px)] max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        {children}
      </main>
    </>
  );
}
