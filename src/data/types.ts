export type ProjectCategory = "Full Stack" | "Machine Learning";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  tagline: string;
  desc: string;
  tech: string[];
  accent: string;
  imageUrl?: string;
  caseStudyUrl?: string;
  codeUrl?: string;
  liveUrl?: string;
};

export type ExperienceIcon = "layers" | "brain" | "code" | "briefcase";

export type Experience = {
  id: string;
  icon: ExperienceIcon;
  tag: string;
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
  tech: string[];
};

export type PortfolioContent = {
  projects: Project[];
  experience: Experience[];
};

export const PROJECT_ACCENTS = [
  "from-brand/50 to-brand-2/50",
  "from-brand-3/50 to-brand/50",
  "from-brand-2/50 to-brand-3/50",
  "from-brand/40 to-brand-2/60",
  "from-brand-2/50 to-brand/50",
  "from-brand-3/40 to-brand-2/50",
] as const;

export function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
