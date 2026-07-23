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
      <main className="mx-auto min-h-[calc(100vh-65px)] max-w-[800px] px-5 py-10 sm:px-8 sm:py-14">
        {children}
      </main>
    </>
  );
}
