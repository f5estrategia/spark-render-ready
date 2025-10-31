-- Create app_role enum
create type public.app_role as enum ('admin', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default now(),
    unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Policy: Users can view their own roles
create policy "Users can view own roles"
  on public.user_roles
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Policy: Only admins can insert/update/delete roles
create policy "Only admins can manage roles"
  on public.user_roles
  for all
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Update the leads SELECT policy to allow admins
drop policy if exists "Apenas admins podem ver leads" on public.leads;

create policy "Admins can view all leads"
  on public.leads
  for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));