import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { TopicCard } from "@/components/topic-card";
import { ContinueQuizCard } from "@/components/continue-quiz-card";
import { ArrowRight, BarChart3, Play, Sparkles } from "lucide-react";
import { getAllQuestions, getTopics } from "@/lib/question-service";

export default function DashboardPage() {
  const questions = getAllQuestions();
  return (
    <PageShell>
      <section>
        <p className="text-sm font-semibold tracking-widest text-[var(--primary)] uppercase">
          Area studio
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Cosa vuoi allenare?
        </h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Scegli una simulazione rapida o concentrati su un argomento specifico.
        </p>
        <ContinueQuizCard />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/quiz">
            <Card className="group h-full border-blue-700 bg-blue-700 text-white shadow-[0_12px_30px_rgb(37_99_235_/_0.18)] hover:-translate-y-1 hover:bg-blue-700">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="h-5 w-5 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-6 font-bold">Nuova simulazione</p>
              <p className="mt-2 text-sm text-blue-100">
                5 domande per iniziare subito
              </p>
            </Card>
          </Link>
          <Link href="/profile">
            <Card className="group h-full hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--primary)]">
                  <BarChart3 className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="h-5 w-5 text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-6 font-bold">Progressi e statistiche</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Segui i tuoi risultati
              </p>
            </Card>
          </Link>
        </div>
      </section>
      <section id="argomenti" className="mt-10 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Quiz per argomento
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Ripassa esattamente ciò che ti serve.
            </p>
          </div>
          <Sparkles
            className="h-5 w-5 text-[var(--warning)]"
            aria-hidden="true"
          />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {getTopics().map((topic) => (
            <TopicCard
              key={topic}
              topic={topic}
              count={
                questions.filter((question) => question.topic === topic).length
              }
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
