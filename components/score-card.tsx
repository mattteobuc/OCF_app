import { Card } from "@/components/ui/card";
import {
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ListChecks,
} from "lucide-react";
export function ScoreCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  const Icon = label.includes("corrett")
    ? CheckCircle2
    : label.includes("errat")
      ? CircleAlert
      : label.includes("Tempo")
        ? Clock3
        : label.includes("Domande")
          ? ListChecks
          : BarChart3;
  return (
    <Card className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-[var(--muted)]">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      </div>
      <Icon className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
    </Card>
  );
}
