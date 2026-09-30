import { createServerFn } from "@tanstack/react-start";
import {
  deleteExperienceRow,
  deleteProjectRow,
  fetchPortfolioContent,
  insertExperienceRow,
  insertProjectRow,
  updateExperienceRow,
  updateProjectRow,
} from "../server/content-db";
import {
  experienceInputSchema,
  idSchema,
  isUuid,
  loginSchema,
  projectInputSchema,
} from "./schemas";
import { envFlags } from "../server/runtime-env";
import { getAdminSession, requireAdmin, verifyAdminPassword } from "../server/session";
import { isDatabaseConfigured, query } from "../server/db";

function toErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : "Something went wrong";
}

async function dbInfo() {
  const flags = envFlags();
  const dbConfigured = isDatabaseConfigured();
  if (!dbConfigured) {
    return { dbConfigured: false, dbReachable: false as boolean, ...flags };
  }
  try {
    await query("select 1 as ok");
    return { dbConfigured: true, dbReachable: true, ...flags };
  } catch {
    return { dbConfigured: true, dbReachable: false, ...flags };
  }
}

export const getPortfolioContentFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const content = await fetchPortfolioContent();
    const info = await dbInfo();
    return {
      content,
      ...info,
    };
  },
);

export const getAdminStatusFn = createServerFn({ method: "GET" }).handler(async () => {
  const info = await dbInfo();
  try {
    const session = await getAdminSession();
    return {
      authenticated: Boolean(session.data.authenticated),
      ...info,
    };
  } catch {
    return { authenticated: false, ...info };
  }
});

export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isDatabaseConfigured()) {
      throw new Error("Database is not configured yet.");
    }
    if (!verifyAdminPassword(data.password)) {
      throw new Error("Invalid password");
    }
    const session = await getAdminSession();
    await session.update({ authenticated: true });
    return { ok: true as const };
  });

export const adminLogoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export const saveProjectFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => projectInputSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    try {
      if (isUuid(data.id)) {
        return await updateProjectRow({
          id: data.id!,
          title: data.title,
          category: data.category,
          year: data.year,
          tagline: data.tagline,
          desc: data.desc,
          tech: data.tech,
          accent: data.accent,
          imageUrl: data.imageUrl,
          caseStudyUrl: data.caseStudyUrl,
          codeUrl: data.codeUrl,
          liveUrl: data.liveUrl,
        });
      }
      return await insertProjectRow(data);
    } catch (err) {
      throw new Error(toErrorMessage(err));
    }
  });

export const deleteProjectFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => idSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    await deleteProjectRow(data.id);
    return { ok: true as const };
  });

export const saveExperienceFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => experienceInputSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    try {
      if (isUuid(data.id)) {
        return await updateExperienceRow({
          id: data.id!,
          icon: data.icon,
          tag: data.tag,
          role: data.role,
          org: data.org,
          period: data.period,
          location: data.location,
          bullets: data.bullets,
          tech: data.tech,
        });
      }
      return await insertExperienceRow(data);
    } catch (err) {
      throw new Error(toErrorMessage(err));
    }
  });

export const deleteExperienceFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => idSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin();
    await deleteExperienceRow(data.id);
    return { ok: true as const };
  });
