# OCF Trainer

MVP mobile-first per la preparazione all'esame OCF. Le domande vivono nel repository come JSON; Supabase gestisce solo autenticazione e dati dell'utente.

## Stack

Next.js 15, React, TypeScript, Tailwind CSS, componenti in stile shadcn/ui e Supabase.

## Avvio locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri `http://localhost:3000`.

## Configurare Supabase

1. Crea un progetto Supabase e abilita il provider Email in Authentication.
2. In **Authentication → URL Configuration**, aggiungi `http://localhost:3000/dashboard` e l'URL di produzione come redirect URL.
3. Esegui il file `supabase/migrations/20260721000000_initial_schema.sql` nello SQL Editor (oppure con Supabase CLI).
4. Copia Project URL e anon key in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Senza variabili Supabase l'app resta navigabile in modalità demo; l'accesso email non viene eseguito.

## Domande locali

Il formato e gli esempi sono in `data/questions.json`. Tutte le schermate usano esclusivamente `lib/question-service.ts` per recuperarle, evitando dipendenze dall'origine dati.

Per passare a un database in futuro, mantieni le firme di `getAllQuestions`, `getQuestionById`, `getRandomQuestions` e `getQuestionsByTopic` e sostituisci solo l'implementazione del service. Le UI non richiederanno modifiche.

## Deploy su Vercel

1. Pubblica il repository su GitHub.
2. Importalo in Vercel come progetto Next.js.
3. Aggiungi le due variabili `NEXT_PUBLIC_SUPABASE_*` in **Settings → Environment Variables**.
4. Verifica che il redirect URL di Supabase includa `https://<tuo-dominio>/dashboard` e fai deploy.

## Comandi utili

```bash
npm run lint
npm run format:check
npm run build
```

## Roadmap MVP

1. Convertire e validare i file JSON sorgente in `data/questions.json`, aggiungendo spiegazioni e riferimenti normativi.
2. Pubblicare l'app su GitHub e collegarla a Vercel per i deploy automatici.
3. Implementare Supabase in una seconda fase: autenticazione, profilo, storico quiz, risposte e statistiche persistenti.
