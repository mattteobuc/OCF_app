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

1. Crea un progetto Supabase e abilita il provider Email in Authentication. Sono disponibili registrazione/accesso con email e password e magic link.
2. In **Authentication → URL Configuration**, aggiungi `http://localhost:3000/dashboard` e l'URL di produzione come redirect URL.
3. Esegui il file `supabase/migrations/20260721000000_initial_schema.sql` nello SQL Editor (oppure con Supabase CLI).
4. Copia Project URL e anon key in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Senza variabili Supabase l'app resta navigabile in modalità demo; registrazione, login e salvataggio dei risultati non vengono eseguiti.

La pagina `/login` permette di:

- creare un account con nome opzionale, email e password;
- accedere con email e password;
- richiedere un magic link come alternativa al login con password.

Se la conferma email è attiva nel progetto Supabase, dopo la registrazione l'utente deve aprire il link ricevuto prima di poter accedere. Il trigger `handle_new_user` copia il nome inserito nel record `profiles`.

### Dati persistenti

La migrazione crea tre tabelle protette da Row Level Security:

- `profiles`: creato automaticamente dal trigger di Supabase quando nasce un utente;
- `quiz_history`: salva punteggio, domande, risposte corrette/errate, durata e data di ogni quiz autenticato;
- `user_answers`: disponibile per la successiva persistenza del dettaglio delle singole risposte.

Dopo il login, il risultato viene salvato automaticamente quando si apre la pagina del riepilogo. La pagina Profilo legge lo storico dell'utente autenticato e calcola quiz completati, domande risposte, accuratezza e tempo medio. Le policy RLS impediscono a un utente di leggere o scrivere dati appartenenti ad altri utenti.

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

1. Sistemare lo stile generale dell'app, con priorità a leggibilità, mobile-first e coerenza visiva.
2. Fare il fine-tuning delle funzionalità del quiz e dei flussi di navigazione.
3. Aggiungere e validare il resto dei file JSON nel database locale delle domande, includendo spiegazioni e riferimenti normativi quando disponibili.
4. Implementare Supabase: autenticazione, profilo, storico quiz e statistiche persistenti. Il dettaglio delle singole risposte resta il prossimo incremento.
