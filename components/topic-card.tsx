import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
export function TopicCard({ topic, count }: { topic: string; count: number }) {
  return (
    <Link href={`/quiz/topic/${encodeURIComponent(topic)}`}>
      <Card className="group flex min-h-20 items-center gap-4 py-4 hover:-translate-y-0.5 hover:border-[var(--muted)] hover:shadow-[var(--shadow-hover)]">
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-medium">{topic}</span>
          <span className="mt-1 block text-sm text-[var(--muted)]">
            {count} quesiti disponibili
          </span>
        </span>
        <ArrowRight
          className="h-4 w-4 text-[var(--muted)] transition duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
          aria-hidden="true"
        />
      </Card>
    </Link>
  );
}
