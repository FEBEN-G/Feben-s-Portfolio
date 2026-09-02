import { defaultContent } from "../data/default-content";
import { toDisplayImageUrl } from "../lib/image-url";
import { query } from "./db";

let migrated = false;

/** Creates tables + seeds defaults if empty. Safe to call on every boot. */
export async function ensureDatabase() {
  if (migrated) return;

  try {
    await query(`create extension if not exists "pgcrypto"`);
  } catch {
    // ignore when extension isn't available
  }

  await query(`
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
    )
  `);

  await query(`alter table projects add column if not exists image_url text`);

  await query(`
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
    )
  `);

  await query(`
    create index if not exists projects_sort_order_idx
      on projects (sort_order asc, created_at desc)
  `);
  await query(`
    create index if not exists experience_sort_order_idx
      on experience (sort_order asc, created_at desc)
  `);

  const projectsCount = await query<{ count: string }>(
    "select count(*)::text as count from projects",
  );
  if (Number(projectsCount.rows[0]?.count ?? 0) === 0) {
    for (const [i, project] of defaultContent.projects.entries()) {
      await query(
        `insert into projects (
          title, category, year, tagline, description, tech, accent, image_url, sort_order
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          project.title,
          project.category,
          project.year,
          project.tagline,
          project.desc,
          project.tech,
          project.accent,
          toDisplayImageUrl(project.imageUrl) || null,
          i,
        ],
      );
    }
  }

  const experienceCount = await query<{ count: string }>(
    "select count(*)::text as count from experience",
  );
  if (Number(experienceCount.rows[0]?.count ?? 0) === 0) {
    for (const [i, item] of defaultContent.experience.entries()) {
      await query(
        `insert into experience (
          icon, tag, role, org, period, location, bullets, tech, sort_order
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          item.icon,
          item.tag,
          item.role,
          item.org,
          item.period,
          item.location,
          item.bullets,
          item.tech,
          i,
        ],
      );
    }
  }

  migrated = true;
}
