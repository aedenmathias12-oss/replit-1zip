-- CannaZen — Migration Supabase
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase
-- (Dashboard → SQL Editor → New query)

-- 1. Table des profils utilisateurs
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  photo_url text,
  provider text not null default 'email',
  role text not null default 'customer',
  age_verified boolean not null default false,
  age_verified_at timestamptz,
  phone text,
  addresses jsonb not null default '[]',
  wishlist text[] not null default '{}',
  preferences jsonb not null default '{"newsletter": true, "smsNotifications": false, "language": "fr"}',
  stats jsonb not null default '{"totalOrders": 0, "totalSpent": 0, "loyaltyPoints": 0}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz not null default now()
);

-- 2. Table des paniers
create table if not exists public.carts (
  user_id uuid references auth.users on delete cascade primary key,
  items jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

-- 3. Activer Row Level Security
alter table public.profiles enable row level security;
alter table public.carts enable row level security;

-- 4. Policies profiles : chaque utilisateur accède uniquement à son propre profil
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 5. Policies carts
create policy "Users can view own cart"
  on public.carts for select
  using (auth.uid() = user_id);

create policy "Users can upsert own cart"
  on public.carts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cart"
  on public.carts for update
  using (auth.uid() = user_id);

create policy "Users can delete own cart"
  on public.carts for delete
  using (auth.uid() = user_id);

-- 6. Trigger pour mettre à jour updated_at automatiquement
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger carts_updated_at
  before update on public.carts
  for each row execute procedure public.handle_updated_at();
