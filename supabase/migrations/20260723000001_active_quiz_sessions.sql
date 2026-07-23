create table public.active_quiz_sessions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  question_ids integer[] not null check (cardinality(question_ids) > 0),
  answer_orders jsonb not null,
  current_index integer not null check (current_index >= 0),
  correct_answers integer not null check (correct_answers >= 0),
  answers jsonb not null default '[]'::jsonb,
  elapsed_seconds integer not null default 0 check (elapsed_seconds >= 0),
  updated_at timestamptz not null default now()
);

alter table public.active_quiz_sessions enable row level security;

create policy "Users can manage their active quiz" on public.active_quiz_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
