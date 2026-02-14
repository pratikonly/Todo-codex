create extension if not exists "uuid-ossp";

create type mood as enum ('focused', 'average', 'tired');

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  avatar_url text,
  is_public boolean not null default true,
  role text not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists study_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  subject text not null,
  duration integer not null,
  date timestamptz not null,
  notes text not null default '',
  mood mood not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists streaks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  current_streak integer not null default 0,
  max_streak integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  badge text not null,
  awarded_at timestamptz not null default now()
);

create table if not exists friends (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  friend_user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_study_logs_user_date on study_logs(user_id, date desc);
create index if not exists idx_notifications_user_created on notifications(user_id, created_at desc);

create or replace view leaderboard_weekly as
select
  u.id as user_id,
  u.full_name,
  coalesce(sum(s.duration), 0)::int as weekly_minutes,
  dense_rank() over (order by coalesce(sum(s.duration), 0) desc) as rank
from users u
left join study_logs s
  on s.user_id = u.id
 and s.date >= now() - interval '7 days'
group by u.id, u.full_name;
