import Link from "next/link";
import { Card } from "@/components/ui/card";
export function TopicCard({ topic, count }: { topic: string; count: number }) {
  return (
    <Link href={`/quiz/topic/${encodeURIComponent(topic)}`}>
      <Card className="transition hover:border-blue-200">
        <p className="font-bold">{topic}</p>
        <p className="mt-1 text-sm text-slate-500">
          {count} domande disponibili
        </p>
      </Card>
    </Link>
  );
}
