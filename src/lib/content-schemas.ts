import { z } from "zod";
import { PROJECT_ACCENTS } from "../data/types";

export const projectInputSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  category: z.enum(["Full Stack", "Machine Learning"]),
  year: z.string().min(1),
  tagline: z.string().min(1),
  desc: z.string().min(1),
  tech: z.array(z.string()),
  accent: z.string().default(PROJECT_ACCENTS[0]),
  caseStudyUrl: z.string().optional(),
  codeUrl: z.string().optional(),
  liveUrl: z.string().optional(),
});

export const experienceInputSchema = z.object({
  id: z.string().optional(),
  icon: z.enum(["layers", "brain", "code", "briefcase"]),
  tag: z.string().min(1),
  role: z.string().min(1),
  org: z.string().min(1),
  period: z.string().min(1),
  location: z.string().min(1),
  bullets: z.array(z.string()),
  tech: z.array(z.string()),
});

export const idSchema = z.object({ id: z.string().uuid() });

export const loginSchema = z.object({
  password: z.string().min(1),
});

export function isUuid(id?: string) {
  return Boolean(
    id &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id,
      ),
  );
}
