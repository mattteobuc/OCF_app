import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[800px] flex-col justify-center px-6 sm:px-8">
      <p className="mb-5 text-sm font-medium text-[var(--accent)]">
        OCF Studio
      </p>
      <h1 className="max-w-[680px] text-[42px] leading-[1.06] font-semibold tracking-[-0.045em] sm:text-[58px]">
        Studia con metodo. Arriva pronto.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
        Un ambiente essenziale per allenarti sull’esame OCF, con domande,
        spiegazioni e progressi sempre al tuo posto.
      </p>
      <Link href="/login" className="mt-9">
        <Button>Inizia il tuo percorso</Button>
      </Link>
    </main>
  );
}
