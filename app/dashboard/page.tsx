import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { TopicCard } from "@/components/topic-card";
import { ContinueQuizCard } from "@/components/continue-quiz-card";
import { ArrowRight, BarChart3, Play } from "lucide-react";
import { getAllQuestions, getTopics } from "@/lib/question-service";

export default function DashboardPage() {
  const questions = getAllQuestions();
  return (
    <PageShell>
      <section>
        <p className="text-sm font-medium text-[var(--accent)]">
          La tua preparazione
        </p>
        <h1 className="mt-3 text-[34px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[42px]">
          Bentornato.
        </h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">
          Dedica qualche minuto a ciò che conta oggi.
        </p>
        <ContinueQuizCard />
        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          <Link href="/quiz">
            <Card className="group h-full border-[var(--primary)] bg-[var(--primary)] text-white hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-white/12">
                  <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="h-5 w-5 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-7 text-[17px] font-medium">Allenamento rapido</p>
              <p className="mt-2 text-sm text-white/70">
                Cinque domande, il ritmo giusto per iniziare.
              </p>
            </Card>
          </Link>
          <Link href="/profile">
            <Card className="group h-full hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--surface-muted)] text-[var(--primary)]">
                  <BarChart3 className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="h-5 w-5 text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--primary)]"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-7 text-[17px] font-medium">I tuoi progressi</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Guarda come sta andando il tuo percorso.
              </p>
            </Card>
          </Link>
        </div>
      </section>
      <section id="argomenti" className="mt-16 scroll-mt-24">
        <div>
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em]">
              Scegli un argomento
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Concentrati su un’area alla volta.
            </p>
          </div>
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
