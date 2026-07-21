import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { TopicCard } from "@/components/topic-card";
import { getAllQuestions, getTopics } from "@/lib/question-service";

export default function DashboardPage() { const questions = getAllQuestions(); return <PageShell><section><p className="text-sm font-semibold text-blue-700">BENTORNATO</p><h1 className="mt-1 text-3xl font-bold">Cosa vuoi allenare?</h1><div className="mt-6 grid gap-4 sm:grid-cols-2"><Link href="/quiz"><Card className="bg-blue-700 text-white"><p className="font-bold">Quiz casuale</p><p className="mt-2 text-sm text-blue-100">5 domande per iniziare subito</p></Card></Link><Link href="/profile"><Card><p className="font-bold">Statistiche</p><p className="mt-2 text-sm text-slate-500">Segui i tuoi risultati</p></Card></Link></div></section><section className="mt-10"><h2 className="text-xl font-bold">Quiz per argomento</h2><div className="mt-4 grid gap-3">{getTopics().map((topic) => <TopicCard key={topic} topic={topic} count={questions.filter((question) => question.topic === topic).length} />)}</div></section></PageShell>; }
