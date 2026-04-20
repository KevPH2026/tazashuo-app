-- Enable RLS
alter table personas enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- Personas table
create table if not exists personas (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  name_en text not null,
  avatar text not null,
  tag text not null,
  tag_en text not null,
  description text not null,
  description_en text not null,
  mind_model text,
  heuristic text,
  expression text,
  voice text,
  principle text,
  boundary text,
  stats jsonb default '{"conversations": 0, "rating": 5.0}',
  is_premium boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Conversations table
create table if not exists conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  persona_id uuid references personas(id) on delete cascade,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages table
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS policies
-- Personas: readable by all, writable by admin
create policy "Personas are viewable by everyone" on personas for select using (true);

-- Conversations: users can only see their own
create policy "Users can view own conversations" on conversations for select using (auth.uid() = user_id);
create policy "Users can insert own conversations" on conversations for insert with check (auth.uid() = user_id);

-- Messages: users can only see messages in their conversations
create policy "Users can view own messages" on messages for select using (
  exists (select 1 from conversations c where c.id = messages.conversation_id and c.user_id = auth.uid())
);
create policy "Users can insert own messages" on messages for insert with check (
  exists (select 1 from conversations c where c.id = messages.conversation_id and c.user_id = auth.uid())
);

-- Indexes
create index if not exists idx_conversations_user on conversations(user_id);
create index if not exists idx_messages_conversation on messages(conversation_id);
