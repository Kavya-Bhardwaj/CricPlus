create table if not exists profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, created_at timestamptz default now());
create table if not exists user_preferences (user_id uuid primary key references auth.users(id) on delete cascade, favorite_teams text[] default array['India'], created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists followed_players (user_id uuid references auth.users(id) on delete cascade, player_id text not null, alerts_enabled boolean default true, primary key(user_id, player_id));
create table if not exists match_reminders (user_id uuid references auth.users(id) on delete cascade, match_id text not null, remind_at timestamptz, created_at timestamptz default now(), primary key(user_id, match_id));

alter table profiles enable row level security; alter table user_preferences enable row level security; alter table followed_players enable row level security; alter table match_reminders enable row level security;
create policy "own profile" on profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "own preferences" on user_preferences for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own players" on followed_players for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own reminders" on match_reminders for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
