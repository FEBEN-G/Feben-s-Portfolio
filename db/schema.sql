-- Plain Postgres schema for Render / any Postgres host
-- Run once: psql $DATABASE_URL -f db/schema.sql

create extension if not exists "pgcrypto";

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Full Stack', 'Machine Learning')),
  year text not null,
  tagline text not null,
  description text not null,
  tech text[] not null default '{}',
  accent text not null default 'from-brand/50 to-brand-2/50',
  image_url text,
  case_study_url text,
  code_url text,
  live_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'briefcase'
    check (icon in ('layers', 'brain', 'code', 'briefcase')),
  tag text not null,
  role text not null,
  org text not null,
  period text not null,
  location text not null,
  bullets text[] not null default '{}',
  tech text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_order_idx
  on projects (sort_order asc, created_at desc);

create index if not exists experience_sort_order_idx
  on experience (sort_order asc, created_at desc);

