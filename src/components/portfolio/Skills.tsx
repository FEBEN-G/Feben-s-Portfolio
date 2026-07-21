import { motion } from "motion/react";
import { Section } from "./Section";
import {
  Boxes, Server, Database, Cloud, Wrench, Brain, Code, Palette,
} from "lucide-react";

const categories = [
  {
    icon: Boxes,
    name: "Frontend",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Motion"],
    note: "Design systems, animation, a11y.",
  },
  {
    icon: Server,
    name: "Backend",
    stack: ["Node.js", "Express", "NestJS", "REST", "tRPC"],
    note: "APIs that scale and stay boring.",
  },
  {
    icon: Database,
    name: "Databases",
    stack: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "Redis"],
    note: "Modeling, indexing, migrations.",
  },
  {
    icon: Cloud,
    name: "Cloud & DevOps",
    stack: ["Vercel", "Docker", "GitHub Actions", "AWS basics"],
    note: "Ship fast, sleep well.",
  },
  {
    icon: Brain,
    name: "Machine Learning",
    stack: ["Python", "NumPy", "Pandas", "PyTorch", "Scikit-Learn"],
    note: "Currently learning — actively building.",
  },
  {
    icon: Code,
    name: "Languages",
    stack: ["TypeScript", "JavaScript", "Python", "Kotlin", "Dart"],
    note: "Right tool for the problem.",
  },
  {
    icon: Palette,
    name: "Design",
    stack: ["Figma", "Design Systems", "Prototyping"],
    note: "Design fluency ≠ designer.",
  },
  {
    icon: Wrench,
    name: "Tools",
    stack: ["Git", "GitHub", "Postman", "Vitest", "Playwright"],
    note: "The invisible 20% that ships the 80%.",
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>Tools I reach for, <span className="text-gradient">by category.</span></>}
      description="I pick tools that respect the reader and the runtime. Here's the current toolkit."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="group relative overflow-hidden surface-panel p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.78 0.155 70 / 0.12), transparent 60%)" }}
            />
            <div className="glass mb-4 inline-flex h-10 w-10 items-center justify-center" style={{ borderRadius: "var(--radius)" }}>
              <c.icon className="h-4.5 w-4.5 text-brand" />
            </div>
            <div className="text-base font-semibold tracking-tight">{c.name}</div>
            <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {c.stack.map((s) => (
                <li
                  key={s}
                  className="chip px-2 py-0.5 text-[11px] text-muted-foreground transition-colors group-hover:border-brand/30 group-hover:text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Tech marquee */}
      <div className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap py-4 text-sm text-muted-foreground/70">
          {[...Array(2)].flatMap((_, k) =>
            ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Postgres", "Python", "PyTorch", "Docker", "Vercel", "Figma", "GraphQL", "Supabase", "Motion"].map((t) => (
              <span key={t + k} className="flex items-center gap-8">
                <span>{t}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
              </span>
            )),
          )}
        </div>
      </div>
    </Section>
  );
}
