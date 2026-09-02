import type { Experience, PortfolioContent, Project } from "../data/types";
import { defaultContent } from "../data/default-content";
import { toDisplayImageUrl } from "../lib/image-url";
import { isDatabaseConfigured, query } from "./db";
import { ensureDatabase } from "./migrate";

type ProjectRow = {
  id: string;
  title: string;
  category: "Full Stack" | "Machine Learning";
  year: string;
  tagline: string;
  description: string;
  tech: string[] | null;
  accent: string;
  image_url: string | null;
  case_study_url: string | null;
  code_url: string | null;
  live_url: string | null;
  sort_order: number;
};

type ExperienceRow = {
  id: string;
  icon: Experience["icon"];
  tag: string;
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[] | null;
  tech: string[] | null;
  sort_order: number;
};

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    year: row.year,
    tagline: row.tagline,
    desc: row.description,
    tech: row.tech ?? [],
    accent: row.accent,
    imageUrl: toDisplayImageUrl(row.image_url) ?? undefined,
    caseStudyUrl: row.case_study_url ?? undefined,
    codeUrl: row.code_url ?? undefined,
    liveUrl: row.live_url ?? undefined,
  };
}

function mapExperience(row: ExperienceRow): Experience {
  return {
    id: row.id,
    icon: row.icon,
    tag: row.tag,
    role: row.role,
    org: row.org,
    period: row.period,
    location: row.location,
    bullets: row.bullets ?? [],
    tech: row.tech ?? [],
  };
}

export async function fetchPortfolioContent(): Promise<PortfolioContent> {
  if (!isDatabaseConfigured()) {
    return structuredClone(defaultContent);
  }

  try {
    await ensureDatabase();

    const [projectsRes, experienceRes] = await Promise.all([
      query<ProjectRow>("select * from projects order by sort_order asc, created_at desc"),
      query<ExperienceRow>(
        "select * from experience order by sort_order asc, created_at desc",
      ),
    ]);

    return {
      projects: projectsRes.rows.map(mapProject),
      experience: experienceRes.rows.map(mapExperience),
    };
  } catch (error) {
    console.error("Failed to load content from database:", error);
    return structuredClone(defaultContent);
  }
}

export async function insertProjectRow(project: Omit<Project, "id"> & { id?: string }) {
  await ensureDatabase();
  const existing = await query<{ sort_order: number }>(
    "select sort_order from projects order by sort_order asc limit 1",
  );
  const nextOrder =
    existing.rows[0]?.sort_order != null ? existing.rows[0].sort_order - 1 : 0;

  const { rows } = await query<ProjectRow>(
    `insert into projects (
      title, category, year, tagline, description, tech, accent, image_url,
      case_study_url, code_url, live_url, sort_order
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    returning *`,
    [
      project.title,
      project.category,
      project.year,
      project.tagline,
      project.desc,
      project.tech,
      project.accent,
      toDisplayImageUrl(project.imageUrl) || null,
      project.caseStudyUrl || null,
      project.codeUrl || null,
      project.liveUrl || null,
      nextOrder,
    ],
  );

  return mapProject(rows[0]);
}

export async function updateProjectRow(project: Project) {
  await ensureDatabase();
  const { rows } = await query<ProjectRow>(
    `update projects set
      title = $1,
      category = $2,
      year = $3,
      tagline = $4,
      description = $5,
      tech = $6,
      accent = $7,
      image_url = $8,
      case_study_url = $9,
      code_url = $10,
      live_url = $11,
      updated_at = now()
    where id = $12
    returning *`,
    [
      project.title,
      project.category,
      project.year,
      project.tagline,
      project.desc,
      project.tech,
      project.accent,
      toDisplayImageUrl(project.imageUrl) || null,
      project.caseStudyUrl || null,
      project.codeUrl || null,
      project.liveUrl || null,
      project.id,
    ],
  );

  if (!rows[0]) throw new Error("Project not found");
  return mapProject(rows[0]);
}

export async function deleteProjectRow(id: string) {
  await ensureDatabase();
  const result = await query("delete from projects where id = $1 returning id", [id]);
  if (!result.rows[0]) throw new Error("Project not found");
}

export async function insertExperienceRow(item: Omit<Experience, "id"> & { id?: string }) {
  await ensureDatabase();
  const existing = await query<{ sort_order: number }>(
    "select sort_order from experience order by sort_order asc limit 1",
  );
  const nextOrder =
    existing.rows[0]?.sort_order != null ? existing.rows[0].sort_order - 1 : 0;

  const { rows } = await query<ExperienceRow>(
    `insert into experience (
      icon, tag, role, org, period, location, bullets, tech, sort_order
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    returning *`,
    [
      item.icon,
      item.tag,
      item.role,
      item.org,
      item.period,
      item.location,
      item.bullets,
      item.tech,
      nextOrder,
    ],
  );

  return mapExperience(rows[0]);
}

export async function updateExperienceRow(item: Experience) {
  await ensureDatabase();
  const { rows } = await query<ExperienceRow>(
    `update experience set
      icon = $1,
      tag = $2,
      role = $3,
      org = $4,
      period = $5,
      location = $6,
      bullets = $7,
      tech = $8,
      updated_at = now()
    where id = $9
    returning *`,
    [
      item.icon,
      item.tag,
      item.role,
      item.org,
      item.period,
      item.location,
      item.bullets,
      item.tech,
      item.id,
    ],
  );

  if (!rows[0]) throw new Error("Experience not found");
  return mapExperience(rows[0]);
}

export async function deleteExperienceRow(id: string) {
  await ensureDatabase();
  const result = await query("delete from experience where id = $1 returning id", [id]);
  if (!result.rows[0]) throw new Error("Experience not found");
}
