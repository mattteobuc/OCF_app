# Audit UX — OCF Studio

Data: 2026-07-23. Audit eseguito sul branch `design/premium-restyle`.

## Correzioni necessarie per il lancio

| Priorità | Pagina / componente            | Problema                                                                                 | Impatto                                                                      | Soluzione                                                                                       |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Critica  | `middleware.ts`, `/profile`    | Il profilo è accessibile senza sessione e poi mostra dati vuoti.                         | Un visitatore non capisce perché non vede progressi.                         | Proteggere la rotta e rimandare a login con ritorno alla pagina richiesta.                      |
| Critica  | `/login`                       | Mancano recupero password, feedback comprensibili e ritorno alla destinazione richiesta. | Login fallito o password dimenticata diventano vicoli ciechi.                | Aggiungere flussi reset password, mapping errori e parametro `next`.                            |
| Alta     | Navbar / dashboard             | Lo stato demo non è dichiarato; un visitatore non ha una CTA persistente per accedere.   | La demo sembra un account incompleto e i progressi possono sembrare salvati. | Introdurre stato demo locale, CTA `Accedi` e messaggio contestuale.                             |
| Alta     | `/result`                      | Un risultato demo non propone un percorso chiaro per salvarlo.                           | Perdita del momento di conversione e ambiguità sui progressi.                | Mostrare una CTA non invasiva per creare account o accedere.                                    |
| Alta     | `/profile`                     | Non è possibile aggiornare nome o email; logout e sicurezza sono dispersi.               | Il profilo non soddisfa le aspettative base di un account.                   | Aggiungere dati personali, salvataggio inline, sicurezza e logout.                              |
| Alta     | `/login` da utente autenticato | La pagina resta disponibile anche con sessione attiva.                                   | Navigazione incoerente.                                                      | Redirect alla preparazione in middleware.                                                       |
| Media    | Stati vuoti                    | Profilo e risultato mostrano solo testo o trattini in alcuni stati.                      | Mancanza di direzione.                                                       | Titolo, spiegazione e una CTA primaria per ogni stato vuoto.                                    |
| Media    | Azioni async                   | Salvataggio profilo, logout e salvataggio quiz non danno sempre feedback.                | Incertezza sulle azioni.                                                     | Messaggi inline contestuali e pulsanti temporaneamente disabilitati.                            |
| Bassa    | Account                        | L'eliminazione account non ha un backend sicuro.                                         | Rischio se simulata lato client.                                             | Comunicare che non è disponibile e documentare il requisito server-side; non simulare l'azione. |

## Checklist di implementazione

### Necessarie per il lancio

- [x] Protezione della pagina profilo con ritorno al percorso richiesto dopo il login.
- [x] Redirect di un utente già autenticato da `/login` alla preparazione.
- [x] Login, registrazione, errori tradotti e recupero password.
- [x] Callback per reset password e pagina per scegliere una nuova password.
- [x] Stato demo, CTA di accesso persistente e proposta di salvataggio dopo il risultato.
- [x] Migrazione del risultato demo corrente dopo un accesso riuscito, quando possibile.
- [x] Dati profilo modificabili, logout e feedback inline.
- [x] Stati vuoti e CTA per i progressi.

### Miglioramenti successivi

- [ ] Endpoint server-side per cancellazione account con conferma e ri-autenticazione.
- [ ] Test end-to-end automatizzati dei flussi auth e demo.

### Non necessarie per l’MVP

- [ ] Social login, impostazioni decorative, notifiche e gamification.

## Miglioramenti successivi

- Aggiungere una pagina dedicata alla gestione dell’account dopo l’introduzione di una funzione server-side per la cancellazione sicura.
- Sincronizzare in modo transazionale un risultato demo già concluso al momento della creazione dell’account.
- Aggiungere skeleton dedicati alle metriche del profilo.

## Fuori scope MVP

- Social login, piani, notifiche, gamification e preferenze decorative.
- Gestione amministrativa utenti.
- Cancellazione account senza endpoint server-side protetto.
