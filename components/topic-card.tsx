import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
export function TopicCard({ topic, count }: { topic: string; count: number }) {
  return (
    <Link href={`/quiz/topic/${encodeURIComponent(topic)}`}>
      <Card className="group flex items-center gap-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[var(--shadow-hover)]">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-blue-700">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">{topic}</span>
          <span className="mt-1 block text-sm text-[var(--muted)]">
          {count} domande disponibili
          </span>
        </span>
        <ArrowUpRight className="h-5 w-5 text-[var(--muted)] transition group-hover:text-[var(--primary)]" aria-hidden="true" />
      </Card>
    </Link>
  );
}
