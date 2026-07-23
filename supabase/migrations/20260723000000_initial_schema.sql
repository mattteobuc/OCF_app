create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table public.quiz_history (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  total_questions integer not null check (total_questions > 0),
  correct_answers integer not null check (correct_answers between 0 and total_questions),
  wrong_answers integer not null check (wrong_answers between 0 and total_questions),
  duration_seconds integer not null check (duration_seconds >= 0),
  created_at timestamptz not null default now(),
  check (correct_answers + wrong_answers = total_questions)
);

create table public.user_answers (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id integer not null,
  selected_answer text not null check (selected_answer in ('A', 'B', 'C', 'D')),
  correct boolean not null,
  created_at timestamptz not null default now()
);

create index quiz_history_user_created_at_idx on public.quiz_history (user_id, created_at desc);
create index user_answers_user_created_at_idx on public.user_answers (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.quiz_history enable row level security;
alter table public.user_answers enable row level security;

create policy "Users can read their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users can read their quiz history" on public.quiz_history for select using (auth.uid() = user_id);
create policy "Users can create their quiz history" on public.quiz_history for insert with check (auth.uid() = user_id);

create policy "Users can read their answers" on public.user_answers for select using (auth.uid() = user_id);
create policy "Users can create their answers" on public.user_answers for insert with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
