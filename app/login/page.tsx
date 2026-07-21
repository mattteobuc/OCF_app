"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function LoginPage() { const [email, setEmail] = useState(""); const [message, setMessage] = useState(""); const router = useRouter();
  async function login() { if (!supabase) { router.push("/dashboard"); return; } const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/dashboard` } }); setMessage(error ? error.message : "Controlla la tua email per accedere."); }
  return <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6"><p className="mb-3 font-bold text-blue-700">OCF TRAINER</p><h1 className="text-3xl font-bold">Accedi e continua a studiare</h1><p className="mt-3 text-slate-600">Riceverai un link sicuro via email.</p><label className="mt-8 text-sm font-medium">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nome@email.it" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-700" /></label><Button className="mt-4" disabled={!email} onClick={login}>Invia link di accesso</Button>{message && <p className="mt-4 text-sm text-slate-600">{message}</p>}<button className="mt-6 text-sm text-blue-700" onClick={() => router.push("/dashboard")}>Continua in modalità demo</button></main>; }
